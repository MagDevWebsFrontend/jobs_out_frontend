<template>
  <div>
    <LandingHeroSection />
    <WhatIsSection />
    <WhyChooseSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <FeaturesSection />
    <CtaSection />
  </div>
</template>

<script setup>
// Importa manualmente si el auto-import no funciona
import LandingHeroSection from '~/components/landing/HeroSection.vue'
import WhatIsSection from '~/components/landing/WhatIsSection.vue'
import WhyChooseSection from '~/components/landing/WhyChooseSection.vue'
import HowItWorksSection from '~/components/landing/HowItWorksSection.vue'
import TestimonialsSection from '~/components/landing/TestimonialsSection.vue'
import FeaturesSection from '~/components/landing/FeaturesSection.vue'
import CtaSection from '~/components/landing/CtaSection.vue'
</script>