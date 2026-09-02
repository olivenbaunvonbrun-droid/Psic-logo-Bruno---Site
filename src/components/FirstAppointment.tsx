import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
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
  Calendar, 
  Layers, 
  Sparkles, 
  Shield, 
  Smartphone,
  Receipt
} from 'lucide-react';
import { 
  fetchPricingSettingsFromCloud, 
  DEFAULT_PRICING_SETTINGS, 
  DEFAULT_PLANS,
  PricingSettings,
  PlanConfig
} from '../utils/pricingConfig';

export default function FirstAppointment() {
  const [pricingSettings, setPricingSettings] = useState<PricingSettings>(DEFAULT_PRICING_SETTINGS);

  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
    window.scrollTo(0, 0);

    fetchPricingSettingsFromCloud().then(cloudSettings => {
      setPricingSettings(cloudSettings);
    });

    const handlePricingUpdate = (e: any) => {
      if (e && e.detail) {
        setPricingSettings(e.detail);
      } else {
        fetchPricingSettingsFromCloud().then(setPricingSettings);
      }
    };
    window.addEventListener('pricing_config_updated', handlePricingUpdate);

    return () => {
      window.removeEventListener('pricing_config_updated', handlePricingUpdate);
      if (metaRobots) {
        metaRobots.content = 'index, follow';
      }
    };
  }, []);

  // Estado dos checkboxes de ciência ética
  const [checkedItems, setCheckedItems] = useState({
    noPromise: false,
    professionalFees: false,
    scheduleAlignment: false,
    urgencyLimits: false
  });

  const [showValidationAlert, setShowValidationAlert] = useState(false);

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
      const el = document.getElementById('declaracao-de-ciencia-primeiro');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.open(paymentUrl, '_blank');
  };

  const whatsappDirectUrl = "https://wa.me/5521975249514?text=" + encodeURIComponent(
    "Olá, Bruno! Gostaria de tirar algumas dúvidas antes de contratar meu primeiro atendimento psicológico."
  );

  // Localizar o plano definido como Primeiro Atendimento
  const firstAppointmentPlan: PlanConfig = 
    pricingSettings.plans.find(p => p.id === (pricingSettings.firstAppointmentPlanId || 'avulsa')) ||
    pricingSettings.plans.find(p => p.active) ||
    DEFAULT_PLANS[0];

  return (
    <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white overflow-hidden selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* Background patterned dots overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />

      {/* HEADER INSTITUCIONAL */}
      <header className="w-full bg-luxury-charcoal/90 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-50 py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

          <div className="flex items-center gap-3">
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
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* CABEÇALHO DO PRIMEIRO ATENDIMENTO */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-xs text-luxury-gold-light uppercase tracking-widest font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Primeiro Passo do Cuidado Clínico</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white font-semibold tracking-tight mb-3">
            Contratação do <span className="gold-gradient-text italic font-medium">Primeiro Atendimento</span>
          </h1>

          <p className="text-sm sm:text-base text-[#dfcaa7] font-medium tracking-wide mb-6">
            Condições profissionais transparentes e agendamento humanizado
          </p>

          <div className="bg-gradient-to-b from-luxury-charcoal/90 to-luxury-black/90 border border-luxury-gold/20 rounded-2xl p-6 text-left text-xs sm:text-sm text-zinc-300 leading-relaxed font-light space-y-3 shadow-xl backdrop-blur-sm">
            <p>
              Esta página destina-se à formalização do seu primeiro atendimento individual online com o psicólogo clínico Bruno de Oliveira Lima.
            </p>
            <p className="text-luxury-gold-light font-medium flex items-center gap-2 pt-1 border-t border-luxury-gold/10">
              <Shield className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>Atendimento individual com 50 minutos de duração, conduzido com sigilo ético absoluto (CRP 05/75885) e cadastro e-Psi regularizado.</span>
            </p>
          </div>
        </section>

        {/* SEÇÃO DE CIÊNCIA ÉTICA */}
        <section id="declaracao-de-ciencia-primeiro" className="max-w-3xl mx-auto mb-12">
          <div className={`relative rounded-3xl border transition-all duration-500 overflow-hidden ${
            showValidationAlert && !isAllChecked 
              ? 'bg-red-950/20 border-red-500/50 shadow-red-500/10 shadow-2xl ring-1 ring-red-500/30' 
              : isAllChecked 
                ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-500/5 shadow-2xl'
                : 'bg-luxury-charcoal/80 border-luxury-gold/30 shadow-2xl'
          } p-6 sm:p-8 backdrop-blur-md`}>
            
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

            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-5">
              Por favor, confirme os 4 itens éticos abaixo para liberar o botão de contratação:
            </p>

            <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-zinc-200">
              
              {/* Checkbox 1 */}
              <div 
                onClick={() => toggleCheck('noPromise')}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
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
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
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
                  Entendo que o valor apresentado corresponde a <strong className="font-medium text-white">honorários profissionais</strong> de atendimento particular.
                </span>
              </div>

              {/* Checkbox 3 */}
              <div 
                onClick={() => toggleCheck('scheduleAlignment')}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
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
                  Entendo que o <strong className="font-medium text-white">dia e horário do atendimento serão alinhados diretamente</strong> com o psicólogo via WhatsApp.
                </span>
              </div>

              {/* Checkbox 4 */}
              <div 
                onClick={() => toggleCheck('urgencyLimits')}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
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
                className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>Por favor, confirme as 4 declarações acima para habilitar a contratação.</span>
              </motion.div>
            )}
          </div>
        </section>

        {/* CARD ÚNICO DO PRIMEIRO ATENDIMENTO */}
        <section className="max-w-xl mx-auto mb-12">
          
          <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/60 via-luxury-gold/30 to-luxury-gold/10 shadow-2xl hover:shadow-luxury-gold/20 transition duration-500">
            <div className="relative bg-gradient-to-b from-[#181a24] via-[#101218] to-[#0a0b0f] rounded-[23px] p-6 sm:p-8 overflow-hidden">
              
              {/* Top Header do Card */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold-light text-xs font-mono uppercase tracking-wider font-semibold">
                  {firstAppointmentPlan.badge || 'Pontual'}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono bg-black/50 px-3 py-1 rounded-full border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-luxury-gold" /> {firstAppointmentPlan.periodLabel || '50 min'}
                </span>
              </div>

              {/* Título & Subtítulo */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/40 flex items-center justify-center text-luxury-gold shrink-0 shadow-lg">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white font-semibold leading-tight">
                    {firstAppointmentPlan.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {firstAppointmentPlan.sessionsSubtitle || '1 atendimento individual dedicado (50 min)'}
                  </p>
                </div>
              </div>

              {/* Caixa de Honorários */}
              <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/30 rounded-2xl p-4 sm:p-5 my-5 shadow-inner">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                  Honorários Profissionais
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">{firstAppointmentPlan.finalPrice}</span>
                  <span className="text-sm font-serif text-luxury-gold-light">,00</span>
                </div>
                <div className="mt-2 pt-2 border-t border-luxury-gold/15 flex items-center gap-1.5 text-xs text-luxury-gold-light font-medium">
                  <CreditCard className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                  <span>{firstAppointmentPlan.installmentText || 'Pagamento único por sessão'}</span>
                </div>
              </div>

              {/* Descrição Clínica */}
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {firstAppointmentPlan.description}
              </p>

              {/* Lista de Benefícios */}
              <div className="border-t border-luxury-gold/15 pt-4 mb-6">
                <h4 className="text-xs font-serif font-semibold text-luxury-gold mb-3 uppercase tracking-wider">
                  O que está incluso neste atendimento:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200 font-light">
                  {(firstAppointmentPlan.features || []).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão de Contratação */}
              <div className="mt-6">
                <button
                  onClick={() => handleFormalizationClick(firstAppointmentPlan.paymentLink)}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-xl shadow-luxury-gold/25 active:scale-[0.98]'
                      : 'bg-zinc-800/80 text-zinc-400 border border-white/10 hover:border-luxury-gold/30 hover:text-zinc-200'
                  }`}
                >
                  {isAllChecked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <span>{firstAppointmentPlan.buttonText || 'Contratar meu primeiro atendimento'}</span>
                  <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
                </button>
                {!isAllChecked && (
                  <p className="text-[10px] text-zinc-400 text-center font-mono mt-2">
                    Marque as 4 confirmações acima para habilitar o pagamento
                  </p>
                )}
              </div>

              {/* AVISO IMPORTANTE DE REDIRECIONAMENTO AO WHATSAPP */}
              <div className="mt-5 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white font-semibold">Agendamento direto:</strong> Após a efetuação e confirmação do pagamento, você será automaticamente redirecionado para o WhatsApp do psicólogo para agendar o melhor dia e horário da sua consulta.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* LINK PARA OUTRAS MODALIDADES DE PLANOS */}
        <section className="text-center max-w-md mx-auto mb-14">
          <p className="text-xs text-zinc-400 mb-2">
            Procura por acompanhamento mensal ou continuado com condições estruturadas?
          </p>
          <a
            href="/condicoes-de-atendimento"
            className="inline-flex items-center gap-1.5 text-xs text-luxury-gold-light hover:text-white font-medium underline underline-offset-4 transition"
          >
            <span>Conhecer outras modalidades de acompanhamento</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </section>

        {/* CANAL DE DÚVIDAS */}
        <section className="text-center bg-gradient-to-b from-luxury-charcoal/60 to-luxury-black border border-luxury-gold/20 rounded-3xl p-8 mb-12 shadow-xl">
          <HeartHandshake className="w-9 h-9 text-luxury-gold mx-auto mb-2" />
          <h3 className="text-base sm:text-lg font-serif text-white font-semibold mb-1">
            Precisa tirar alguma dúvida antes de iniciar?
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5 font-light">
            Converse diretamente com o psicólogo pelo WhatsApp para verificar horários ou esclarecer o funcionamento das sessões online.
          </p>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </section>

        {/* RODAPÉ */}
        <footer className="text-center pt-6 border-t border-white/10 text-[11px] text-zinc-500 font-mono space-y-1">
          <p>Bruno de Oliveira Lima • Psicólogo Clínico • CRP 05/75885</p>
          <p>Atendimento psicológico online regularizado pelo Conselho Federal de Psicologia (e-Psi).</p>
        </footer>

      </main>

    </div>
  );
}
