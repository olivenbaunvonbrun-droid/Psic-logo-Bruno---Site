import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutTherapist from './components/AboutTherapist';
import Approach from './components/Approach';
import PainPoints from './components/PainPoints';
import BreathingExercise from './components/BreathingExercise';
import SelfAssessment from './components/SelfAssessment';
import AppointmentPlanner from './components/AppointmentPlanner';
import Faq from './components/Faq';
import Footer from './components/Footer';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalTargetUrl, setModalTargetUrl] = useState('');

  useEffect(() => {
    (window as any).triggerWhatsAppModal = (url: string, category: string) => {
      setModalTargetUrl(url);
      setModalCategory(category);
      setModalOpen(true);
    };
  }, []);

  const getModalText = () => {
    switch (modalCategory) {
      case 'hero':
        return {
          title: "Parabéns pela sua decisão!",
          intro: "Você está a um passo de começar uma mudança importante.",
          body: "A dor que trouxe você até aqui não precisa ser o seu destino, e buscar ajuda não é sinal de fraqueza, mas de coragem.",
          quote: "Você está aqui por um motivo. E esse motivo tem a ver com a sua felicidade."
        };
      case 'nav':
        return {
          title: "Parabéns por iniciar esse movimento de mudança!",
          intro: "O primeiro passo para transformar a sua realidade começa agora.",
          body: "Romper com antigos ciclos e buscar acolhimento profissional demonstra uma força imensa. A dor que você sente hoje não precisa ser a história de toda a sua vida.",
          quote: "Você deu este passo por um motivo claro. E esse motivo é o seu direito de viver com paz e felicidade."
        };
      case 'about':
        return {
          title: "Parabéns pela decisão de reescrever a sua história!",
          intro: "Você está prestes a reassumir o papel de protagonista da sua própria vida.",
          body: "Deixar para trás as armaduras do passado e construir novos caminhos é um ato de profunda coragem. A dor do ontem não precisa ditar as regras do seu amanhã.",
          quote: "Sua jornada tem um valor único. E retomar o controle dela é o início da sua verdadeira felicidade."
        };
      case 'pain':
        return {
          title: "Parabéns por escolher não passar por isso sozinho!",
          intro: "Você está a um passo de aliviar essa sobrecarga e encontrar um espaço seguro de acolhimento.",
          body: "Suportar a ansiedade, a tristeza ou as cicatrizes do passado não precisa ser um fardo solitário. Buscar apoio é a maior prova de amor-próprio e bravura.",
          quote: "Há uma saída viva para a sua dor. E esse caminho tem tudo a ver com o seu bem-estar e felicidade."
        };
      case 'assessment':
        return {
          title: "Parabéns por acolher os resultados e escolher agir!",
          intro: "Parar de adiar o cuidado com a sua saúde mental é uma vitória decisiva.",
          body: "Compreender seu estado emocional e decidir não postergar o tratamento é um divisor de águas na sua vida. A exaustão que você sente hoje pode e deve ser curada.",
          quote: "Você merece viver sem amarras e sem adiar a sua felicidade."
        };
      case 'planner':
        return {
          title: "Parabéns por dar este passo concreto de cuidado!",
          intro: "Sua mensagem está pronta para conectar você a um suporte clínico especializado.",
          body: "Organizar sua rotina e suas preferências para iniciar a terapia é a manifestação mais pura de responsabilidade e carinho consigo mesmo.",
          quote: "Cuidar de você é a prioridade absoluta. E o seu bem-estar tem tudo a ver com a sua felicidade."
        };
      case 'floating':
      default:
        return {
          title: "Parabéns pela sua coragem de dar o primeiro passo!",
          intro: "Você está muito próximo de acessar um espaço de escuta clínica dedicada e humanizada.",
          body: "Dar início a esse contato é uma decisão nobre. Nenhum sofrimento deve ser suportado em isolamento.",
          quote: "Você está aqui por um motivo especial. E esse motivo tem tudo a ver com a sua busca por felicidade e equilíbrio."
        };
    }
  };

  const modalData = getModalText();

  const handleProceed = () => {
    window.open(modalTargetUrl, '_blank');
    setModalOpen(false);
  };

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

        {/* Ethical e-Psi clinical FAQs */}
        <Faq />

      </main>

      {/* Ethical CFP-regularized rodapé footer */}
      <Footer />

      {/* Persistent subtle WhatsApp golden icon wrapper popping in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => {
            const url = "https://wa.me/5521975249514?text=Ol%C3%A1%2C%20Bruno!%20Acessei%20seu%20site%20pessoal%20e%20gostaria%20de%20conversar%20sobre%20o%20agendamento%20de%20sess%C3%B5es%20de%20psicologia.";
            if ((window as any).triggerWhatsAppModal) {
              (window as any).triggerWhatsAppModal(url, "floating");
            } else {
              window.open(url, '_blank');
            }
          }}
          id="persistent-whatsapp-float"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 relative group cursor-pointer border-none outline-none"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping" />
          
          <svg className="w-7 h-7 relative z-10 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.743.003-2.602-1.01-5.05-2.856-6.895C16.638 2.121 14.19 1.109 11.6 1.109c-5.438 0-9.866 4.372-9.87 9.746-.002 1.78.472 3.514 1.373 5.04L2.093 21.94l6.19-1.611c1.516.828 3.125 1.261 4.7 1.261h.004z" />
          </svg>
          
          {/* Hover tooltips */}
          <span className="absolute right-16 bg-luxury-charcoal border border-luxury-gold/30 text-luxury-gold-light text-[10px] font-sans tracking-wider uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Iniciar a mudança de que eu preciso
          </span>
        </button>
      </div>

      {/* Modal - Acolhimento Reflexivo antes do WhatsApp */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-luxury-black/90 backdrop-blur-md"
            />
            
            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative bg-luxury-charcoal/95 border border-luxury-gold/30 p-8 rounded-3xl max-w-md w-full shadow-2xl z-10 text-center flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-luxury-gold transition cursor-pointer p-1"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sparkles Icon */}
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-serif text-luxury-gold-light mb-3 font-semibold tracking-tight">
                {modalData.title}
              </h3>

              {/* Intro */}
              <p className="text-[#dfcaa7] text-xs sm:text-sm font-sans tracking-wide font-semibold mb-3">
                {modalData.intro}
              </p>

              {/* Body */}
              <p className="text-luxury-text-muted text-xs sm:text-sm font-sans font-light leading-relaxed mb-5">
                {modalData.body}
              </p>

              {/* Highlight Quote */}
              <div className="w-full border-t border-b border-luxury-gold/15 py-4 my-2 text-white font-medium italic text-xs sm:text-sm bg-luxury-black/30 px-3 rounded-lg">
                "{modalData.quote}"
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceed}
                className="w-full flex items-center justify-center bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-widest py-4.5 rounded-xl transition shadow-lg shadow-luxury-gold/10 cursor-pointer mt-6"
              >
                <span>Prosseguir</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
