"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function HeroSection() {
    const [url, setUrl] = useState("")

  const handleSubmit = () => {
    console.log("Blog URL submitted:", url)
    // Later call an API here
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
            <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                Summarize
            </Button>
        </div>
      </div>
    </div>

  );
}
