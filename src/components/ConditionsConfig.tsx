import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  ArrowLeft, 
  ExternalLink, 
  Calculator, 
  CheckCircle2, 
  Percent, 
  CreditCard, 
  Link as LinkIcon, 
  Eye, 
  Clock, 
  User, 
  Calendar, 
  Layers, 
  Sparkles, 
  CalendarDays, 
  Check, 
  Lock, 
  Unlock, 
  AlertCircle,
  Copy,
  Download,
  Upload
} from 'lucide-react';
import { 
  PricingSettings, 
  getPricingSettings, 
  savePricingSettings, 
  resetPricingSettings,
  PlanConfig
} from '../utils/pricingConfig';

export default function ConditionsConfig() {
  const [settings, setSettings] = useState<PricingSettings>(getPricingSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Configuração técnica: noindex/nofollow para a página de config
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
    window.scrollTo(0, 0);
  }, []);

  // Atualizar preço base da sessão avulsa e recalcular valores caso solicitado
  const handleBasePriceChange = (newBasePrice: number) => {
    setSettings(prev => {
      const updatedPlans = { ...prev.plans };
      // Recalcular a consulta avulsa com o novo preço base
      updatedPlans.avulsa = {
        ...updatedPlans.avulsa,
        finalPrice: newBasePrice
      };
      return {
        ...prev,
        baseSessionPrice: newBasePrice,
        plans: updatedPlans
      };
    });
  };

  // Recalcular plano quando o percentual de desconto for alterado
  const handleDiscountPercentChange = (planKey: keyof PricingSettings['plans'], discountPercent: number) => {
    setSettings(prev => {
      const plan = prev.plans[planKey];
      const nominalTotal = prev.baseSessionPrice * plan.sessionsCount;
      const discountVal = (nominalTotal * discountPercent) / 100;
      const finalPrice = Math.max(0, Math.round(nominalTotal - discountVal));
      
      // Auto-gerar texto de parcelamento se aplicável
      let autoInstallmentText = plan.installmentText;
      if (plan.installmentsCount > 1) {
        const valParcel = (finalPrice / plan.installmentsCount).toFixed(2).replace('.', ',');
        autoInstallmentText = `Em ${plan.installmentsCount}x de R$ ${valParcel}`;
      }

      return {
        ...prev,
        plans: {
          ...prev.plans,
          [planKey]: {
            ...plan,
            discountPercent: Number(discountPercent.toFixed(2)),
            finalPrice,
            installmentText: autoInstallmentText
          }
        }
      };
    });
  };

  // Recalcular percentual de desconto quando o preço final for alterado manualmente
  const handleFinalPriceChange = (planKey: keyof PricingSettings['plans'], finalPrice: number) => {
    setSettings(prev => {
      const plan = prev.plans[planKey];
      const nominalTotal = prev.baseSessionPrice * plan.sessionsCount;
      let discountPercent = 0;
      if (nominalTotal > 0 && finalPrice < nominalTotal) {
        discountPercent = ((nominalTotal - finalPrice) / nominalTotal) * 100;
      }

      // Auto-gerar texto de parcelamento se aplicável
      let autoInstallmentText = plan.installmentText;
      if (plan.installmentsCount > 1) {
        const valParcel = (finalPrice / plan.installmentsCount).toFixed(2).replace('.', ',');
        autoInstallmentText = `Em ${plan.installmentsCount}x de R$ ${valParcel}`;
      }

      return {
        ...prev,
        plans: {
          ...prev.plans,
          [planKey]: {
            ...plan,
            finalPrice,
            discountPercent: Number(discountPercent.toFixed(2)),
            installmentText: autoInstallmentText
          }
        }
      };
    });
  };

  // Atualizar número de parcelas
  const handleInstallmentsCountChange = (planKey: keyof PricingSettings['plans'], installmentsCount: number) => {
    setSettings(prev => {
      const plan = prev.plans[planKey];
      let autoInstallmentText = plan.installmentText;
      if (installmentsCount > 1) {
        const valParcel = (plan.finalPrice / installmentsCount).toFixed(2).replace('.', ',');
        autoInstallmentText = `Em ${installmentsCount}x de R$ ${valParcel}`;
      } else {
        autoInstallmentText = 'Pagamento único à vista';
      }

      return {
        ...prev,
        plans: {
          ...prev.plans,
          [planKey]: {
            ...plan,
            installmentsCount,
            installmentText: autoInstallmentText
          }
        }
      };
    });
  };

  // Atualizar campo genérico de um plano
  const handlePlanFieldChange = (planKey: keyof PricingSettings['plans'], field: keyof PlanConfig, value: any) => {
    setSettings(prev => ({
      ...prev,
      plans: {
        ...prev.plans,
        [planKey]: {
          ...prev.plans[planKey],
          [field]: value
        }
      }
    }));
  };

  // Salvar no localStorage
  const handleSave = () => {
    savePricingSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  // Resetar para os padrões
  const handleReset = () => {
    if (window.confirm('Deseja realmente restaurar todos os preços e configurações para os valores padrão de fábrica?')) {
      const restored = resetPricingSettings();
      setSettings(restored);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  // Exportar JSON de backup
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `honorarios_psicologia_config_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const planKeys: (keyof PricingSettings['plans'])[] = ['avulsa', 'mensal', 'bimestral', 'trimestral'];

  return (
    <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white overflow-hidden selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* Background patterned dots overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />

      {/* HEADER DO PAINEL DE CONFIGURAÇÕES */}
      <header className="w-full bg-luxury-charcoal/95 backdrop-blur-md border-b border-luxury-gold/30 sticky top-0 z-50 py-4 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          
          <div className="flex items-center gap-3.5">
            <a 
              href="/condicoes-de-atendimento"
              className="flex items-center gap-1.5 text-xs text-luxury-gold-light hover:text-white transition font-medium mr-2 group bg-black/30 px-3 py-1.5 rounded-full border border-luxury-gold/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition duration-200" />
              <span>Ver Página de Planos</span>
            </a>
            
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-white font-semibold text-sm sm:text-base tracking-wide leading-tight flex items-center gap-2">
                  <span>Painel de Configuração dos Planos</span>
                  <span className="bg-luxury-gold/20 text-luxury-gold text-[10px] px-2 py-0.5 rounded-md font-mono">
                    Admin
                  </span>
                </h1>
                <p className="text-[10px] sm:text-xs text-luxury-gold-light font-mono">
                  Edição de honorários, cálculo de descontos e links de checkout Kiwify
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-300 text-xs px-3.5 py-2 rounded-xl border border-white/10 hover:border-red-500/30 transition cursor-pointer"
              title="Restaurar valores padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrão</span>
            </button>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-luxury-gold text-xs px-3.5 py-2 rounded-xl border border-luxury-gold/20 hover:border-luxury-gold/40 transition cursor-pointer"
              title="Baixar backup das configurações"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar JSON</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-luxury-gold/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>

        </div>
      </header>

      {/* TOAST DE SUCESSO AO SALVAR */}
      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[100] bg-emerald-950 border border-emerald-500 text-emerald-200 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-white">Configurações Salvas com Sucesso!</p>
              <p className="text-emerald-300/80">A página de planos foi atualizada em tempo real.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* CONTROLE GLOBAL: VALOR BASE DA SESSÃO AVULSA */}
        <section className="bg-gradient-to-r from-luxury-charcoal/90 to-luxury-black border border-luxury-gold/30 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-luxury-gold mb-2">
                <Calculator className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">Parâmetro Base de Cálculo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                Honorário Base por Sessão Avulsa
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                Este é o valor de referência (1 atendimento de 50 min). Todos os descontos nominais e economias progressivas dos planos mensais, bimestrais e trimestrais são calculados automaticamente a partir desta base.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-luxury-black/80 border border-luxury-gold/30 p-4 rounded-2xl shrink-0">
              <div>
                <label className="text-[11px] text-luxury-gold-light font-mono block uppercase">
                  Valor Base (R$)
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-serif text-luxury-gold-light">R$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={settings.baseSessionPrice}
                    onChange={(e) => handleBasePriceChange(Number(e.target.value) || 0)}
                    className="w-28 bg-luxury-charcoal border border-luxury-gold/40 text-white font-serif text-2xl font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-luxury-gold text-center"
                  />
                  <span className="text-xs text-zinc-400 font-mono">,00</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EDITOR DOS 4 PLANOS (CARDS DE CONFIGURAÇÃO) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                Planos de Acompanhamento & Cálculo Automático
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Altere o percentual de desconto ou digite o preço final desejado — o sistema calcula as variáveis em tempo real.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-luxury-charcoal/60 p-1.5 rounded-xl border border-luxury-gold/20 text-xs">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-lg transition font-medium cursor-pointer ${
                  activeTab === 'editor' ? 'bg-luxury-gold text-luxury-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Modo Editor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preview' ? 'bg-luxury-gold text-luxury-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Simulador Visual</span>
              </button>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {planKeys.map((key) => {
                const plan = settings.plans[key];
                const nominalTotal = settings.baseSessionPrice * plan.sessionsCount;
                const savingsNominal = Math.max(0, nominalTotal - plan.finalPrice);
                const pricePerSession = plan.sessionsCount > 0 ? (plan.finalPrice / plan.sessionsCount).toFixed(2).replace('.', ',') : '0,00';

                return (
                  <div 
                    key={key}
                    className="bg-gradient-to-b from-luxury-charcoal/90 to-luxury-black border border-luxury-gold/25 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-luxury-gold/15 pb-4 mb-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold font-serif font-bold text-sm">
                            {plan.sessionsCount}
                          </div>
                          <div>
                            <h3 className="font-serif text-lg text-white font-semibold capitalize">
                              {plan.title}
                            </h3>
                            <span className="text-[10px] text-luxury-gold-light font-mono">
                              {plan.sessionsCount === 1 ? '1 atendimento avulso' : `${plan.sessionsCount} atendimentos`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={plan.badge}
                            onChange={(e) => handlePlanFieldChange(key, 'badge', e.target.value)}
                            placeholder="Badge"
                            className="bg-black/50 border border-luxury-gold/30 text-luxury-gold-light text-[11px] font-mono px-2.5 py-1 rounded-full w-24 text-center focus:outline-none focus:border-luxury-gold"
                            title="Texto do Badge superior"
                          />
                        </div>
                      </div>

                      {/* Bloco de Cálculo & Preços */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-luxury-black/60 p-4 rounded-2xl border border-luxury-gold/15 mb-5">
                        
                        {/* Preço Final */}
                        <div>
                          <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                            Preço Final do Plano (R$)
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={plan.finalPrice}
                              onChange={(e) => handleFinalPriceChange(key, Number(e.target.value) || 0)}
                              className="w-full bg-luxury-charcoal border border-luxury-gold/40 text-white font-serif text-xl font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-luxury-gold"
                            />
                            <span className="text-xs text-zinc-400 font-mono">,00</span>
                          </div>
                        </div>

                        {/* Desconto em % (apenas para planos de 2+ sessões) */}
                        <div>
                          <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                            Desconto Aplicado (%)
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              disabled={plan.sessionsCount === 1}
                              value={plan.discountPercent}
                              onChange={(e) => handleDiscountPercentChange(key, Number(e.target.value) || 0)}
                              className={`w-full bg-luxury-charcoal border text-white font-mono text-base font-semibold rounded-xl px-3 py-1.5 focus:outline-none ${
                                plan.sessionsCount === 1 
                                  ? 'border-white/10 text-zinc-500 cursor-not-allowed' 
                                  : 'border-luxury-gold/40 focus:border-luxury-gold'
                              }`}
                            />
                            <span className="text-xs text-luxury-gold font-mono">%</span>
                          </div>
                        </div>

                        {/* Métricas Automáticas */}
                        <div className="sm:col-span-2 pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                          <div className="bg-black/30 p-2 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Valor Integral</span>
                            <span className="text-xs font-mono text-zinc-300">R$ {nominalTotal},00</span>
                          </div>
                          <div className="bg-black/30 p-2 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Economia Paciente</span>
                            <span className="text-xs font-mono text-emerald-400">R$ {savingsNominal},00</span>
                          </div>
                          <div className="bg-black/30 p-2 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Média p/ Sessão</span>
                            <span className="text-xs font-mono text-luxury-gold-light">R$ {pricePerSession}</span>
                          </div>
                        </div>

                      </div>

                      {/* Configuração de Parcelamento */}
                      <div className="space-y-3 mb-5">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Parcelas
                            </label>
                            <select
                              value={plan.installmentsCount}
                              onChange={(e) => handleInstallmentsCountChange(key, Number(e.target.value))}
                              className="w-full bg-luxury-black border border-luxury-gold/30 text-white text-xs font-mono rounded-xl px-2.5 py-2 focus:outline-none focus:border-luxury-gold cursor-pointer"
                            >
                              <option value="1">1x (À vista)</option>
                              <option value="2">2x</option>
                              <option value="3">3x</option>
                              <option value="4">4x</option>
                              <option value="6">6x</option>
                              <option value="12">12x</option>
                            </select>
                          </div>

                          <div className="col-span-2">
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Texto Exibido no Card
                            </label>
                            <input
                              type="text"
                              value={plan.installmentText}
                              onChange={(e) => handlePlanFieldChange(key, 'installmentText', e.target.value)}
                              className="w-full bg-luxury-black border border-luxury-gold/30 text-white text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                              placeholder="Ex: Em 2x de R$ 210,00"
                            />
                          </div>
                        </div>

                        {/* Link de Checkout Kiwify */}
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 block mb-1 flex items-center justify-between">
                            <span>Link de Checkout Kiwify</span>
                            <a 
                              href={plan.paymentLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-luxury-gold-light hover:text-white flex items-center gap-1 text-[10px]"
                            >
                              <span>Testar</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="relative w-full">
                              <LinkIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={plan.paymentLink}
                                onChange={(e) => handlePlanFieldChange(key, 'paymentLink', e.target.value)}
                                className="w-full bg-luxury-black border border-luxury-gold/30 text-luxury-gold-light text-xs font-mono rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-luxury-gold"
                                placeholder="https://pay.kiwify.com.br/..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Descrição Curta */}
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                            Descrição Clínica Curta
                          </label>
                          <textarea
                            rows={2}
                            value={plan.description}
                            onChange={(e) => handlePlanFieldChange(key, 'description', e.target.value)}
                            className="w-full bg-luxury-black border border-luxury-gold/30 text-zinc-300 text-xs font-light rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold resize-none"
                          />
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* SIMULADOR VISUAL REAL DOS 4 CARDS */
            <div className="bg-luxury-black/60 p-6 rounded-3xl border border-luxury-gold/30">
              <p className="text-xs text-luxury-gold-light font-mono mb-6 text-center">
                Visualização em tempo real de como os 4 cards aparecerão para os pacientes:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 items-stretch">
                {planKeys.map((key) => {
                  const plan = settings.plans[key];
                  return (
                    <div key={key} className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/30 via-luxury-gold/10 to-white/5 flex flex-col h-full">
                      <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-5 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between gap-1.5 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] font-mono uppercase tracking-wider font-semibold">
                              {plan.badge}
                            </span>
                            <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
                              <Clock className="w-3 h-3 text-luxury-gold" /> {plan.periodLabel}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                              {key === 'avulsa' && <User className="w-4 h-4" />}
                              {key === 'mensal' && <Calendar className="w-4 h-4" />}
                              {key === 'bimestral' && <Layers className="w-4 h-4" />}
                              {key === 'trimestral' && <Sparkles className="w-4 h-4" />}
                            </div>
                            <div>
                              <h3 className="text-lg font-serif text-white font-semibold leading-tight">
                                {plan.title}
                              </h3>
                              <p className="text-[10px] text-zinc-400 font-mono">
                                {plan.sessionsCount === 1 ? '1 atendimento' : `${plan.sessionsCount} atendimentos`}
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/20 rounded-xl p-3.5 my-3.5">
                            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono">
                              Honorários
                            </div>
                            <div className="flex items-baseline gap-0.5 mt-0.5">
                              <span className="text-xs font-serif text-luxury-gold-light">R$</span>
                              <span className="text-2xl font-serif font-bold text-white tracking-tight">{plan.finalPrice}</span>
                              <span className="text-xs font-serif text-luxury-gold-light">,00</span>
                            </div>
                            <div className="mt-1 text-[10px] text-luxury-gold-light font-medium">
                              {plan.installmentText}
                            </div>
                          </div>

                          <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4 min-h-[58px]">
                            {plan.description}
                          </p>

                          <ul className="space-y-2 mb-6 text-[11px] text-zinc-300 font-light border-t border-luxury-gold/10 pt-3">
                            {plan.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <button
                            onClick={() => window.open(plan.paymentLink, '_blank')}
                            className="w-full flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-[11px] uppercase tracking-wider font-semibold bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 cursor-pointer"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Formalizar {plan.title}</span>
                            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </section>

        {/* BOTÃO FIXO/FLUTUANTE NO RODAPÉ PARA SALVAR */}
        <div className="sticky bottom-6 z-40 max-w-xl mx-auto bg-luxury-charcoal/90 border border-luxury-gold/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
          <div className="text-xs text-zinc-300">
            <span className="font-semibold text-white">Deseja aplicar as mudanças?</span>
            <p className="text-[10px] text-zinc-400 font-mono">As alterações valem imediatamente para todos os visitantes.</p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-luxury-gold/25 hover:brightness-110 active:scale-95 transition cursor-pointer shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Tudo</span>
          </button>
        </div>

      </main>

    </div>
  );
}
