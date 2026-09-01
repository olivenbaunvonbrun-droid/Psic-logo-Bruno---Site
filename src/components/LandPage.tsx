import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  MessageSquareHeart, 
  Brain, 
  HeartHandshake, 
  Clock, 
  Video, 
  Lock, 
  Award, 
  ArrowRight,
  HelpCircle,
  Zap,
  ChevronDown,
  Receipt,
  Smartphone,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';

export default function LandPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const whatsappDirectUrl = "https://wa.me/5521975249514?text=" + encodeURIComponent(
    "Olá, Bruno! Acessei sua página de atendimento e gostaria de conversar para esclarecer algumas dúvidas antes de iniciar."
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleNavigateToConditions = () => {
    setModalOpen(false);
    // Atualiza a URL e dispara o evento para navegação SPA
    window.history.pushState({}, '', '/condicoes-de-atendimento');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  const handleOpenWhatsAppFromModal = () => {
    window.open(whatsappDirectUrl, '_blank');
    setModalOpen(false);
  };

  // State para o Mini-FAQ interativo
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "Como funciona a consulta de psicologia online?",
      answer: "A sessão acontece por videochamada individual em uma plataforma segura e com sigilo absoluto. Você recebe um link exclusivo diretamente no seu WhatsApp e pode entrar com apenas um clique pelo seu celular, computador ou tablet, sem precisar instalar programas complicados."
    },
    {
      question: "Posso solicitar reembolso ao meu plano de saúde / convênio?",
      answer: "Sim! Ao término de cada sessão ou mês, emitimos o recibo profissional oficial com registro no CRP 05/75885 para que você solicite o reembolso integral ou parcial diretamente junto ao seu plano de saúde."
    },
    {
      question: "Nunca fiz terapia antes. Como será a nossa primeira conversa?",
      answer: "O primeiro contato é um momento leve e acolhedor de 1. Acolhimento e 2. Análise da Queixa. Você não precisa preparar nada: criamos um espaço seguro e livre de julgamentos para ouvir sua história e traçar juntos um plano claro de evolução."
    },
    {
      question: "O que significa 'Psicologia de 4ª Geração'?",
      answer: "É uma abordagem moderna e ativa que vai além de apenas desabafar. Nós identificamos como a sua dor funciona no presente e realizamos um treinamento prático de habilidades psicológicas (como autocontrole, imunidade social e autoconhecimento) para gerar transformações reais e duradouras."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white overflow-hidden selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* Background patterned dots overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />

      {/* HEADER SIMPLIFICADO E EXCLUSIVO DA LANDING PAGE */}
      <header className="w-full bg-luxury-charcoal/80 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-50 py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full border border-luxury-gold/40 flex items-center justify-center bg-[#07090f] overflow-hidden shrink-0 shadow-md">
              <img 
                src="/media__1779535801913.png" 
                alt="Logo Bruno de Oliveira" 
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <div>
              <h1 className="font-serif text-white font-semibold text-sm sm:text-base tracking-wide leading-tight">
                Bruno de Oliveira Lima
              </h1>
              <p className="text-[10px] sm:text-xs text-luxury-gold-light font-mono tracking-wider">
                Psicólogo de 4ª Geração • CRP 05/75885
              </p>
            </div>
          </div>

          {/* Botão rápido para abrir o modal ético */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:brightness-110 transition cursor-pointer"
          >
            <span>Iniciar Acompanhamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </header>

      <main className="relative z-10">

        {/* SEÇÃO 1: HERO SECTION */}
        <section className="relative pt-16 pb-20 px-6 overflow-hidden bg-radial from-luxury-charcoal to-luxury-black text-center">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-xs text-luxury-gold-light uppercase tracking-widest font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <span>TCC de 4ª Geração & Neurociência Clínica</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.15] mb-6"
            >
              Descubra a Origem da sua Dor e <span className="gold-gradient-text italic font-medium">Retome o Controle</span> da sua Vida.
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#dfcaa7] font-medium tracking-wide mb-8"
            >
              Acolhimento Psicológico Clínico Online com o Psicólogo de 4ª Geração Bruno de Oliveira
            </motion.h2>

            {/* Main Visual Display Frame with Therapist Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-luxury-gold/30 shadow-2xl bg-luxury-charcoal/50 p-2 sm:p-3 mb-8"
            >
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-luxury-black">
                <img 
                  src="/media__1780315858307.jpg" 
                  alt="Bruno de Oliveira - Psicólogo Clínico" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left">
                  <div>
                    <p className="text-white font-serif text-base sm:text-lg font-semibold">Consultório Online Integrativo</p>
                    <p className="text-xs text-luxury-gold-light font-sans">Sessões individuais por chamada segura com sigilo absoluto</p>
                  </div>
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] px-3 py-1 rounded-full hidden sm:flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    e-Psi Ativo
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Texto em linha única */}
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif text-white font-medium mb-6 sm:whitespace-nowrap"
            >
              Uma experiência acolhedora, científica e transformadora. Está pronto para começar?
            </motion.h3>

            {/* Direct CTA Button que aciona o Modal de Orientação Ética */}
            <div className="relative group">
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light opacity-50 blur-md group-hover:opacity-80 animate-pulse transition duration-1000" />
              <motion.button
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-12 py-5 rounded-full shadow-2xl shadow-luxury-gold/25 transition duration-300 cursor-pointer"
              >
                <MessageSquareHeart className="w-6 h-6 shrink-0" />
                <span>Quero dar o primeiro passo</span>
              </motion.button>
            </div>

            {/* Microcopy de Reforço & Segurança */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-luxury-gold-light mt-4 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Sigilo Ético CFP</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Receipt className="w-4 h-4 text-luxury-gold" /> Recibo para Reembolso</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-luxury-gold" /> Atendimento Online</span>
            </div>

            <p className="text-xs sm:text-sm text-luxury-text-muted mt-4 max-w-lg leading-relaxed font-light">
              A psicoterapia pode ajudar você a compreender seus padrões, organizar sua experiência emocional e desenvolver recursos psicológicos para lidar com a vida de forma mais consciente.
            </p>

          </div>
        </section>

        {/* SEÇÃO 2: APRESENTAÇÃO & FOTOS */}
        <section className="py-20 bg-luxury-charcoal border-t border-b border-luxury-gold/10 px-6">
          <div className="max-w-6xl mx-auto text-center">
            
            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="w-5 h-5 text-luxury-gold" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Experiência Clínica Comprovada</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight mb-4">
              Mais de <span className="gold-gradient-text italic font-medium">+4 mil horas</span> de acolhimento e dedicação clínica.
            </h2>
            
            <p className="text-sm sm:text-base text-luxury-text-muted max-w-2xl mx-auto mb-12 font-light">
              Autoconhecimento, regulação emocional profunda e transformação através da TCC Integrativa de 4ª Geração, amparada pela neurociência clínica.
            </p>

            {/* Grid de Fotos Ilustrativas com proporção 3:2 sem corte */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="rounded-xl overflow-hidden border border-luxury-gold/20 aspect-[3/2] relative group shadow-lg bg-luxury-black">
                <img 
                  src="/media__1780328241086.jpg" 
                  alt="Acolhimento Familiar" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-serif text-white font-medium">Acolhimento da Dor</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-luxury-gold/20 aspect-[3/2] relative group shadow-lg bg-luxury-black">
                <img 
                  src="/media__1780328241087.jpg" 
                  alt="Relações Saudáveis" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-serif text-white font-medium">Vínculos & Relações</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-luxury-gold/20 aspect-[3/2] relative group shadow-lg bg-luxury-black">
                <img 
                  src="/media__1780328241104.jpg" 
                  alt="Perspectiva de Futuro" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-serif text-white font-medium">Novas Perspectivas</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-luxury-gold/20 aspect-[3/2] relative group shadow-lg bg-luxury-black">
                <img 
                  src="/media__1780328241113.jpg" 
                  alt="Tranquilidade e Paz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-serif text-white font-medium">Paz & Equilíbrio</span>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 3: IDENTIFICAÇÃO DA DOR & COMPREENSÃO */}
        <section className="py-24 bg-luxury-black px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-luxury-charcoal/60 border border-luxury-gold/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4 text-luxury-gold">
                <HelpCircle className="w-5 h-5 text-luxury-gold" />
                <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-luxury-gold-light">Compreensão Profunda</span>
              </div>

              {/* Título formatado estritamente em duas linhas */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-serif text-white tracking-tight leading-snug mb-8">
                <span className="block">Já buscou de todas as formas, mas a ansiedade,</span>
                <span className="block">a tristeza ou a sobrecarga continuam com você todos os dias?</span>
              </h2>

              <div className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light flex flex-col gap-5">
                <p>
                  Muitas pessoas passam anos apenas desabafando sobre suas dores, sentem um alívio temporário, mas os problemas continuam se repetindo semana após semana. Na psicologia de 4ª geração, nós abandonamos a mera sala de descompressão.
                </p>
                <p>
                  O nosso foco é entender <strong className="text-white font-medium">como a sua dificuldade realmente funciona</strong> no dia a dia e treinar novas habilidades psicológicas para que você construa resultados reais e duradouros.
                </p>
                <p className="border-l-2 border-luxury-gold pl-4 py-1 text-[#dfcaa7] italic font-serif">
                  "O objetivo não é apenas desabafar, mas transformar a forma como você reage à sua mente e à sua vida."
                </p>
                <p>
                  Em uma sessão clínica individual de <strong className="text-white font-semibold">50 minutos</strong>, você terá um espaço seguro, acolhedor e sem julgamentos para mapear suas dificuldades e começar essa mudança.
                </p>
              </div>

              <div className="mt-10 flex justify-center sm:justify-start">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOpenModal}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:brightness-110 transition cursor-pointer"
                >
                  <span>Quero olhar para isso com seriedade</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 4: O QUE VOCÊ TERÁ (50 MINUTOS DE ATENDIMENTO) */}
        <section className="py-24 bg-luxury-charcoal px-6 border-t border-luxury-gold/10">
          <div className="max-w-6xl mx-auto text-center">
            
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-luxury-gold" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Estrutura da Sessão</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
              O que você terá em <span className="gold-gradient-text italic font-medium">50 minutos</span> de atendimento?
            </h2>
            
            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#dfcaa7] font-semibold mb-16">
              Atendimento Individual, Prático e com Método Claro de Evolução
            </p>

            {/* 1. Acolhimento | 2. Queixa | 3. Ativação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              
              {/* Card 1: Acolhimento */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">1. Acolhimento</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  Criamos um espaço acolhedor, seguro, 100% confidencial e totalmente livre de julgamentos. É o momento de estabelecer confiança e uma parceria de colaboração mútua.
                </p>
              </div>

              {/* Card 2: Queixa */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">2. Queixa</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  Analisamos situações concretas do seu dia a dia para identificar exatamente o que você pensa, sente e faz, mapeando a raiz dos gatilhos que geram ansiedade e mal-estar.
                </p>
              </div>

              {/* Card 3: Ativação */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">3. Ativação</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  Conectamos os padrões com a sua história de vida e iniciamos o treinamento de habilidades práticas (autocontrole, autoestima, enfrentamento) para você assumir o controle da sua vida.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 5: FORMATO DA CONSULTA (FOCO EM MÉTODO E ÉTICA, SEM VALORES PÚBLICOS) */}
        <section className="py-24 bg-luxury-black px-6">
          <div className="max-w-2xl mx-auto">
            
            <div className="bg-gradient-to-b from-luxury-charcoal to-luxury-black border-2 border-luxury-gold/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center">
              
              <span className="px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
                Sessão Clínica Individual
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-6">
                1. Acolhimento + 2. Queixa + 3. Ativação
              </h2>

              <ul className="text-left w-full max-w-md space-y-3.5 my-6">
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span><strong>50 Minutos</strong> de Atendimento Individual Dedicado</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <Video className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span>Plataforma Online Segura e Criptografada</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <Lock className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span>Sigilo Ético e Confidencialidade Absoluta (CFP)</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <Shield className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span>Cadastro <strong>e-Psi Ativo</strong> para Atendimento em Qualquer Lugar</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <Sparkles className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span>Sem Precisar Enfrentar Trânsito ou Sair de Casa</span>
                </li>
              </ul>

              <p className="text-xs sm:text-sm text-luxury-gold-light font-medium tracking-wide my-4">
                Comece a construir mais clareza, autonomia e direção sobre aquilo que você está vivendo.
              </p>

              {/* Botão para abrir o Modal de Orientação */}
              <div className="w-full relative group mt-4">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light opacity-50 blur-sm group-hover:opacity-80 animate-pulse transition duration-1000" />
                <motion.button
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOpenModal}
                  className="relative w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs sm:text-sm uppercase tracking-wider py-4.5 rounded-full shadow-lg shadow-luxury-gold/15 transition cursor-pointer"
                >
                  <MessageSquareHeart className="w-5 h-5 shrink-0" />
                  <span>Quero entender como funciona o atendimento</span>
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 mt-4 font-mono">
                <Receipt className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Atendimento particular com emissão de recibo para reembolso</span>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 6: SOBRE O PROFISSIONAL */}
        <section className="py-24 bg-luxury-charcoal border-t border-luxury-gold/10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Foto Circular do Terapeuta */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-luxury-gold/40 p-1.5 bg-gradient-to-b from-[#1b1b1e] to-luxury-black shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-luxury-black relative flex items-center justify-center">
                  <img 
                    src="/media__1780322063258.jpg" 
                    alt="Bruno de Oliveira Lima" 
                    className="w-full h-full object-cover scale-[1.6] origin-[center_35%]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15)_0%,transparent_70%)] pointer-events-none" />
                </div>
              </div>

              <div className="text-center mt-5">
                <h3 className="text-xl font-serif text-white font-semibold">Bruno de Oliveira Lima</h3>
                <p className="text-xs text-luxury-gold-light font-medium tracking-wide">Psicólogo de 4ª Geração</p>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">CRP: 05/75885 • e-Psi Regularizado</p>
              </div>
            </div>

            {/* Bio e Narrativa */}
            <div className="md:col-span-7 flex flex-col gap-5 text-left">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Award className="w-4 h-4" />
                <span className="text-xs font-sans tracking-[0.25em] uppercase text-luxury-gold-light font-medium">Sobre o Terapeuta</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                Acolhimento humano de verdade com o <span className="gold-gradient-text italic">rigor da neurociência</span>.
              </h2>

              <div className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light flex flex-col gap-4">
                <p>
                  Bruno de Oliveira é psicólogo clínico especialista em TCC Integrativa de 4ª Geração, com foco no treinamento ativo de habilidades psicológicas e superação de padrões disfuncionais.
                </p>
                <p>
                  Com fundamentação sólida em Neurociência Clínica e Terapias Baseadas em Processos, seu trabalho une ferramentas práticas cientificamente validadas à empatia incondicional pelo ser humano.
                </p>
                <p>
                  Cada sessão é um ambiente colaborativo e acolhedor, onde o paciente aprende a atuar de forma consciente, curando marcas do passado e assumindo o controle do seu futuro.
                </p>
              </div>

              <div className="bg-luxury-black/50 p-4 rounded-xl border border-luxury-gold/15 mt-2">
                <p className="text-xs sm:text-sm text-[#dfcaa7] italic font-serif leading-relaxed">
                  "Carrego comigo a convicção de que a minha missão profissional é diminuir o sofrimento no mundo."
                </p>
                <p className="text-[10px] text-luxury-gold-dark font-mono mt-1 uppercase tracking-widest">
                  — Bruno de Oliveira Lima, CRP 05/75885
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO 7: NÚMEROS / ESTATÍSTICAS */}
        <section className="py-16 bg-luxury-black border-t border-b border-luxury-gold/10 px-6 text-center">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold">+4.000</h3>
              <p className="text-xs uppercase tracking-wider text-luxury-gold-light font-medium mt-1">Horas Clínicas</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold">100%</h3>
              <p className="text-xs uppercase tracking-wider text-luxury-gold-light font-medium mt-1">Sigilo e Ética CFP</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold">4ª Ger.</h3>
              <p className="text-xs uppercase tracking-wider text-luxury-gold-light font-medium mt-1">TCC Integrativa</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold">e-Psi</h3>
              <p className="text-xs uppercase tracking-wider text-luxury-gold-light font-medium mt-1">Atendimento Online</p>
            </div>

          </div>
        </section>

        {/* SEÇÃO 8: QUEBRA RÁPIDA DE OBJEÇÕES / MINI-FAQ */}
        <section className="py-24 bg-luxury-charcoal border-b border-luxury-gold/10 px-6">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-luxury-gold" />
                <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Dúvidas Frequentes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight">
                Tudo o que você precisa saber <span className="gold-gradient-text italic font-medium">antes de começar</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-luxury-black/70 border border-luxury-gold/15 rounded-2xl overflow-hidden transition duration-300 hover:border-luxury-gold/35"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-serif text-sm sm:text-base text-white font-medium">
                        {item.question}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-luxury-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 pt-1 text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light border-t border-luxury-gold/10"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* SEÇÃO 9: FINALIZAÇÃO & SUPORTE */}
        <section className="py-24 bg-gradient-to-b from-luxury-charcoal to-luxury-black px-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
              Sua felicidade e paz de espírito não podem ser <span className="gold-gradient-text italic font-medium">adiadas</span>.
            </h2>

            {/* Destaques de Confiança */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-6 text-xs sm:text-sm text-zinc-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Prática Baseada em Evidências
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Acolhimento Humanizado
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Treinamento de Habilidades
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Totalmente Seguro
              </span>
            </div>

            <p className="text-xs sm:text-sm text-luxury-text-muted mb-8 max-w-md font-light">
              Dê o primeiro passo para um processo de mudança conduzido com método, responsabilidade e acompanhamento profissional.
            </p>

            {/* Botão Final com Micro-Animação Pulsante que abre o Modal de Orientação */}
            <div className="relative group">
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light opacity-50 blur-md group-hover:opacity-80 animate-pulse transition duration-1000" />
              <motion.button
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-sm sm:text-base uppercase tracking-wider px-10 py-5 rounded-full shadow-2xl shadow-luxury-gold/25 transition cursor-pointer"
              >
                <MessageSquareHeart className="w-5 h-5 shrink-0" />
                <span>Quero iniciar meu acompanhamento</span>
              </motion.button>
            </div>

            {/* Dúvidas / Suporte Direto */}
            <div className="mt-14 pt-10 border-t border-luxury-gold/15 w-full">
              <p className="text-xs sm:text-sm text-luxury-text-muted font-light mb-3">
                Possui alguma dúvida específica sobre o formato das sessões ou horários disponíveis?
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold-light hover:text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300"
              >
                <span>Tirar dúvidas pelo WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Logo Marca */}
            <div className="mt-12 opacity-80">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center mx-auto bg-luxury-black p-1">
                <img 
                  src="/media__1779535801913.png" 
                  alt="Logo Bruno de Oliveira" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[10px] text-zinc-400 font-mono mt-2 uppercase tracking-widest">
                Bruno de Oliveira Lima • CRP 05/75885 • Todos os direitos reservados
              </p>
            </div>

            {/* AVISO DE CONFORMIDADE LEGAL / META ADS & GOOGLE ADS COMPLIANCE */}
            <div className="mt-10 pt-6 border-t border-white/5 max-w-2xl text-[10px] text-zinc-400 leading-relaxed font-sans">
              <p>
                Este site não é afiliado à Meta Platforms, Inc., Facebook, Instagram, Google LLC ou a qualquer uma de suas entidades. Após sair de tais plataformas, a responsabilidade é exclusiva deste domínio. As informações e atendimentos prestados seguem rigorosamente o Código de Ética Profissional do Conselho Federal de Psicologia (CFP) e os critérios de atendimento online regularizados pelo e-Psi.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* MODAL DE ORIENTAÇÃO ÉTICA ANTES DE PROSSEGUIR */}
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

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative bg-luxury-charcoal/95 border border-luxury-gold/30 p-7 sm:p-9 rounded-3xl max-w-lg w-full shadow-2xl z-10 text-left flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-luxury-gold transition cursor-pointer p-1"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header com Ícone */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-luxury-gold" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-white font-semibold tracking-tight">
                  Dar o primeiro passo com responsabilidade
                </h3>
              </div>

              {/* Texto Explicativo Ético */}
              <div className="text-xs sm:text-sm text-zinc-300 space-y-3 font-light leading-relaxed mb-6 max-h-[50vh] overflow-y-auto pr-1">
                <p>
                  Este pode ser um passo importante para olhar com mais seriedade para aquilo que você vem vivendo.
                </p>
                <p>
                  A psicoterapia não oferece promessa automática de resultado, mas pode favorecer compreensão, elaboração emocional, identificação de padrões e desenvolvimento gradual de recursos psicológicos para lidar com a vida de forma mais consciente.
                </p>
                <p>
                  Antes de iniciar o acompanhamento, você poderá conhecer as modalidades de organização do atendimento, os honorários profissionais e as condições gerais de contratação.
                </p>
                <p className="p-3 bg-luxury-black/40 rounded-xl border border-luxury-gold/15 text-[#dfcaa7] italic">
                  Essas informações são apresentadas com finalidade de transparência, não como promoção, desconto, oferta comercial ou garantia de resultado.
                </p>
                <p>
                  Você pode seguir para a página de modalidades ou falar diretamente pelo WhatsApp para esclarecer dúvidas antes de prosseguir.
                </p>
              </div>

              {/* Botões do Modal */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-luxury-gold/15">
                <button
                  onClick={handleNavigateToConditions}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ver modalidades de acompanhamento</span>
                </button>

                <button
                  onClick={handleOpenWhatsAppFromModal}
                  className="flex items-center justify-center gap-2 border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold-light hover:text-white text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition cursor-pointer"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>Falar pelo WhatsApp</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
