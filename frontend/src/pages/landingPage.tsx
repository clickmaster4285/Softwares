import { Navbar } from "@/components/landingPage/navbar"
import { HeroSection } from "@/components/landingPage/hero-section"
import { AppsSection } from "@/components/landingPage/AppsSection"
import { IndustriesSection } from "@/components/landingPage/industries-section"
import { CommunitySection } from "@/components/landingPage/CommunitySection"
// import { PricingSection } from "@/components/landingPage/pricing-section"
import { HelpSection } from "@/components/landingPage/help-section"
import { Footer } from "@/components/landingPage/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AppsSection />
      <IndustriesSection />
      <CommunitySection />
      {/* <PricingSection /> */}
      <HelpSection />
      <Footer />
    </main>
  )
}
