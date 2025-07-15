import { NextRequest, NextResponse } from "next/server"
import { translateToUrdu } from "@/lib/urduDictionary"
import * as cheerio from "cheerio"
import { getMongoCollection } from "@/lib/mongoClient"
import { supabase } from "@/lib/supabaseClient"

// This route only supports POST
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Fetching HTML content of the blog
    const response = await fetch(url)
    const html = await response.text()

    // Loading HTML using Cheerio
    const $ = cheerio.load(html)

    // Extracting main text content — basic logic
    // Try to extract only the article content
    let articleText = ""

    // Try Medium-specific article container first
    if ($("article").length) {
        articleText = $("article").text()
    } else {
        // Fallback: remove unwanted sections and use body
        $("header, footer, nav, script, style").remove()
        articleText = $("body").text()
    }

    // Clean up whitespace
    const cleanedText = articleText.replace(/\s+/g, " ").trim()
    const limitedText = cleanedText.slice(0, 15000) // Gemini handles ~8–15k tokens reliably

    const model = "gemini-2.0-flash";
    const apiKey = process.env.GEMINI_API_KEY;
    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // The request payload (body) is updated to match the new API structure.
    const geminiResponse = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // The new structure uses a 'contents' array.
        contents: [
          {
            parts: [
              {
                // The prompt is now a simple text part.
                text: `Summarize the following blog post text in a few concise paragraphs:\n\n${limitedText}`,
              },
            ],
          },
        ],
      }),
    });

    if (!geminiResponse.ok) {
        // If the API response is not successful, log the error and return it.
        const errorBody = await geminiResponse.json();
        console.error("Gemini API Error:", errorBody);
        return NextResponse.json({ error: "Failed to get summary from AI model.", details: errorBody }, { status: geminiResponse.status });
    }

    const result = await geminiResponse.json();
    // console.log("Gemini API Result:", result)

    const summary = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, a summary could not be generated.";
    const urduSummary = translateToUrdu(summary)

    // Saving full blog text to MongoDB
    const collection = await getMongoCollection()
    await collection.insertOne({
      url,
      content: cleanedText,
      createdAt: new Date()
    })

    // Saving summary to Supabase
    const { error } = await supabase.from("summaries").insert([
      {
        url,
        summary,
        created_at: new Date().toISOString()
      }
    ])

    if (error) {
      console.error("Supabase insert error:", error)
    }



    // Step: Get Gemini Urdu translation
    const geminiUrduResponse = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
            {
                parts: [
                {
                    text: `Translate the following English summary into Urdu:\n\n${summary}`,
                },
                ],
            },
            ],
        }),
    })

    const geminiUrduResult = await geminiUrduResponse.json()
    const urduGeminiTranslation = geminiUrduResult?.candidates?.[0]?.content?.parts?.[0]?.text || "No Gemini Urdu translation."


    // return NextResponse.json({ summary, urduSummary, content: cleanedText })
    return NextResponse.json({
        summary,
        urduSummary, // dictionary-based
        urduGeminiTranslation,
        content: cleanedText,
    })

  } catch (error) {
        console.error("Error scraping blog:", error)
        return NextResponse.json(
            { error: "Failed to fetch and parse content" }, 
            { status: 500 }
        );
  }
}
