
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function StartPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-100 flex flex-col">

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
                        Revolutionize Your Marketing
                    </h1>
                    <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-2xl mx-auto">
                        Unlock the power of data-driven campaigns and boost your ROI with our cutting-edge marketing platform.
                    </p>
                    <div className="space-x-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg">
                            Get Started
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg text-lg">
                            Learn More About<ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </main>

        </div>
    )
}