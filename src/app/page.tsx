import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import GrainOverlay from '@/components/ui/GrainOverlay'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import VideoSection from '@/components/sections/VideoSection'
import SponsorshipSection from '@/components/sections/SponsorshipSection'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import RaceDayEffect from '@/components/ui/RaceDayEffect'

export default function HomePage() {
  return (
    <>
      <RaceDayEffect />
      <LoadingScreen />
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <VideoSection />
        <SponsorshipSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
