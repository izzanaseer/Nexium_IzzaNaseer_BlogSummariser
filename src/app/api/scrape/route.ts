import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

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

    return NextResponse.json({ content: cleanedText })
  } catch (error) {
    console.error("Error scraping blog:", error)
    return NextResponse.json({ error: "Failed to fetch and parse content" }, { status: 500 })
  }
}
