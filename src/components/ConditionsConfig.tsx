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
  EyeOff,
  Clock, 
  User, 
  Calendar, 
  Layers, 
  Sparkles, 
  Check, 
  Lock, 
  Unlock, 
  AlertCircle,
  AlertTriangle,
  Copy,
  Download,
  X,
  LogOut,
  KeyRound,
  Mail,
  Globe,
  Loader2,
  Plus,
  Trash2,
  CopyPlus,
  Coins,
  Shield,
  Heart,
  Award,
  ListPlus,
  MousePointerClick,
  Type,
  FileText,
  Star
} from 'lucide-react';
import { 
  PricingSettings, 
  DEFAULT_PRICING_SETTINGS, 
  DEFAULT_PLANS,
  fetchPricingSettingsFromCloud,
  savePricingSettingsToCloud,
  resetPricingSettingsInCloud,
  PlanConfig
} from '../utils/pricingConfig';

// Credenciais de acesso administrativo
const ADMIN_CREDENTIALS = {
  validEmails: ['olivenbaunvonbrun@gmaill.com', 'olivenbaunvonbrun@gmail.com'],
  password: 'Bruno@383991Br@Psicologia'
};

const AUTH_STORAGE_KEY = 'bruno_psico_config_auth_session_v1';

export default function ConditionsConfig() {
  // Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
    }
    return false;
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Estados do Dashboard
  const [initialSettings, setInitialSettings] = useState<PricingSettings>(DEFAULT_PRICING_SETTINGS);
  const [settings, setSettings] = useState<PricingSettings>(DEFAULT_PRICING_SETTINGS);
  const [isLoadingCloud, setIsLoadingCloud] = useState(true);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  // Estado para o Modal de Alerta de Checkout Kiwify
  const [showCheckoutWarningModal, setShowCheckoutWarningModal] = useState(false);
  const [acknowledgedCheckoutSync, setAcknowledgedCheckoutSync] = useState(false);
  const [copiedLinkKey, setCopiedLinkKey] = useState<string | null>(null);

  // Carregamento inicial da nuvem
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
    window.scrollTo(0, 0);

    fetchPricingSettingsFromCloud().then((cloudSettings) => {
      setInitialSettings(cloudSettings);
      setSettings(cloudSettings);
      setIsLoadingCloud(false);
    });
  }, []);

  // Processar login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmittingLogin(true);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    const passTrimmed = loginPassword.trim();

    const isEmailValid = ADMIN_CREDENTIALS.validEmails.includes(emailTrimmed);
    const isPassValid = passTrimmed === ADMIN_CREDENTIALS.password;

    setTimeout(() => {
      if (isEmailValid && isPassValid) {
        setIsAuthenticated(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        setLoginError('');
      } else {
        setLoginError('Email ou senha incorretos. Verifique as credenciais e tente novamente.');
      }
      setIsSubmittingLogin(false);
    }, 400);
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginError('');
  };

  // Verificar quais planos tiveram seus preços alterados
  const modifiedPricePlans = settings.plans.filter((plan) => {
    const orig = initialSettings.plans.find((p) => p.id === plan.id);
    return orig && orig.finalPrice !== plan.finalPrice;
  });

  const hasPriceModifications = modifiedPricePlans.length > 0;

  // 1. Atualizar Preço Base por Sessão Avulsa
  const handleBasePriceChange = (newBasePrice: number) => {
    setSettings(prev => ({
      ...prev,
      baseSessionPrice: newBasePrice,
      plans: prev.plans.map(p => {
        if (p.id === 'avulsa') {
          return { ...p, finalPrice: newBasePrice };
        }
        return p;
      })
    }));
  };

  // 2. CÁLCULO AUTOMÁTICO VIA VALOR FINAL DO PLANO (R$)
  const handlePlanFinalPriceChange = (planId: string, newFinalPrice: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const sessions = Math.max(1, p.sessionsCount);
          const nominalTotal = prev.baseSessionPrice * sessions;
          
          let discountPercent = 0;
          if (nominalTotal > 0 && newFinalPrice < nominalTotal) {
            discountPercent = Number((((nominalTotal - newFinalPrice) / nominalTotal) * 100).toFixed(2));
          }

          let autoInstText = p.installmentText;
          if (p.installmentsCount > 1) {
            const valParcel = (newFinalPrice / p.installmentsCount).toFixed(2).replace('.', ',');
            autoInstText = `Em ${p.installmentsCount}x de R$ ${valParcel}`;
          } else {
            autoInstText = 'Pagamento único por sessão';
          }

          return {
            ...p,
            finalPrice: newFinalPrice,
            discountPercent,
            installmentText: autoInstText
          };
        }
        return p;
      })
    }));
  };

  // 3. CÁLCULO AUTOMÁTICO VIA VALOR DE CONSULTA / POR SESSÃO (R$)
  const handlePlanPricePerSessionChange = (planId: string, newPricePerSession: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const sessions = Math.max(1, p.sessionsCount);
          const finalPrice = Math.max(0, Math.round(newPricePerSession * sessions));
          const nominalTotal = prev.baseSessionPrice * sessions;
          
          let discountPercent = 0;
          if (nominalTotal > 0 && finalPrice < nominalTotal) {
            discountPercent = Number((((nominalTotal - finalPrice) / nominalTotal) * 100).toFixed(2));
          }

          let autoInstText = p.installmentText;
          if (p.installmentsCount > 1) {
            const valParcel = (finalPrice / p.installmentsCount).toFixed(2).replace('.', ',');
            autoInstText = `Em ${p.installmentsCount}x de R$ ${valParcel}`;
          } else {
            autoInstText = 'Pagamento único por sessão';
          }

          return {
            ...p,
            finalPrice,
            discountPercent,
            installmentText: autoInstText
          };
        }
        return p;
      })
    }));
  };

  // 4. CÁLCULO AUTOMÁTICO VIA PERCENTUAL DE DESCONTO (%)
  const handlePlanDiscountPercentChange = (planId: string, newDiscountPercent: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const sessions = Math.max(1, p.sessionsCount);
          const nominalTotal = prev.baseSessionPrice * sessions;
          const discountVal = (nominalTotal * newDiscountPercent) / 100;
          const finalPrice = Math.max(0, Math.round(nominalTotal - discountVal));

          let autoInstText = p.installmentText;
          if (p.installmentsCount > 1) {
            const valParcel = (finalPrice / p.installmentsCount).toFixed(2).replace('.', ',');
            autoInstText = `Em ${p.installmentsCount}x de R$ ${valParcel}`;
          } else {
            autoInstText = 'Pagamento único por sessão';
          }

          return {
            ...p,
            finalPrice,
            discountPercent: Number(newDiscountPercent.toFixed(2)),
            installmentText: autoInstText
          };
        }
        return p;
      })
    }));
  };

  // 5. CÁLCULO AUTOMÁTICO VIA QUANTIDADE DE SESSÕES
  const handlePlanSessionsCountChange = (planId: string, newSessionsCount: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const count = Math.max(1, newSessionsCount);
          const currentPricePerSession = p.sessionsCount > 0 ? (p.finalPrice / p.sessionsCount) : prev.baseSessionPrice;
          const finalPrice = Math.round(currentPricePerSession * count);
          
          let autoInstText = p.installmentText;
          if (p.installmentsCount > 1) {
            const valParcel = (finalPrice / p.installmentsCount).toFixed(2).replace('.', ',');
            autoInstText = `Em ${p.installmentsCount}x de R$ ${valParcel}`;
          }

          const autoSubtitle = count === 1 ? '1 atendimento individual' : `${count} atendimentos clínicos`;

          return {
            ...p,
            sessionsCount: count,
            sessionsSubtitle: p.sessionsSubtitle || autoSubtitle,
            finalPrice,
            installmentText: autoInstText
          };
        }
        return p;
      })
    }));
  };

  // 6. Atualizar Parcelas
  const handlePlanInstallmentsChange = (planId: string, installmentsCount: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          let autoInstText = p.installmentText;
          if (installmentsCount > 1) {
            const valParcel = (p.finalPrice / installmentsCount).toFixed(2).replace('.', ',');
            autoInstText = `Em ${installmentsCount}x de R$ ${valParcel}`;
          } else {
            autoInstText = 'Pagamento único por sessão';
          }

          return {
            ...p,
            installmentsCount,
            installmentText: autoInstText
          };
        }
        return p;
      })
    }));
  };

  // 7. GERENCIAMENTO DINÂMICO DA LISTA DE BENEFÍCIOS (FEATURES)
  const handleAddFeature = (planId: string) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            features: [...(p.features || []), 'Novo benefício clínico']
          };
        }
        return p;
      })
    }));
  };

  const handleUpdateFeature = (planId: string, featureIndex: number, newValue: string) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const updated = [...(p.features || [])];
          updated[featureIndex] = newValue;
          return { ...p, features: updated };
        }
        return p;
      })
    }));
  };

  const handleRemoveFeature = (planId: string, featureIndex: number) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const updated = [...(p.features || [])];
          updated.splice(featureIndex, 1);
          return { ...p, features: updated };
        }
        return p;
      })
    }));
  };

  // Alternar Ativação / Inativação de um plano
  const handleTogglePlanActive = (planId: string) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          return { ...p, active: !p.active };
        }
        return p;
      })
    }));
  };

  // Definir qual plano será exibido exclusivamente no Primeiro Atendimento (/primeiro-atendimento)
  const handleSetFirstAppointmentPlan = (planId: string) => {
    setSettings(prev => ({
      ...prev,
      firstAppointmentPlanId: planId
    }));
  };

  // Adicionar Novo Plano Customizado
  const handleAddNewPlan = () => {
    const customCount = settings.plans.filter(p => p.isCustom).length;
    const newId = `custom_p_${Date.now()}`;
    const sessions = 16;
    const finalPrice = 1400;
    const instCount = 4;
    const valParcel = (finalPrice / instCount).toFixed(2).replace('.', ',');

    const newPlan: PlanConfig = {
      id: newId,
      title: customCount === 0 ? 'Acompanhamento Semestral' : 'Plano Intensivo Personalizado',
      badge: 'Personalizado',
      iconName: 'sparkles',
      periodLabel: '120 dias',
      sessionsCount: sessions,
      sessionsSubtitle: '16 atendimentos clínicos estruturados',
      discountPercent: 35,
      finalPrice: finalPrice,
      installmentsCount: instCount,
      installmentText: `Em ${instCount}x de R$ ${valParcel}`,
      paymentLink: 'https://pay.kiwify.com.br/',
      buttonText: 'Formalizar modalidade personalizada',
      description: 'Modalidade estruturada de acompanhamento clínico continuado com plano terapêutico personalizado.',
      features: [
        'Atendimentos clínicos dedicados',
        'Plano de intervenção estruturado',
        'Emissão de recibos mensais oficiais',
        'Suporte direto via WhatsApp'
      ],
      active: true,
      isCustom: true
    };

    setSettings(prev => ({
      ...prev,
      plans: [...prev.plans, newPlan]
    }));
  };

  // Duplicar um plano existente
  const handleDuplicatePlan = (plan: PlanConfig) => {
    const newId = `custom_p_${Date.now()}`;
    const duplicatedPlan: PlanConfig = {
      ...plan,
      id: newId,
      title: `${plan.title} (Cópia)`,
      badge: plan.badge ? `${plan.badge}` : 'Cópia',
      isCustom: true,
      active: true,
      features: [...(plan.features || [])]
    };

    setSettings(prev => ({
      ...prev,
      plans: [...prev.plans, duplicatedPlan]
    }));
  };

  // Excluir um plano
  const handleDeletePlan = (planId: string) => {
    const targetPlan = settings.plans.find(p => p.id === planId);
    if (!targetPlan) return;

    if (targetPlan.isCustom) {
      if (window.confirm(`Deseja realmente excluir o plano "${targetPlan.title}"?`)) {
        setSettings(prev => ({
          ...prev,
          plans: prev.plans.filter(p => p.id !== planId)
        }));
      }
    } else {
      if (window.confirm(`Deseja inativar o plano "${targetPlan.title}" para que não apareça no site?`)) {
        setSettings(prev => ({
          ...prev,
          plans: prev.plans.map(p => p.id === planId ? { ...p, active: false } : p)
        }));
      }
    }
  };

  // Atualizar campo de texto genérico de um plano
  const handlePlanFieldChange = (planId: string, field: keyof PlanConfig, value: any) => {
    setSettings(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          return { ...p, [field]: value };
        }
        return p;
      })
    }));
  };

  // Copiar link de pagamento
  const handleCopyLink = (key: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkKey(key);
    setTimeout(() => setCopiedLinkKey(null), 2500);
  };

  // Disparar fluxo de salvar
  const handleSaveClick = () => {
    if (hasPriceModifications && !acknowledgedCheckoutSync) {
      setShowCheckoutWarningModal(true);
      return;
    }
    executeSave();
  };

  // Executar persistência real na Nuvem
  const executeSave = async () => {
    setIsSavingCloud(true);
    const success = await savePricingSettingsToCloud(settings);
    setIsSavingCloud(false);

    if (success) {
      setInitialSettings(settings);
      setShowCheckoutWarningModal(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4500);
    }
  };

  // Resetar para os padrões na nuvem
  const handleReset = async () => {
    if (window.confirm('Deseja realmente restaurar todos os planos originais e textos de fábrica na nuvem?')) {
      setIsSavingCloud(true);
      const restored = await resetPricingSettingsInCloud();
      setSettings(restored);
      setInitialSettings(restored);
      setIsSavingCloud(false);
      setAcknowledgedCheckoutSync(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  // Exportar JSON de backup
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `honorarios_psicologia_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Renderizar ícone correto
  const renderPlanIcon = (iconName?: string) => {
    switch (iconName) {
      case 'user': return <User className="w-4 h-4" />;
      case 'calendar': return <Calendar className="w-4 h-4" />;
      case 'layers': return <Layers className="w-4 h-4" />;
      case 'shield': return <Shield className="w-4 h-4" />;
      case 'heart': return <Heart className="w-4 h-4" />;
      case 'award': return <Award className="w-4 h-4" />;
      case 'sparkles':
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // =========================================================================
  // TELA 1: LOGIN DE ACESSO ADMINISTRATIVO
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative w-full min-h-screen bg-luxury-black font-sans text-white flex flex-col items-center justify-center p-6 selection:bg-luxury-gold selection:text-luxury-black overflow-hidden">
        
        {/* Background patterned dots overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none elegant-dots z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          
          <div className="bg-gradient-to-b from-luxury-charcoal/95 to-luxury-black/95 border border-luxury-gold/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
            
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-full border border-luxury-gold/40 flex items-center justify-center bg-[#07090f] overflow-hidden mb-4 shadow-xl">
                <img 
                  src="/media__1779535801913.png" 
                  alt="Logo Bruno de Oliveira" 
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold tracking-tight">
                Painel Administrativo
              </h2>
              <p className="text-xs text-luxury-gold-light font-mono mt-1">
                Acesso restrito às configurações completas de planos
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div>
                <label className="text-[11px] font-mono text-zinc-300 block mb-1.5 uppercase">
                  Email de Acesso
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full bg-black/60 border border-luxury-gold/30 text-white text-xs font-sans rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-luxury-gold transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-300 block mb-1.5 uppercase">
                  Senha
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-black/60 border border-luxury-gold/30 text-white text-xs font-sans rounded-xl pl-10 pr-11 py-3 focus:outline-none focus:border-luxury-gold transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                    title={showPassword ? "Ocultar senha" : "Ver senha"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-luxury-gold/20 hover:brightness-110 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmittingLogin ? (
                  <span>Verificando credenciais...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Acessar Painel</span>
                  </>
                )}
              </button>

            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <a
                href="/condicoes-de-atendimento"
                className="text-xs text-zinc-400 hover:text-luxury-gold transition inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar à página pública de planos</span>
              </a>
            </div>

          </div>

          <p className="text-center text-[11px] text-zinc-600 font-mono mt-6">
            Bruno de Oliveira Lima • Psicólogo Clínico • CRP 05/75885
          </p>

        </div>

      </div>
    );
  }

  // =========================================================================
  // TELA 2: PAINEL DE CONFIGURAÇÕES AUTENTICADO COM EDIÇÃO COMPLETA
  // =========================================================================
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
              className="flex items-center gap-1.5 text-xs text-luxury-gold-light hover:text-white transition font-medium mr-2 group bg-black/30 px-3.5 py-2 rounded-full border border-luxury-gold/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition duration-200" />
              <span>Ver Página de Planos</span>
            </a>
            
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shadow-md">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-white font-semibold text-sm sm:text-base tracking-wide leading-tight flex items-center gap-2">
                  <span>Gestão Completa de Planos & Honorários</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-mono border border-emerald-500/30 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Nuvem Ativa</span>
                  </span>
                </h1>
                <p className="text-[10px] sm:text-xs text-luxury-gold-light font-mono">
                  {settings.plans.filter(p => p.active).length} planos ativos • 100% dos textos e itens customizáveis
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNewPlan}
              className="flex items-center gap-1.5 bg-luxury-gold/15 hover:bg-luxury-gold/25 text-luxury-gold hover:text-white border border-luxury-gold/40 text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
              title="Adicionar novo plano customizado"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Plano</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isSavingCloud}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-300 text-xs px-3.5 py-2 rounded-xl border border-white/10 hover:border-red-500/30 transition cursor-pointer"
              title="Restaurar textos e valores de fábrica"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrão</span>
            </button>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-luxury-gold text-xs px-3.5 py-2 rounded-xl border border-luxury-gold/20 hover:border-luxury-gold/40 transition cursor-pointer"
              title="Baixar backup JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar JSON</span>
            </button>

            <button
              onClick={handleSaveClick}
              disabled={isSavingCloud}
              className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-luxury-gold/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              {isSavingCloud ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar na Nuvem</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 bg-red-950/30 hover:bg-red-950/60 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs transition cursor-pointer ml-1"
              title="Encerrar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
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
              <p className="font-semibold text-white">Configurações Salvas na Nuvem!</p>
              <p className="text-emerald-300/80">Todos os textos, valores e benefícios foram atualizados para todos os visitantes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE ALERTA DE SINCRONIZAÇÃO DE CHECKOUT KIWIFY */}
      <AnimatePresence>
        {showCheckoutWarningModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutWarningModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#1e1b14] via-[#101218] to-[#0a0b0f] border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-luxury-gold to-amber-600" />
              
              <button
                onClick={() => setShowCheckoutWarningModal(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-black/40 border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight">
                    Lembrete de Sincronização Kiwify
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300/90 mt-1">
                    Você modificou valores no site. Lembre-se de atualizar também na sua plataforma de checkout!
                  </p>
                </div>
              </div>

              <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-6 space-y-3 text-xs sm:text-sm text-zinc-200">
                <p className="text-zinc-300 font-light">
                  Para evitar inconsistências para o paciente, confirme se os valores nos links de checkout abaixo coincidem:
                </p>

                <div className="space-y-2.5 pt-2">
                  {modifiedPricePlans.map((plan) => {
                    const orig = initialSettings.plans.find(p => p.id === plan.id);
                    const oldPrice = orig ? orig.finalPrice : 0;
                    return (
                      <div key={plan.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#1c1912] border border-amber-500/20 text-xs">
                        <div>
                          <span className="font-semibold text-white font-serif">{plan.title}</span>
                          <span className="text-[11px] text-zinc-400 ml-2 font-mono">
                            (De R$ {oldPrice},00 ➔ <strong className="text-luxury-gold font-bold">R$ {plan.finalPrice},00</strong>)
                          </span>
                        </div>
                        <a
                          href={plan.paymentLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/25 px-3 py-1.5 rounded-lg border border-amber-500/30 transition self-start sm:self-auto"
                        >
                          <span>Abrir Checkout Kiwify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              <label 
                onClick={() => setAcknowledgedCheckoutSync(!acknowledgedCheckoutSync)}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-amber-500/30 cursor-pointer select-none mb-6 text-xs text-zinc-200"
              >
                <div className="mt-0.5 shrink-0">
                  {acknowledgedCheckoutSync ? (
                    <div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center text-black font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-zinc-500 bg-black/40 flex items-center justify-center" />
                  )}
                </div>
                <span className="leading-snug">
                  Estou ciente e irei garantir que os valores na <strong className="text-amber-300 font-semibold">Kiwify</strong> coincidam exatamente com os do site.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => setShowCheckoutWarningModal(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 text-xs text-zinc-400 hover:text-white transition font-medium cursor-pointer"
                >
                  Voltar para revisar
                </button>
                <button
                  onClick={executeSave}
                  disabled={isSavingCloud}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  {isSavingCloud ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Salvando na Nuvem...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Confirmar & Salvar Globalmente</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ALERTA VISUAL NO TOPO SE HOUVER VALORES MODIFICADOS */}
        {hasPriceModifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Valores modificados na tabela de planos
                </h4>
                <p className="text-[11px] sm:text-xs text-amber-300/80 font-light">
                  Você alterou o preço de {modifiedPricePlans.length} {modifiedPricePlans.length === 1 ? 'plano' : 'planos'}. Lembre-se de atualizar o checkout na Kiwify antes de divulgar.
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveClick}
              disabled={isSavingCloud}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition shrink-0 cursor-pointer"
            >
              Salvar e sincronizar
            </button>
          </motion.div>
        )}

        {/* CONTROLE GLOBAL: VALOR BASE DA SESSÃO AVULSA */}
        <section className="bg-gradient-to-r from-luxury-charcoal/90 to-luxury-black border border-luxury-gold/30 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-luxury-gold mb-2">
                <Calculator className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">Base de Referência</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                Honorário Base por Sessão Avulsa
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                Valor de referência por atendimento individual de 50 min. Todos os campos dos cards abaixo são totalmente personalizáveis e contam com recálculo automático bidirecional.
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

        {/* EDITOR DOS PLANOS (CARDS DE CONFIGURAÇÃO COM EDIÇÃO TOTAL) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                Gestão de Planos ({settings.plans.length} cadastrados)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Edite títulos, badges, períodos, ícones, subtítulos, preços, benefícios (features), botões de ação e links.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddNewPlan}
                className="flex items-center gap-1.5 bg-luxury-gold/20 hover:bg-luxury-gold/30 text-luxury-gold-light hover:text-white border border-luxury-gold/40 text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Adicionar Plano</span>
              </button>

              <div className="flex items-center gap-1 bg-luxury-charcoal/60 p-1.5 rounded-xl border border-luxury-gold/20 text-xs">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer ${
                    activeTab === 'editor' ? 'bg-luxury-gold text-luxury-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'preview' ? 'bg-luxury-gold text-luxury-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Prévia ({settings.plans.filter(p => p.active).length} no site)</span>
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {settings.plans.map((plan) => {
                const orig = initialSettings.plans.find(p => p.id === plan.id);
                const isPriceEdited = orig && orig.finalPrice !== plan.finalPrice;
                const sessions = Math.max(1, plan.sessionsCount);
                const nominalTotal = settings.baseSessionPrice * sessions;
                const pricePerSession = (plan.finalPrice / sessions).toFixed(2).replace('.', ',');
                const savingsNominal = Math.max(0, nominalTotal - plan.finalPrice);

                const isFirstAppointmentPlan = (settings.firstAppointmentPlanId || 'avulsa') === plan.id;

                return (
                  <div 
                    key={plan.id}
                    className={`bg-gradient-to-b from-luxury-charcoal/95 to-luxury-black border rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between transition-all duration-300 ${
                      isFirstAppointmentPlan
                        ? 'border-luxury-gold ring-2 ring-luxury-gold/40 shadow-luxury-gold/15'
                        : !plan.active 
                          ? 'opacity-60 border-zinc-700/50 bg-black/40' 
                          : isPriceEdited 
                            ? 'border-amber-500/60 ring-1 ring-amber-500/30' 
                            : 'border-luxury-gold/30'
                    }`}
                  >
                    <div>
                      {/* Top Header com Status Ativo/Inativo, Destaque 1º Atendimento e Botões de Ação */}
                      <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-4 mb-4 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          
                          {/* Botão / Badge do Primeiro Atendimento */}
                          {isFirstAppointmentPlan ? (
                            <span 
                              className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border bg-luxury-gold/25 border-luxury-gold text-luxury-gold-light shadow-sm shadow-luxury-gold/20"
                              title="Este plano é o card exibido exclusivamente na página do Primeiro Atendimento (/primeiro-atendimento) e fica oculto da página de múltiplos planos"
                            >
                              <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                              <span>1º Atendimento (Exclusivo)</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSetFirstAppointmentPlan(plan.id)}
                              className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-medium px-2.5 py-1 rounded-full border bg-black/40 border-white/10 hover:border-luxury-gold/60 text-zinc-400 hover:text-luxury-gold transition cursor-pointer"
                              title="Clique para definir este plano como o card exclusivo do Primeiro Atendimento"
                            >
                              <Star className="w-3 h-3 text-zinc-500" />
                              <span>Definir como 1º Atendimento</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleTogglePlanActive(plan.id)}
                            className={`flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                              plan.active 
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25' 
                                : 'bg-zinc-800 border-zinc-600 text-zinc-400 hover:bg-zinc-700'
                            }`}
                            title="Clique para ativar ou inativar este plano"
                          >
                            <span className={`w-2 h-2 rounded-full ${plan.active ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                            <span>{plan.active ? 'Ativo' : 'Inativo'}</span>
                          </button>

                          {plan.isCustom && (
                            <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono px-2 py-0.5 rounded-md">
                              Personalizado
                            </span>
                          )}

                          {isPriceEdited && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-mono uppercase font-bold animate-pulse">
                              Preço Alterado
                            </span>
                          )}
                        </div>

                        {/* Botões de Duplicar e Excluir */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDuplicatePlan(plan)}
                            className="p-2 text-zinc-400 hover:text-luxury-gold bg-black/40 hover:bg-black/80 rounded-xl border border-white/5 transition cursor-pointer"
                            title="Duplicar este plano"
                          >
                            <CopyPlus className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 text-zinc-400 hover:text-red-400 bg-black/40 hover:bg-red-950/40 rounded-xl border border-white/5 hover:border-red-500/30 transition cursor-pointer"
                            title={plan.isCustom ? "Excluir plano definitivamente" : "Inativar plano"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Notificação explicativa se for o plano do Primeiro Atendimento */}
                      {isFirstAppointmentPlan && (
                        <div className="mb-4 p-2.5 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 text-[11px] text-luxury-gold-light flex items-center gap-2">
                          <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold shrink-0" />
                          <span>Este plano é exibido individualmente na página <strong>/primeiro-atendimento</strong> e fica oculto da página geral de planos <strong>/condicoes-de-atendimento</strong>.</span>
                        </div>
                      )}

                      {/* 1. SEÇÃO DE CABEÇALHO DO CARD (TÍTULO, BADGE, PERÍODO, ÍCONE) */}
                      <div className="bg-luxury-black/50 p-4 rounded-2xl border border-white/5 mb-5 space-y-3.5">
                        <div className="text-[11px] font-serif font-semibold text-luxury-gold flex items-center gap-1.5">
                          <Type className="w-3.5 h-3.5" />
                          <span>Identificação & Cabeçalho do Card</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Título do Plano
                            </label>
                            <input
                              type="text"
                              value={plan.title}
                              onChange={(e) => handlePlanFieldChange(plan.id, 'title', e.target.value)}
                              className="w-full bg-black/60 border border-luxury-gold/30 text-white font-serif text-base font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                              placeholder="Nome da modalidade"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Badge Superior
                            </label>
                            <input
                              type="text"
                              value={plan.badge}
                              onChange={(e) => handlePlanFieldChange(plan.id, 'badge', e.target.value)}
                              placeholder="Ex: Semanal"
                              className="w-full bg-black/60 border border-luxury-gold/30 text-luxury-gold-light text-xs font-mono rounded-xl px-3 py-2 text-center focus:outline-none focus:border-luxury-gold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-luxury-gold" />
                              <span>Duração / Período</span>
                            </label>
                            <input
                              type="text"
                              value={plan.periodLabel}
                              onChange={(e) => handlePlanFieldChange(plan.id, 'periodLabel', e.target.value)}
                              placeholder="Ex: 50 min ou 30 dias"
                              className="w-full bg-black/60 border border-luxury-gold/30 text-zinc-200 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Ícone do Card
                            </label>
                            <select
                              value={plan.iconName || 'sparkles'}
                              onChange={(e) => handlePlanFieldChange(plan.id, 'iconName', e.target.value)}
                              className="w-full bg-black/60 border border-luxury-gold/30 text-zinc-200 text-xs font-mono rounded-xl px-2.5 py-2 focus:outline-none focus:border-luxury-gold cursor-pointer"
                            >
                              <option value="user">👤 Individual / Consulta</option>
                              <option value="calendar">📅 Calendário / Mensal</option>
                              <option value="layers">🗂️ Camadas / Bimestral</option>
                              <option value="sparkles">✨ Brilho / Destaque</option>
                              <option value="shield">🛡️ Proteção / Escuta</option>
                              <option value="heart">❤️ Vínculo / Cuidado</option>
                              <option value="award">🏆 Especial / Completo</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Subtítulo do Card
                            </label>
                            <input
                              type="text"
                              value={plan.sessionsSubtitle || ''}
                              onChange={(e) => handlePlanFieldChange(plan.id, 'sessionsSubtitle', e.target.value)}
                              placeholder="Ex: 4 atendimentos"
                              className="w-full bg-black/60 border border-luxury-gold/30 text-zinc-200 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. BLOCO DE CÁLCULO BIDIRECIONAL DE PREÇOS */}
                      <div className="bg-luxury-black/70 p-4 rounded-2xl border border-luxury-gold/25 mb-5 space-y-4 shadow-inner">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-[11px] font-serif font-semibold text-luxury-gold flex items-center gap-1.5">
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Honorários & Cálculo Automático</span>
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            Recálculo bidirecional instantâneo
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-[10px] uppercase font-mono text-luxury-gold-light block mb-1 font-semibold flex items-center gap-1">
                              <Coins className="w-3 h-3 text-luxury-gold" />
                              <span>Valor Total do Plano (R$)</span>
                            </label>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-serif text-luxury-gold-light">R$</span>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={plan.finalPrice}
                                onChange={(e) => handlePlanFinalPriceChange(plan.id, Number(e.target.value) || 0)}
                                className="w-full bg-luxury-charcoal border border-luxury-gold/50 text-white font-serif text-xl font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-luxury-gold"
                              />
                              <span className="text-xs text-zinc-400 font-mono">,00</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-mono text-emerald-300 block mb-1 font-semibold flex items-center gap-1">
                              <User className="w-3 h-3 text-emerald-400" />
                              <span>Valor por Consulta (R$)</span>
                            </label>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-serif text-emerald-400">R$</span>
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={Number((plan.finalPrice / sessions).toFixed(2))}
                                onChange={(e) => handlePlanPricePerSessionChange(plan.id, Number(e.target.value) || 0)}
                                className="w-full bg-luxury-charcoal border border-emerald-500/40 text-emerald-200 font-serif text-xl font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/5">
                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Qtd. Sessões
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={plan.sessionsCount}
                              onChange={(e) => handlePlanSessionsCountChange(plan.id, Number(e.target.value) || 1)}
                              className="w-full bg-luxury-charcoal border border-luxury-gold/30 text-white text-xs font-mono rounded-xl px-2.5 py-2 text-center focus:outline-none focus:border-luxury-gold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1 flex items-center gap-0.5">
                              <span>Desconto</span>
                              <Percent className="w-2.5 h-2.5 text-luxury-gold" />
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              disabled={plan.sessionsCount === 1}
                              value={plan.discountPercent || 0}
                              onChange={(e) => handlePlanDiscountPercentChange(plan.id, Number(e.target.value) || 0)}
                              className={`w-full bg-luxury-charcoal border text-white text-xs font-mono rounded-xl px-2.5 py-2 text-center focus:outline-none ${
                                plan.sessionsCount === 1 
                                  ? 'border-white/10 text-zinc-500 cursor-not-allowed' 
                                  : 'border-luxury-gold/30 focus:border-luxury-gold'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                              Parcelas
                            </label>
                            <select
                              value={plan.installmentsCount}
                              onChange={(e) => handlePlanInstallmentsChange(plan.id, Number(e.target.value))}
                              className="w-full bg-luxury-charcoal border border-luxury-gold/30 text-white text-xs font-mono rounded-xl px-2 py-2 focus:outline-none focus:border-luxury-gold cursor-pointer"
                            >
                              <option value="1">1x (À vista)</option>
                              <option value="2">2x</option>
                              <option value="3">3x</option>
                              <option value="4">4x</option>
                              <option value="6">6x</option>
                              <option value="12">12x</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Valor Integral</span>
                            <span className="text-xs font-mono text-zinc-300">R$ {nominalTotal},00</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Economia</span>
                            <span className="text-xs font-mono text-emerald-400">R$ {savingsNominal},00</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block">Média Consulta</span>
                            <span className="text-xs font-mono text-luxury-gold-light">R$ {pricePerSession}</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                            Texto de Parcelamento (Exibido no Card)
                          </label>
                          <input
                            type="text"
                            value={plan.installmentText}
                            onChange={(e) => handlePlanFieldChange(plan.id, 'installmentText', e.target.value)}
                            className="w-full bg-luxury-charcoal border border-luxury-gold/30 text-luxury-gold-light text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                            placeholder="Ex: Em 2x de R$ 210,00"
                          />
                        </div>
                      </div>

                      {/* 3. DESCRIÇÃO CLÍNICA */}
                      <div className="mb-5">
                        <label className="text-[10px] font-mono text-zinc-400 block mb-1 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-luxury-gold" />
                          <span>Descrição Clínica do Card</span>
                        </label>
                        <textarea
                          rows={2}
                          value={plan.description}
                          onChange={(e) => handlePlanFieldChange(plan.id, 'description', e.target.value)}
                          className="w-full bg-luxury-black border border-luxury-gold/30 text-zinc-200 text-xs font-light rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-luxury-gold resize-none leading-relaxed"
                          placeholder="Texto descritivo com linguagem ética..."
                        />
                      </div>

                      {/* 4. LISTA DE BENEFÍCIOS / FEATURES (ADICIONAR, EDITAR, EXCLUIR) */}
                      <div className="bg-luxury-black/60 p-4 rounded-2xl border border-luxury-gold/25 mb-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-serif font-semibold text-luxury-gold flex items-center gap-1.5">
                            <ListPlus className="w-3.5 h-3.5" />
                            <span>Itens com Check / Benefícios ({plan.features?.length || 0})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddFeature(plan.id)}
                            className="text-[10px] text-luxury-gold-light hover:text-white bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/30 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Adicionar Item</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(plan.features || []).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => handleUpdateFeature(plan.id, idx, e.target.value)}
                                className="w-full bg-luxury-charcoal border border-white/10 text-zinc-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-luxury-gold"
                                placeholder="Descrição do benefício..."
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(plan.id, idx)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition cursor-pointer shrink-0"
                                title="Remover item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 5. TEXTO DO BOTÃO (CTA) E LINK DE CHECKOUT KIWIFY */}
                      <div className="bg-[#12141c] border border-luxury-gold/30 rounded-2xl p-4 mb-2 shadow-inner space-y-3">
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 block mb-1 flex items-center gap-1">
                            <MousePointerClick className="w-3.5 h-3.5 text-luxury-gold" />
                            <span>Texto do Botão de Formalização (CTA)</span>
                          </label>
                          <input
                            type="text"
                            value={plan.buttonText || `Formalizar ${plan.title.toLowerCase()}`}
                            onChange={(e) => handlePlanFieldChange(plan.id, 'buttonText', e.target.value)}
                            className="w-full bg-black/60 border border-luxury-gold/30 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                            placeholder="Ex: Formalizar consulta avulsa"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3 text-luxury-gold" />
                              <span>Link de Checkout (Kiwify)</span>
                            </label>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopyLink(plan.id, plan.paymentLink)}
                                className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/5 cursor-pointer"
                                title="Copiar URL"
                              >
                                <Copy className="w-2.5 h-2.5" />
                                <span>{copiedLinkKey === plan.id ? 'Copiado!' : 'Copiar'}</span>
                              </button>

                              <a 
                                href={plan.paymentLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-luxury-gold hover:text-white flex items-center gap-1 text-[10px] bg-luxury-gold/10 hover:bg-luxury-gold/20 px-2 py-0.5 rounded-md border border-luxury-gold/30 transition"
                              >
                                <span>Testar</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>

                          <input
                            type="url"
                            value={plan.paymentLink}
                            onChange={(e) => handlePlanFieldChange(plan.id, 'paymentLink', e.target.value)}
                            className="w-full bg-luxury-black border border-luxury-gold/30 text-luxury-gold-light text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-luxury-gold"
                            placeholder="https://pay.kiwify.com.br/..."
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* SIMULADOR VISUAL REAL DOS PLANOS */
            <div className="bg-luxury-black/60 p-6 rounded-3xl border border-luxury-gold/30 space-y-8">
              
              {/* 1. PRÉVIA DA PÁGINA DE PRIMEIRO ATENDIMENTO */}
              <div>
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                    <h3 className="text-sm font-serif font-semibold text-white">
                      Prévia da Página de Primeiro Atendimento (<span className="text-luxury-gold-light font-mono">/primeiro-atendimento</span>)
                    </h3>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Card único definido para quem vem da Landpage
                  </span>
                </div>

                {(() => {
                  const firstPlan = settings.plans.find(p => p.id === (settings.firstAppointmentPlanId || 'avulsa')) || settings.plans.find(p => p.active) || settings.plans[0];
                  if (!firstPlan) return null;

                  return (
                    <div className="max-w-md mx-auto">
                      <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/60 via-luxury-gold/30 to-luxury-gold/10 shadow-xl flex flex-col">
                        <div className="relative bg-gradient-to-b from-[#181a24] via-[#101218] to-[#0a0b0f] rounded-[23px] p-6 flex flex-col justify-between overflow-hidden">
                          <div>
                            <div className="flex items-center justify-between gap-1.5 mb-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold-light text-[10px] font-mono uppercase tracking-wider font-semibold">
                                {firstPlan.badge || 'Pontual'}
                              </span>
                              <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono bg-black/50 px-2 py-0.5 rounded-full border border-white/5">
                                <Clock className="w-3 h-3 text-luxury-gold" /> {firstPlan.periodLabel || '50 min'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/40 flex items-center justify-center text-luxury-gold shrink-0">
                                {renderPlanIcon(firstPlan.iconName)}
                              </div>
                              <div>
                                <h3 className="text-xl font-serif text-white font-semibold leading-tight">
                                  {firstPlan.title}
                                </h3>
                                <p className="text-[10px] text-zinc-400 font-mono">
                                  {firstPlan.sessionsSubtitle || '1 atendimento individual dedicado (50 min)'}
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-luxury-black/90 to-[#141620] border border-luxury-gold/30 rounded-xl p-3.5 my-3.5 shadow-inner">
                              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono">
                                Honorários Profissionais
                              </div>
                              <div className="flex items-baseline gap-0.5 mt-0.5">
                                <span className="text-xs font-serif text-luxury-gold-light">R$</span>
                                <span className="text-3xl font-serif font-bold text-white tracking-tight">{firstPlan.finalPrice}</span>
                                <span className="text-xs font-serif text-luxury-gold-light">,00</span>
                              </div>
                              <div className="mt-1 text-[10px] text-luxury-gold-light font-medium flex items-center gap-1">
                                <CreditCard className="w-3 h-3 text-luxury-gold shrink-0" />
                                <span>{firstPlan.installmentText}</span>
                              </div>
                            </div>

                            <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                              {firstPlan.description}
                            </p>

                            <ul className="space-y-2 mb-6 text-[11px] text-zinc-300 font-light border-t border-luxury-gold/10 pt-3">
                              {(firstPlan.features || []).map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <button
                              onClick={() => window.open(firstPlan.paymentLink, '_blank')}
                              className="w-full flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 cursor-pointer shadow-lg"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                              <span>{firstPlan.buttonText || 'Contratar meu primeiro atendimento'}</span>
                              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* 2. PRÉVIA DA PÁGINA DE PLANOS GERAIS */}
              <div>
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-luxury-gold" />
                    <h3 className="text-sm font-serif font-semibold text-white">
                      Prévia da Página de Planos Gerais (<span className="text-luxury-gold-light font-mono">/condicoes-de-atendimento</span>)
                    </h3>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Exibe todos os planos ativos exceto o do 1º Atendimento
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 items-stretch">
                  {settings.plans
                    .filter(p => p.active && p.id !== (settings.firstAppointmentPlanId || 'avulsa'))
                    .map((plan) => {
                      return (
                        <div key={plan.id} className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-luxury-gold/30 via-luxury-gold/10 to-white/5 flex flex-col h-full">
                          <div className="relative h-full bg-gradient-to-b from-[#161822] via-[#101218] to-[#0a0b0f] rounded-[23px] p-5 flex flex-col justify-between overflow-hidden">
                            <div>
                              <div className="flex items-center justify-between gap-1.5 mb-3">
                                <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold-light text-[10px] font-mono uppercase tracking-wider font-semibold">
                                  {plan.badge}
                                </span>
                                <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
                                  <Clock className="w-3 h-3 text-luxury-gold" /> {plan.periodLabel || '50 min'}
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-luxury-charcoal to-[#0b0c10] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                                  {renderPlanIcon(plan.iconName)}
                                </div>
                                <div>
                                  <h3 className="text-lg font-serif text-white font-semibold leading-tight">
                                    {plan.title}
                                  </h3>
                                  <p className="text-[10px] text-zinc-400 font-mono">
                                    {plan.sessionsSubtitle || (plan.sessionsCount === 1 ? '1 atendimento individual' : `${plan.sessionsCount} atendimentos`)}
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
                                {(plan.features || []).map((feat, idx) => (
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
                                <span>{plan.buttonText || `Formalizar ${plan.title}`}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

        </section>

        {/* BOTÃO FIXO NO RODAPÉ PARA SALVAR */}
        <div className="sticky bottom-6 z-40 max-w-2xl mx-auto bg-luxury-charcoal/95 border border-luxury-gold/40 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
          <div className="text-xs text-zinc-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span>Salvar alterações na Nuvem?</span>
              {hasPriceModifications && (
                <span className="text-amber-400 font-mono text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {modifiedPricePlans.length} preços alterados
                </span>
              )}
            </span>
            <p className="text-[10px] text-zinc-400 font-mono">Todos os textos, benefícios e valores serão atualizados globalmente.</p>
          </div>

          <button
            onClick={handleSaveClick}
            disabled={isSavingCloud}
            className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-luxury-gold/25 hover:brightness-110 active:scale-95 transition cursor-pointer shrink-0"
          >
            {isSavingCloud ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sincronizando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Tudo</span>
              </>
            )}
          </button>
        </div>

      </main>

    </div>
  );
}
