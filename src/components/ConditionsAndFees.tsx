import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  ArrowLeft, 
  MessageSquareHeart, 
  ExternalLink,
  Lock,
  Unlock,
  HeartHandshake,
  Check,
  CreditCard,
  User,
  Layers,
  Sparkles,
  CalendarDays,
  Shield,
  ChevronLeft,
  ChevronRight,
  MoveRight
} from 'lucide-react';

export default function ConditionsAndFees() {
  // Configuração técnica: Garantir meta robots noindex/nofollow dinamicamente
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';

    // Rolar ao topo ao carregar a página
    window.scrollTo(0, 0);

    return () => {
      // Reverter se sair da página
      if (metaRobots) {
        metaRobots.content = 'index, follow';
      }
    };
  }, []);

  // Estado dos checkboxes de ciência
  const [checkedItems, setCheckedItems] = useState({
    noPromise: false,
    professionalFees: false,
    scheduleAlignment: false,
    urgencyLimits: false
  });

  const [showValidationAlert, setShowValidationAlert] = useState(false);

  // Controle do Carrossel Horizontal
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('[data-card-item]') as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 360;
      const gap = 24; // 1.5rem (gap-6)
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setActiveCardIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeCardIndex + 1, 3);
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(activeCardIndex - 1, 0);
    scrollToIndex(prevIdx);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const firstCard = container.querySelector('[data-card-item]') as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 360;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCardIndex(Math.min(Math.max(newIndex, 0), 3));
    }
  };

  const toggleCheck = (key: keyof typeof checkedItems) => {
    setCheckedItems(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (next.noPromise && next.professionalFees && next.scheduleAlignment && next.urgencyLimits) {
        setShowValidationAlert(false);
      }
      return next;
    });
  };

  const isAllChecked = 
    checkedItems.noPromise && 
    checkedItems.professionalFees && 
    checkedItems.scheduleAlignment && 
    checkedItems.urgencyLimits;

  const handleFormalizationClick = (paymentUrl: string) => {
    if (!isAllChecked) {
      setShowValidationAlert(true);
      // Rolar suavemente até a seção de ciência
      const el = document.getElementById('declaracao-de-ciencia');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.open(paymentUrl, '_blank');
  };

  const whatsappDirectUrl = "https://wa.me/5521975249514?text=" + encodeURIComponent(
    "Olá, Bruno! Acessei a página de condições e honorários e gostaria de tirar algumas dúvidas sobre as modalidades de acompanhamento."
  );

  return (
    <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white overflow-hidden selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* Background patterned dots overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />

      {/* HEADER INSTITUCIONAL RESERVADO */}
      <header className="w-full bg-luxury-charcoal/90 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-50 py-3.5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <a 
              href="/landpage"
              className="flex items-center gap-1.5 text-xs text-luxury-gold-light hover:text-white transition font-medium mr-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition duration-200" />
              <span className="hidden sm:inline">Voltar à apresentação</span>
            </a>
            <div className="w-10 h-10 rounded-full border border-luxury-gold/40 flex items-center justify-center bg-[#07090f] overflow-hidden shrink-0 shadow-md">
              <img 
                src="/media__1779535801913.png" 
                alt="Logo Bruno de Oliveira" 
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <div>
              <h1 className="font-serif text-white font-semibold text-xs sm:text-sm tracking-wide leading-tight">
                Bruno de Oliveira Lima
              </h1>
              <p className="text-[10px] sm:text-xs text-luxury-gold-light font-mono">
                Psicólogo Clínico • CRP 05/75885
              </p>
            </div>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-luxury-gold/30 hover:border-luxury-gold bg-luxury-gold/5 hover:bg-luxury-gold/10 text-luxury-gold-light hover:text-white text-xs font-sans px-4 py-2 rounded-full transition"
          >
            <MessageSquareHeart className="w-4 h-4 text-luxury-gold" />
            <span className="hidden sm:inline">Dúvidas via WhatsApp</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-16">

        {/* CABEÇALHO DA PÁGINA DE MODALIDADES */}
        <section className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-xs text-luxury-gold-light uppercase tracking-widest font-medium mb-4">
            <FileText className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Condições Técnicas & Formalização</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white font-semibold tracking-tight mb-3">
            Modalidades de <span className="gold-gradient-text italic font-medium">Acompanhamento</span>
          </h1>

          <p className="text-sm sm:text-base text-[#dfcaa7] font-medium tracking-wide mb-6">
            Condições de contratação e honorários profissionais transparentes
          </p>

          <div className="bg-gradient-to-b from-luxury-charcoal/90 to-luxury-black/90 border border-luxury-gold/20 rounded-2xl p-6 sm:p-7 text-left text-xs sm:text-sm text-zinc-300 leading-relaxed font-light space-y-3 shadow-xl backdrop-blur-sm">
            <p>
              Esta página apresenta as modalidades de organização do acompanhamento psicológico e seus respectivos honorários profissionais.
            </p>
            <p>
              As informações abaixo são disponibilizadas exclusivamente para fins de transparência antes da contratação, não constituindo promoção, desconto, promessa de resultado ou comparação com outros profissionais.
            </p>
            <p className="text-luxury-gold-light font-medium flex items-center gap-2 pt-1 border-t border-luxury-gold/10">
              <Shield className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>O acompanhamento será conduzido por Bruno de Oliveira Lima — Psicólogo Clínico — CRP 05/75885, respeitando o sigilo profissional, a autonomia do paciente e os limites técnicos da prática psicológica.</span>
            </p>
          </div>
        </section>

        {/* SEÇÃO 1: DECLARAÇÃO DE CIÊNCIA E CONCORDÂNCIA */}
        <section id="declaracao-de-ciencia" className="max-w-4xl mx-auto mb-16">
          <div className={`relative rounded-3xl border transition-all duration-500 overflow-hidden ${
            showValidationAlert && !isAllChecked 
              ? 'bg-red-950/20 border-red-500/50 shadow-red-500/10 shadow-2xl ring-1 ring-red-500/30' 
              : isAllChecked 
                ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-500/5 shadow-2xl'
                : 'bg-luxury-charcoal/80 border-luxury-gold/30 shadow-2xl'
          } p-7 sm:p-9 backdrop-blur-md`}>
            
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition duration-300 ${
                  isAllChecked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-luxury-gold/10 text-luxury-gold'
                }`}>
                  {isAllChecked ? <Unlock className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-serif text-white font-semibold">
                    Confirmação prévia de entendimento
                  </h2>
                  <p className="text-xs text-luxury-text-muted">
                    Etapa ética obrigatória antes da formalização
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono px-3 py-1 rounded-full border bg-black/40 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isAllChecked ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                <span className="text-zinc-300">
                  {Object.values(checkedItems).filter(Boolean).length} de 4 confirmados
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6">
              Para liberar os botões de formalização, por favor leia e confirme os 4 itens abaixo:
            </p>

            <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm text-zinc-200">
              
              {/* Checkbox 1 */}
              <div 
                onClick={() => toggleCheck('noPromise')}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  checkedItems.noPromise 
                    ? 'bg-luxury-gold/10 border-luxury-gold/40 text-white' 
                    : 'bg-luxury-black/60 border-white/5 hover:border-luxury-gold/30 text-zinc-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {checkedItems.noPromise ? (
                    <div className="w-5 h-5 rounded-md bg-luxury-gold flex items-center justify-center text-luxury-black font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-zinc-500 bg-black/40 flex items-center justify-center hover:border-luxury-gold" />
                  )}
                </div>
                <span className="leading-snug font-light">
                  Entendo que o acompanhamento psicológico <strong className="font-medium text-white">não oferece promessa de resultado específico</strong>.
                </span>
              </div>

              {/* Checkbox 2 */}
              <div 
                onClick={() => toggleCheck('professionalFees')}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  checkedItems.professionalFees 
                    ? 'bg-luxury-gold/10 border-luxury-gold/40 text-white' 
                    : 'bg-luxury-black/60 border-white/5 hover:border-luxury-gold/30 text-zinc-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {checkedItems.professionalFees ? (
                    <div className="w-5 h-5 rounded-md bg-luxury-gold flex items-center justify-center text-luxury-black font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-zinc-500 bg-black/40 flex items-center justify-center hover:border-luxury-gold" />
                  )}
                </div>
                <span className="leading-snug font-light">
                  Entendo que os valores apresentados correspondem a <strong className="font-medium text-white">honorários profissionais e condições de contratação</strong>, não a promoção, desconto ou oferta comercial.
                </span>
              </div>

              {/* Checkbox 3 */}
              <div 
                onClick={() => toggleCheck('scheduleAlignment')}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  checkedItems.scheduleAlignment 
                    ? 'bg-luxury-gold/10 border-luxury-gold/40 text-white' 
                    : 'bg-luxury-black/60 border-white/5 hover:border-luxury-gold/30 text-zinc-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {checkedItems.scheduleAlignment ? (
                    <div className="w-5 h-5 rounded-md bg-luxury-gold flex items-center justify-center text-luxury-black font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-zinc-500 bg-black/40 flex items-center justify-center hover:border-luxury-gold" />
                  )}
                </div>
                <span className="leading-snug font-light">
                  Entendo que o <strong className="font-medium text-white">dia e horário dos atendimentos serão alinhados diretamente</strong> com o psicólogo via WhatsApp.
                </span>
              </div>

              {/* Checkbox 4 */}
              <div 
                onClick={() => toggleCheck('urgencyLimits')}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  checkedItems.urgencyLimits 
                    ? 'bg-luxury-gold/10 border-luxury-gold/40 text-white' 
                    : 'bg-luxury-black/60 border-white/5 hover:border-luxury-gold/30 text-zinc-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {checkedItems.urgencyLimits ? (
                    <div className="w-5 h-5 rounded-md bg-luxury-gold flex items-center justify-center text-luxury-black font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-zinc-500 bg-black/40 flex items-center justify-center hover:border-luxury-gold" />
                  )}
                </div>
                <span className="leading-snug font-light">
                  Entendo que, em <strong className="font-medium text-white">situações de urgência, emergência, risco iminente ou violência</strong>, o atendimento online não é a modalidade indicada.
                </span>
              </div>

            </div>

            {showValidationAlert && !isAllChecked && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>Por favor, assinale as 4 confirmações acima para habilitar a formalização dos planos.</span>
              </motion.div>
            )}

            {isAllChecked && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300"
              >
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Confirmações registradas com sucesso. Os botões de formalização estão liberados abaixo.</span>
              </motion.div>
            )}
          </div>
        </section>

        {/* SEÇÃO 2: CARDS DE PLANOS EM ROLAGEM HORIZONTAL ELEGANTE */}
        <section className="mb-20">
          
          {/* Header da Seção com Controles de Navegação */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-semibold tracking-tight">
                Opções de Organização do Atendimento
              </h2>
              <p className="text-xs sm:text-sm text-luxury-gold-light mt-1 font-mono flex items-center gap-1.5">
                <span>Deslize horizontalmente para comparar as 4 opções</span>
                <MoveRight className="w-3.5 h-3.5 inline animate-pulse text-luxury-gold" />
              </p>
            </div>

            {/* Controles de Setas Esquerda/Direita */}
            <div className="flex items-center gap-2.5 self-center sm:self-auto">
              <button
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                aria-label="Plano anterior"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  activeCardIndex === 0
                    ? 'border-white/10 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-luxury-gold/40 text-luxury-gold-light hover:text-luxury-black hover:bg-luxury-gold hover:border-luxury-gold shadow-md active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-zinc-400 px-2 select-none">
                <span className="text-luxury-gold font-bold">{activeCardIndex + 1}</span> / 4
              </div>

              <button
                onClick={handleNext}
                disabled={activeCardIndex === 3}
                aria-label="Próximo plano"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  activeCardIndex === 3
                    ? 'border-white/10 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-luxury-gold/40 text-luxury-gold-light hover:text-luxury-black hover:bg-luxury-gold hover:border-luxury-gold shadow-md active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CONTAINER COM ROLAGEM HORIZONTAL */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 scroll-smooth no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >

            {/* ========================================================= */}
            {/* CARD 1: CONSULTA AVULSA */}
            {/* ========================================================= */}
            <div 
              data-card-item
              className="w-[85vw] max-w-[370px] sm:w-[370px] md:w-[380px] shrink-0 snap-center relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/30 via-luxury-gold/10 to-white/5 hover:from-luxury-gold/60 hover:via-luxury-gold/30 hover:to-luxury-gold/15 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-luxury-gold/10 flex flex-col"
            >
              <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Background aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-luxury-gold/10 transition duration-500" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
                      Atendimento Pontual
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <Clock className="w-3.5 h-3.5 text-luxury-gold" /> 50 min
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 shadow-md group-hover:scale-105 transition duration-300">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight">
                        Consulta avulsa
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        1 atendimento individual
                      </p>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/20 rounded-2xl p-4 sm:p-5 my-5 shadow-inner">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                      Honorários da Sessão
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">147</span>
                      <span className="text-sm font-serif text-luxury-gold-light">,00</span>
                    </div>
                    <div className="mt-2 text-[11px] text-zinc-400 font-mono">
                      Pagamento único referente a 1 sessão
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Indicada para primeiro atendimento, atendimento pontual, retorno isolado ou para quem deseja conhecer o método antes de iniciar um acompanhamento contínuo.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-zinc-300 font-light border-t border-luxury-gold/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>50 minutos de escuta clínica dedicada</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Emissão de recibo oficial CRP para reembolso</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Plataforma individual e 100% criptografada</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Alinhamento de dia e horário pelo WhatsApp</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <div>
                  <button
                    onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/0NHcZTh')}
                    className={`w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      isAllChecked
                        ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-lg shadow-luxury-gold/15 active:scale-[0.98]'
                        : 'bg-zinc-800/80 text-zinc-400 border border-white/10 hover:border-luxury-gold/30 hover:text-zinc-200'
                    }`}
                  >
                    {isAllChecked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>Formalizar consulta avulsa</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </button>
                  {!isAllChecked && (
                    <p className="text-[10px] text-zinc-500 text-center font-mono mt-2">
                      Marque as confirmações acima para habilitar
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* CARD 2: ACOMPANHAMENTO MENSAL */}
            {/* ========================================================= */}
            <div 
              data-card-item
              className="w-[85vw] max-w-[370px] sm:w-[370px] md:w-[380px] shrink-0 snap-center relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/40 via-luxury-gold/15 to-white/5 hover:from-luxury-gold/70 hover:via-luxury-gold/40 hover:to-luxury-gold/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-luxury-gold/15 flex flex-col"
            >
              <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Background aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-luxury-gold/10 transition duration-500" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
                      Frequência Semanal
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <CalendarDays className="w-3.5 h-3.5 text-luxury-gold" /> 30 dias
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 shadow-md group-hover:scale-105 transition duration-300">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight">
                        Acompanhamento mensal
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        4 atendimentos no mês
                      </p>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/25 rounded-2xl p-4 sm:p-5 my-5 shadow-inner">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                      Honorários do Plano (4 Sessões)
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">420</span>
                      <span className="text-sm font-serif text-luxury-gold-light">,00</span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-luxury-gold/15 flex items-center gap-1.5 text-xs text-luxury-gold-light font-sans font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span>Possibilidade em 2 pagamentos de R$ 210,00</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Indicado para quem deseja iniciar ou manter um processo terapêutico com frequência semanal, favorecendo continuidade, vínculo e acompanhamento clínico ao longo do mês.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-zinc-300 font-light border-t border-luxury-gold/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>4 atendimentos clínicos ao longo de 30 dias</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Estruturação contínua e vínculo terapêutico</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Emissão de recibos para reembolso no convênio</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Horário semanal fixo reservado para você</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <div>
                  <button
                    onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/Bf7QgxM')}
                    className={`w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      isAllChecked
                        ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-lg shadow-luxury-gold/15 active:scale-[0.98]'
                        : 'bg-zinc-800/80 text-zinc-400 border border-white/10 hover:border-luxury-gold/30 hover:text-zinc-200'
                    }`}
                  >
                    {isAllChecked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>Formalizar acompanhamento mensal</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </button>
                  {!isAllChecked && (
                    <p className="text-[10px] text-zinc-500 text-center font-mono mt-2">
                      Marque as confirmações acima para habilitar
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* CARD 3: ACOMPANHAMENTO BIMESTRAL */}
            {/* ========================================================= */}
            <div 
              data-card-item
              className="w-[85vw] max-w-[370px] sm:w-[370px] md:w-[380px] shrink-0 snap-center relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/40 via-luxury-gold/15 to-white/5 hover:from-luxury-gold/70 hover:via-luxury-gold/40 hover:to-luxury-gold/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-luxury-gold/15 flex flex-col"
            >
              <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Background aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-luxury-gold/10 transition duration-500" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
                      Aprofundamento Clínico
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <CalendarDays className="w-3.5 h-3.5 text-luxury-gold" /> 60 dias
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 shadow-md group-hover:scale-105 transition duration-300">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight">
                        Acompanhamento bimestral
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        8 atendimentos ao longo de 2 meses
                      </p>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/25 rounded-2xl p-4 sm:p-5 my-5 shadow-inner">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                      Honorários do Plano (8 Sessões)
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">740</span>
                      <span className="text-sm font-serif text-luxury-gold-light">,00</span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-luxury-gold/15 flex items-center gap-1.5 text-xs text-luxury-gold-light font-sans font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span>Possibilidade em 2x de R$ 370,00 ou 4x de R$ 185,00</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Indicado para quem deseja maior continuidade no acompanhamento, permitindo aprofundar a compreensão dos padrões emocionais, relacionais e comportamentais trabalhados no processo terapêutico.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-zinc-300 font-light border-t border-luxury-gold/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>8 atendimentos clínicos no período de 60 dias</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Aprofundamento de esquemas e regulação emocional</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Emissão de recibos mensais para reembolso</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Acompanhamento sistemático e personalizado</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <div>
                  <button
                    onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/J1OGbSJ')}
                    className={`w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      isAllChecked
                        ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-lg shadow-luxury-gold/15 active:scale-[0.98]'
                        : 'bg-zinc-800/80 text-zinc-400 border border-white/10 hover:border-luxury-gold/30 hover:text-zinc-200'
                    }`}
                  >
                    {isAllChecked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>Formalizar acompanhamento bimestral</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </button>
                  {!isAllChecked && (
                    <p className="text-[10px] text-zinc-500 text-center font-mono mt-2">
                      Marque as confirmações acima para habilitar
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* CARD 4: ACOMPANHAMENTO TRIMESTRAL */}
            {/* ========================================================= */}
            <div 
              data-card-item
              className="w-[85vw] max-w-[370px] sm:w-[370px] md:w-[380px] shrink-0 snap-center relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/40 via-luxury-gold/15 to-white/5 hover:from-luxury-gold/70 hover:via-luxury-gold/40 hover:to-luxury-gold/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-luxury-gold/15 flex flex-col"
            >
              <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Background aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-luxury-gold/10 transition duration-500" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
                      Desenvolvimento Estruturado
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <CalendarDays className="w-3.5 h-3.5 text-luxury-gold" /> 90 dias
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 shadow-md group-hover:scale-105 transition duration-300">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight">
                        Acompanhamento trimestral
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        12 atendimentos ao longo de 3 meses
                      </p>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/25 rounded-2xl p-4 sm:p-5 my-5 shadow-inner">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                      Honorários do Plano (12 Sessões)
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">960</span>
                      <span className="text-sm font-serif text-luxury-gold-light">,00</span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-luxury-gold/15 flex items-center gap-1.5 text-xs text-luxury-gold-light font-sans font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span>Possibilidade em 3 pagamentos de R$ 320,00</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Indicado para quem deseja estruturar um acompanhamento com maior regularidade ao longo de três meses, favorecendo continuidade clínica, construção de objetivos terapêuticos e desenvolvimento gradual de recursos psicológicos.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-zinc-300 font-light border-t border-luxury-gold/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>12 atendimentos clínicos no período de 90 dias</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Plano Clínico Integrativo com metas bem definidas</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Treinamento aprofundado de Habilidades Psicológicas</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Emissão de recibos mensais para reembolso no convênio</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <div>
                  <button
                    onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/59UayeX')}
                    className={`w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      isAllChecked
                        ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-lg shadow-luxury-gold/15 active:scale-[0.98]'
                        : 'bg-zinc-800/80 text-zinc-400 border border-white/10 hover:border-luxury-gold/30 hover:text-zinc-200'
                    }`}
                  >
                    {isAllChecked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>Formalizar acompanhamento trimestral</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </button>
                  {!isAllChecked && (
                    <p className="text-[10px] text-zinc-500 text-center font-mono mt-2">
                      Marque as confirmações acima para habilitar
                    </p>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Dots de Paginação Interativos */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir para o plano ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCardIndex === index 
                    ? 'w-8 bg-gradient-to-r from-luxury-gold to-luxury-gold-light shadow-md shadow-luxury-gold/30' 
                    : 'w-2.5 bg-zinc-700 hover:bg-luxury-gold/40'
                }`}
              />
            ))}
          </div>

        </section>

        {/* SEÇÃO 3: INFORMAÇÕES IMPORTANTES (CONTRATUAIS E ÉTICAS) */}
        <section className="bg-gradient-to-b from-luxury-charcoal/80 to-luxury-black/90 border border-luxury-gold/20 rounded-3xl p-8 sm:p-10 mb-14 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/25 flex items-center justify-center text-luxury-gold shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold">
              Informações importantes
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            <p>
              • As modalidades acima não representam promessa de cura, garantia de resultado, previsão de evolução clínica ou obrigação de permanência no acompanhamento.
            </p>
            <p>
              • A escolha da modalidade deve considerar a demanda apresentada, a disponibilidade do paciente, a avaliação técnica do psicólogo e as condições acordadas entre as partes.
            </p>
            <p>
              • O processo terapêutico depende de múltiplos fatores, incluindo frequência, vínculo terapêutico, participação ativa do paciente, complexidade da demanda e continuidade do trabalho clínico.
            </p>
            <p>
              • As sessões têm duração aproximada de <strong>50 minutos</strong>.
            </p>
            <p>
              • O dia e horário dos atendimentos serão alinhados diretamente pelo WhatsApp.
            </p>
            <p>
              • Remarcações devem ser solicitadas com antecedência mínima de 24 horas.
            </p>
            <p>
              • Faltas sem aviso prévio poderão ser consideradas como sessão realizada.
            </p>
            <p>
              • Os atendimentos devem ser utilizados dentro do período correspondente à modalidade contratada, salvo acordo específico entre psicólogo e paciente.
            </p>
            <p>
              • O acompanhamento pode ser reavaliado a qualquer momento, conforme necessidade clínica, disponibilidade e acordo entre as partes.
            </p>
            <p>
              • O pagamento não substitui o contrato terapêutico, a avaliação inicial da demanda e a definição técnica da adequação do atendimento online.
            </p>
            <p>
              • Após a confirmação do pagamento, o psicólogo entrará em contato para alinhamento do atendimento e envio das orientações iniciais.
            </p>
            <p className="border-t border-white/10 pt-4 text-zinc-400">
              • Em situações de urgência, emergência, risco iminente, violência ou ameaça à integridade, o atendimento online pode não ser a modalidade indicada. Nesses casos, recomenda-se buscar serviços presenciais, rede de urgência/emergência (como SAMU 192, CVV 188 ou CAPS) ou órgãos competentes.
            </p>
          </div>
        </section>

        {/* CANAL DE DÚVIDAS E ALINHAMENTO */}
        <section className="text-center bg-gradient-to-b from-luxury-charcoal/60 to-luxury-black border border-luxury-gold/20 rounded-3xl p-8 sm:p-10 mb-12 shadow-xl">
          <HeartHandshake className="w-10 h-10 text-luxury-gold mx-auto mb-3" />
          <h3 className="text-lg sm:text-xl font-serif text-white font-semibold mb-2">
            Prefere alinhar antes de formalizar?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 font-light">
            Se você tiver dúvidas sobre horários, adequação da queixa ou funcionamento das sessões, sinta-se à vontade para enviar uma mensagem diretamente.
          </p>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Falar com o psicólogo no WhatsApp</span>
          </a>
        </section>

        {/* RODAPÉ TÉCNICO E LEGAL */}
        <footer className="text-center pt-6 border-t border-white/10 text-[11px] text-zinc-500 font-mono space-y-1">
          <p>Bruno de Oliveira Lima • Psicólogo Clínico • CRP 05/75885</p>
          <p>Atendimento psicológico online regularizado pelo Conselho Federal de Psicologia (e-Psi).</p>
          <p className="text-[10px] text-zinc-600 pt-2">Página com finalidade de transparência e formalização de contratação privada.</p>
        </footer>

      </main>

    </div>
  );
}
