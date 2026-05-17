import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import GrainOverlay from '@/components/ui/GrainOverlay'
import RaceDayEffect from '@/components/ui/RaceDayEffect'
import HeroSection from '@/components/sections/HeroSection'
import InterludioSection from '@/components/sections/InterludioSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CinematicSection from '@/components/sections/CinematicSection'
import VideoSection from '@/components/sections/VideoSection'
import GallerySection from '@/components/sections/GallerySection'
import SponsorshipSection from '@/components/sections/SponsorshipSection'
import ContactSection from '@/components/sections/ContactSection'

// Scene rhythm:
// IMPACT → pause → immersion → story → punch × 4 → cinematic → dark film → editorial survey → pitch → close

export default function HomePage() {
  return (
    <>
      <RaceDayEffect />
      <LoadingScreen />
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <main>
        <HeroSection />       {/* Impact: type reaches into photo */}
        <InterludioSection /> {/* Pause: breathing room, ghost 800 */}
        <AboutSection />      {/* Campaign poster → quiet story */}
        <StatsSection />      {/* Rapid punch: numbers, no intro */}
        <CinematicSection />  {/* Cinematic: EVERY SECOND COUNTS */}
        <VideoSection />      {/* Dark film: relay team backdrop */}
        <GallerySection />    {/* Editorial survey: sequence layout */}
        <SponsorshipSection />{/* Pitch: invest in the future */}
        <ContactSection />    {/* Close: dark, direct */}
      </main>
      <Footer />
    </>
  )
}
