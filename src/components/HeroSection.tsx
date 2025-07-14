"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function HeroSection() {
    const [url, setUrl] = useState("")
    const [summary, setSummary] = useState("")
    const [urduSummary, setUrduSummary] = useState("")
    const [urduGeminiTranslation, setUrduGeminiTranslation] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        if (!url) return
        setLoading(true)

        try {
            const res = await fetch("/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
            })

            const data = await res.json()

            // const fullText = data.content
            // Testing summary logic without AI: pick first 3–4 sentences
            // const sentences = fullText.split('. ')
            // const summary = sentences.slice(0, 4).join('. ') + '.'

            setSummary(data.summary)
            setUrduSummary(data.urduSummary || "No Urdu translation available.")
            setUrduGeminiTranslation(data.urduGeminiTranslation || "No Gemini Urdu translation available.")
            setUrl("")
        } catch (err) {
            console.error("Failed to fetch blog content", err)
        } finally {
            setLoading(false)
        }
    }

  
  return (
    <div className="bg-gradient-to-r from-white to-blue-300 pb-48">
        <section className="h-screen flex flex-col items-center justify-center ">
            <div className="max-w-3xl text-center space-y-6">
                <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                    Summarize And Read Blogs<br/><span className="text-blue-500">In Minutes, Not Hours</span>
                </h1>
                <p className="text-md sm:text-md">
                    Stop wasting hours skimming through blogs. Provide link to instantly turn long blog posts into clear,
                    concise summaries. Save time, stay informed, and make reading easier — all in one click.
                </p>
                <Button variant="outline" className="text-white border-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    Try It Now
                </Button>

                <div className="mt-28 flex flex-wrap justify-center gap-4">
                    <Button className="bg-white text-black shadow-md transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                        Provide Blog Link
                    </Button>
                    <Button className="bg-white text-black shadow-md transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                        AI-powered Summary
                    </Button>
                    <Button className="bg-white text-black shadow-md transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                        Urdu Translation
                    </Button>
                </div>
            </div>
        </section>

        <div className="text-center py-10 px-4 rounded-2xl bg-white shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Transform Blog Surfing</h1>
            <p className="mb-6 text-gray-700">Enter URL of blog post to get summary along with Urdu Translation</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <Input
                type="text"
                placeholder="Enter blog URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
            />
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {loading ? "Summarizing..." : "Summarize"}
            </Button>
        </div>
      </div>

      {summary && (
        <div className="p-28">
            <div className="mt-12 bg-white p-4 rounded-2xl shadow max-w-2xl mx-auto text-left">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <p className="text-gray-800">{summary}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-xl p-4 shadow bg-gray-50">
                        <h3 className="font-semibold mb-2 text-blue-700">Urdu Translation (AI based)</h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{urduGeminiTranslation}</p>
                    </div>
                    <div className="border rounded-xl p-4 shadow bg-gray-50">
                        <h3 className="font-semibold mb-2 text-purple-700">Urdu Translation (JS-Dictionary based)</h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{urduSummary}</p>
                    </div>
            </div>
        </div>
      )}
    </div>

  );
}
