import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div>
        <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white to-blue-300">
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

                <div className="mt-18 flex flex-wrap justify-center gap-4">
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

        <div className="text-center py-10">
            <h1>Tranform Blog Surfing</h1>
            <p>Enter URL of blog post to get summary along with Urdu Translation</p>
        </div>
    </div>

  );
}
