import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  MessageSquareHeart, 
  Brain, 
  Compass, 
  HeartHandshake, 
  Clock, 
  Video, 
  Lock, 
  Award, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function LandPage() {
  const whatsappUrl = "https://wa.me/5521975249514?text=" + encodeURIComponent(
    "Olá, Bruno! Acessei sua landing page de atendimento e gostaria de agendar uma sessão de acolhimento psicológico com você."
  );

  const handleDirectWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

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
                Psicólogo Clínico • CRP 05/75885
              </p>
            </div>
          </div>

          <button
            onClick={handleDirectWhatsApp}
            className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <span>Agendar Sessão</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
              <span>TCC de 4ª Geração & Neurociência Comportamental</span>
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
              Acolhimento Psicológico Clínico 100% Online com Bruno de Oliveira (CRP 05/75885)
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
                    <p className="text-xs text-luxury-gold-light font-sans">Sessões individuais por chamada criptografada com sigilo absoluto</p>
                  </div>
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] px-3 py-1 rounded-full hidden sm:flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    e-Psi Ativo
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl font-serif text-white font-medium mb-6"
            >
              Uma experiência acolhedora, científica e transformadora. Está pronto para começar?
            </motion.h3>

            {/* Direct CTA Button (Sem redirecionamento intermediário) */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={handleDirectWhatsApp}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-12 py-5 rounded-full shadow-xl shadow-luxury-gold/15 transition duration-300 cursor-pointer"
            >
              <MessageSquareHeart className="w-6 h-6 shrink-0" />
              <span>Agendar meu Atendimento Online</span>
            </motion.button>

            <p className="text-xs sm:text-sm text-luxury-text-muted mt-6 max-w-lg leading-relaxed font-light">
              Tudo pensado para a sua total comodidade, privacidade e segurança. Cuidado de excelência onde você estiver, sem precisar sair de casa.
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
              Autoconhecimento, regulação emocional profunda e transformação através da TCC Integrativa de 4ª Geração, amparada pelas neurociências mundiais.
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

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight leading-snug mb-8">
                Já buscou de todas as formas, mas a ansiedade, a tristeza ou a sobrecarga continuam com você todos os dias?
              </h2>

              <div className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light flex flex-col gap-5">
                <p>
                  Muitas pessoas chegam ao meu consultório após passarem anos lutando sozinhas contra pensamentos invasivos, desgastes relacionais e tentativas cansativas de fingir que está tudo bem.
                </p>
                <p>
                  E você sabe por que isso acontece? Porque a mente humana não se cura através da culpa ou de cobranças mecânicas. É necessário compreender a <strong className="text-white font-medium">raiz inconsciente dos seus gatilhos</strong> e reorganizar os padrões neurobiológicos que sustentam a sua angústia.
                </p>
                <p className="border-l-2 border-luxury-gold pl-4 py-1 text-[#dfcaa7] italic font-serif">
                  "A sua dor não é fraqueza, preguiça ou falha de caráter. É a sua mente pedindo acolhimento e respostas estruturadas para respirar em paz."
                </p>
                <p>
                  O único caminho sustentável para sair desse ciclo é identificar os momentos em que essas defesas foram construídas e aprender ferramentas práticas de regulação emocional para recuperar a sua autonomia.
                </p>
                <p className="text-white font-medium">
                  Em uma sessão clínica individual de 60 minutos, você terá um espaço seguro, horizontal e sem julgamentos para finalmente ser ouvido de verdade.
                </p>
              </div>

              <div className="mt-10 flex justify-center sm:justify-start">
                <button
                  onClick={handleDirectWhatsApp}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  <span>Quero Mudar Essa Realidade</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 4: O QUE VOCÊ TERÁ (60 MINUTOS DE ATENDIMENTO) */}
        <section className="py-24 bg-luxury-charcoal px-6 border-t border-luxury-gold/10">
          <div className="max-w-6xl mx-auto text-center">
            
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-luxury-gold" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Estrutura Clínica</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
              O que você terá em <span className="gold-gradient-text italic font-medium">60 minutos</span> de atendimento?
            </h2>
            
            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#dfcaa7] font-semibold mb-16">
              Atendimento Individual, Humanizado e Baseado em Evidências Científicas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              
              {/* Card 1 */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">1. Escuta Ativa & Acolhimento</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  No primeiro momento, conversamos abertamente para compreender sua história, dores imediatas e rotina. É o seu espaço de total liberdade para desabafar sem receio de julgamentos éticos ou morais.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">2. Diagnóstico & Descoberta</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  Mapeamos com precisão a origem dos pensamentos automáticos e as armaduras emocionais que mantêm a ansiedade ou o vazio em repetição, iluminando a raiz invisível do sofrimento.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-luxury-black/60 p-8 rounded-2xl border border-luxury-gold/15 flex flex-col gap-4 shadow-xl hover:border-luxury-gold/40 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">3. Plano Clínico & Direcionamento</h3>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                  Construímos juntos um plano de acompanhamento estruturado com ferramentas práticas de Atenção Plena e TCC de 4ª geração, para você aplicar no dia a dia e retomar o protagonismo da sua vida.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO 5: FORMATO DA CONSULTA & AGENDAMENTO DIRETO */}
        <section className="py-24 bg-luxury-black px-6">
          <div className="max-w-2xl mx-auto">
            
            <div className="bg-gradient-to-b from-luxury-charcoal to-luxury-black border-2 border-luxury-gold/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center">
              
              <span className="px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
                Sessão Clínica Integrativa
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-6">
                Escuta Profunda + Mapeamento de Raiz + Plano Prático
              </h2>

              <ul className="text-left w-full max-w-md space-y-3.5 my-6">
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span><strong>60 Minutos</strong> de Atendimento Individual Dedicado</span>
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
                  <span>Cadastro <strong>e-Psi Ativo</strong> para Sessões Nacionais e Internacionais</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <Sparkles className="w-5 h-5 text-luxury-gold shrink-0" />
                  <span>Sem Precisar Enfrentar Trânsito ou Sair de Casa</span>
                </li>
              </ul>

              <p className="text-xs sm:text-sm text-luxury-gold-light font-medium tracking-wide my-4">
                Dê o primeiro passo para ressignificar a sua dor e viver com plenitude.
              </p>

              {/* Botão de Agendamento Direto */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs sm:text-sm uppercase tracking-wider py-4.5 rounded-full shadow-lg shadow-luxury-gold/15 transition cursor-pointer mt-4"
              >
                <MessageSquareHeart className="w-5 h-5 shrink-0" />
                <span>Agendar minha Sessão Agora</span>
              </button>

              <span className="text-[11px] text-zinc-500 mt-3 font-mono">
                Atendimento particular com emissão de recibo para reembolso
              </span>

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
                <p className="text-xs text-luxury-gold-light font-medium tracking-wide">Psicólogo Clínico Integrativo</p>
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
                  Bruno de Oliveira é psicólogo clínico especialista em TCC Integrativa de 4ª Geração, dedicando sua carreira ao alívio do sofrimento psicológico, superação de traumas e desenvolvimento da inteligência emocional.
                </p>
                <p>
                  Com formação sólida em Neurociências, Terapia de Aceitação e Compromisso (ACT) e profundidade psicanalítica, seu trabalho une ferramentas práticas cientificamente validadas à empatia incondicional pelo ser humano.
                </p>
                <p>
                  Cada atendimento é um espaço de refúgio e dignidade, estruturado sob medida para a sua história única, visando construir autonomia e paz interna.
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

        {/* SEÇÃO 8: FINALIZAÇÃO & SUPORTE */}
        <section className="py-24 bg-gradient-to-b from-luxury-charcoal to-luxury-black px-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
              Sua felicidade e paz de espírito não podem ser <span className="gold-gradient-text italic font-medium">adiadas</span>.
            </h2>

            {/* Destaques de Confiança */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-6 text-xs sm:text-sm text-zinc-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Resultados Baseados em Evidências
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Acolhimento Humanizado
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Ferramentas Práticas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Totalmente Seguro
              </span>
            </div>

            <p className="text-xs sm:text-sm text-luxury-text-muted mb-8 max-w-md font-light">
              Clique no botão abaixo para agendar a sua sessão diretamente pelo WhatsApp com Bruno de Oliveira Lima.
            </p>

            {/* Botão Final de Agendamento */}
            <button
              onClick={handleDirectWhatsApp}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-sm sm:text-base uppercase tracking-wider px-10 py-5 rounded-full shadow-2xl shadow-luxury-gold/20 transition cursor-pointer"
            >
              <MessageSquareHeart className="w-5 h-5 shrink-0" />
              <span>Quero Iniciar meu Atendimento</span>
            </button>

            {/* Dúvidas / Suporte Direto */}
            <div className="mt-14 pt-10 border-t border-luxury-gold/15 w-full">
              <p className="text-xs sm:text-sm text-luxury-text-muted font-light mb-3">
                Possui alguma dúvida específica sobre o formato das sessões ou horários disponíveis?
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold-light hover:text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300"
              >
                <span>Tirar dúvidas pelo WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Logo Marca no Rodapé */}
            <div className="mt-12 opacity-80">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center mx-auto bg-luxury-black p-1">
                <img 
                  src="/media__1779535801913.png" 
                  alt="Logo Bruno de Oliveira" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">
                Bruno de Oliveira Lima • CRP 05/75885 • Todos os direitos reservados
              </p>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
