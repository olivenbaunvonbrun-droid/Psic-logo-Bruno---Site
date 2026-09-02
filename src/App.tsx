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
import LandPage from './components/LandPage';
import ConditionsAndFees from './components/ConditionsAndFees';
import ConditionsConfig from './components/ConditionsConfig';

export default function App() {
  const getPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (hash === '#condicoes-de-atendimento/config' || hash === '#config' || hash === '#condicoes/config') {
        return '/condicoes-de-atendimento/config';
      }
      if (hash === '#landpage') return '/landpage';
      if (hash === '#condicoes-de-atendimento' || hash === '#formalizacao-do-acompanhamento') {
        return '/condicoes-de-atendimento';
      }
      return path;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getPath);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalTargetUrl, setModalTargetUrl] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    (window as any).triggerWhatsAppModal = (url: string, category: string) => {
      setModalTargetUrl(url);
      setModalCategory(category);
      setModalOpen(true);
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // ROTA DO PAINEL DE CONFIGURAÇÕES DE PLANOS
  if (
    currentPath === '/condicoes-de-atendimento/config' || 
    currentPath === '/condicoes-de-atendimento/config/' ||
    currentPath.startsWith('/condicoes-de-atendimento/config') ||
    currentPath === '/formalizacao-do-acompanhamento/config' ||
    currentPath.startsWith('/formalizacao-do-acompanhamento/config')
  ) {
    return <ConditionsConfig />;
  }

  // ROTA DA PÁGINA DE CONDIÇÕES E HONORÁRIOS
  if (
    currentPath === '/condicoes-de-atendimento' || 
    currentPath === '/condicoes-de-atendimento/' ||
    currentPath.startsWith('/condicoes-de-atendimento') ||
    currentPath === '/formalizacao-do-acompanhamento' ||
    currentPath === '/formalizacao-do-acompanhamento/' ||
    currentPath.startsWith('/formalizacao-do-acompanhamento')
  ) {
    return <ConditionsAndFees />;
  }

  // ROTA DA LANDING PAGE PÚBLICA
  if (currentPath === '/landpage' || currentPath === '/landpage/' || currentPath.startsWith('/landpage')) {
    return <LandPage />;
  }

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
      case 'planner':
        return {
          title: "Parabéns por organizar o seu cuidado!",
          intro: "Você deu um passo prático e corajoso em direção à sua transformação.",
          body: "Reconhecer que você merece um tempo de qualidade para si é o primeiro grande divisor de águas. O passado não define o que você pode construir daqui em diante.",
          quote: "O seu bem-estar não é um luxo, é a sua maior prioridade. Parabéns pela escolha."
        };
      default:
        return {
          title: "Parabéns pelo primeiro passo!",
          intro: "Você está a um passo de começar uma transformação real.",
          body: "Cuidar da sua saúde emocional é a decisão mais nobre e corajosa que você pode tomar hoje.",
          quote: "A felicidade e o alívio que você procura começam com esta decisão."
        };
    }
  };

  const modalContent = getModalText();

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-cream selection:bg-luxury-gold selection:text-luxury-black font-sans relative overflow-hidden">
      
      {/* Background patterned dots overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />

      {/* Main Page Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <AboutTherapist />
        <Approach />
        <PainPoints />
        <BreathingExercise />
        <SelfAssessment />
        <AppointmentPlanner />
        <Faq />
        <Footer />
      </div>

      {/* MODAL INSTITUCIONAL E DE VALIDAÇÃO (DIRETRIZES ÉTICAS CFP) */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop com desfoque de alta fidelidade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-luxury-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#1c1f2b] to-[#12141c] border border-luxury-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center z-10 overflow-hidden"
            >
              {/* Efeito sutil de iluminação de topo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent rounded-full" />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-luxury-gold/10 rounded-full blur-3xl pointer-events-none" />

              {/* Botão Fechar */}
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Fechar janela"
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-black/40 border border-white/5 hover:border-luxury-gold/40 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Ícone de Destaque */}
              <div className="mx-auto w-14 h-14 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-5 shadow-inner">
                <Sparkles className="w-7 h-7 animate-pulse text-luxury-gold-light" />
              </div>

              {/* Conteúdo Institucional Humanizado */}
              <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold mb-2 leading-snug">
                {modalContent.title}
              </h3>

              <p className="text-sm text-luxury-gold-light font-medium mb-3">
                {modalContent.intro}
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 font-light">
                {modalContent.body}
              </p>

              {/* Frase de Conexão Terapêutica */}
              <div className="bg-luxury-black/60 border-l-2 border-luxury-gold p-3.5 rounded-r-xl mb-6 text-left">
                <p className="text-xs text-luxury-cream/90 italic font-serif">
                  "{modalContent.quote}"
                </p>
                <p className="text-[10px] text-luxury-gold-light font-mono mt-1 text-right">
                  — Bruno de Oliveira Lima (CRP 05/75885)
                </p>
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-white/10 hover:border-luxury-gold/30 text-xs text-zinc-400 hover:text-zinc-200 transition font-medium cursor-pointer order-2 sm:order-1"
                >
                  Voltar ao site
                </button>
                <a
                  href={modalTargetUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-2/3 py-3 px-6 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-luxury-gold/20 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                >
                  <span>Continuar para o WhatsApp</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
