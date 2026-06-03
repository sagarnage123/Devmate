import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Workflow from "@/components/landing/Workflow";
import Architecture from "@/components/landing/Architecture";
import EngineeringChallenges from "@/components/landing/EngineeringChallenges";
import Security from "@/components/landing/Security";
import ProductWalkthrough from "@/components/landing/ProductWalkthrough";
import Navbar from "@/components/landing/Navbar";
export default function LandingPage() {
    return (
        <main className="min-h-screen bg-indigo-950 text-white">

            <Navbar />


            <Hero />
            <ProblemSolution/>
            <Workflow/>
            <Architecture />
            <EngineeringChallenges />
            <Security />
            <ProductWalkthrough />
            
        </main>
    );
}