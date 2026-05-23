import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutTherapist from './components/AboutTherapist';
import Approach from './components/Approach';
import PainPoints from './components/PainPoints';
import BreathingExercise from './components/BreathingExercise';
import SelfAssessment from './components/SelfAssessment';
import AppointmentPlanner from './components/AppointmentPlanner';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white overflow-hidden selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* Background patterned dots overlay matching Elegant Dark design */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />
      
      {/* Floating elegant header with real-time clock indicator */}
      <Navigation />

      <main>
        
        {/* Hero split section displaying therapist branding details */}
        <Hero />

        {/* Extensive biography about Bruno de Oliveira Lima, CRP, targets */}
        <AboutTherapist />

        {/* Pillars outlining his integrated therapy (TCC-4, Neuro, Psychoanalysis, Humanism) */}
        <Approach />

        {/* Emotion points addressing core sufferings (anxiety, depression, self-esteem, trauma) */}
        <PainPoints />

        {/* Box breathing exercise flow simulator */}
        <BreathingExercise />

        {/* Wellbeing diagnostic step helper test */}
        <SelfAssessment />

        {/* Elegant appointment customized WhatsApp draft generator form */}
        <AppointmentPlanner />

        {/* Glowing client milestone achievements testimonials */}
        <Testimonials />

        {/* Ethical e-Psi clinical FAQs */}
        <Faq />

      </main>

      {/* Ethical CFP-regularized rodapé footer */}
      <Footer />

      {/* Persistent subtle WhatsApp golden icon wrapper popping in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href="https://wa.me/5521975249514?text=Ol%C3%A1%2C%20Bruno!%20Acessei%20seu%20site%20pessoal%20e%20gostaria%20de%20conversar%20sobre%20o%20agendamento%20de%20sess%C3%B5es%20de%20psicologia."
          target="_blank"
          rel="noopener noreferrer"
          id="persistent-whatsapp-float"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 relative group"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping" />
          
          <svg className="w-7 h-7 relative z-10 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.743.003-2.602-1.01-5.05-2.856-6.895C16.638 2.121 14.19 1.109 11.6 1.109c-5.438 0-9.866 4.372-9.87 9.746-.002 1.78.472 3.514 1.373 5.04L2.093 21.94l6.19-1.611c1.516.828 3.125 1.261 4.7 1.261h.004z" />
          </svg>
          
          {/* Hover tooltips */}
          <span className="absolute right-16 bg-luxury-charcoal border border-luxury-gold/30 text-luxury-gold-light text-[10px] font-sans tracking-wider uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Iniciar Mudança
          </span>
        </a>
      </div>

    </div>
  );
}
