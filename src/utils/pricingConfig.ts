export interface PlanConfig {
  id: string;
  title: string;
  badge: string;
  sessionsCount: number;
  periodDays: number;
  periodLabel: string;
  discountPercent: number; // em %
  finalPrice: number; // Preço final em R$
  installmentsCount: number;
  installmentText: string;
  paymentLink: string;
  description: string;
  features: string[];
  active: boolean; // true = Exibido na página de planos | false = Inativo / Oculto
  isCustom?: boolean; // true se for plano adicionado/duplicado
}

export interface PricingSettings {
  baseSessionPrice: number;
  plans: PlanConfig[];
}

export const DEFAULT_PLANS: PlanConfig[] = [
  {
    id: 'avulsa',
    title: 'Consulta avulsa',
    badge: 'Pontual',
    sessionsCount: 1,
    periodDays: 0,
    periodLabel: '50 min',
    discountPercent: 0,
    finalPrice: 147,
    installmentsCount: 1,
    installmentText: 'Pagamento único por sessão',
    paymentLink: 'https://pay.kiwify.com.br/0NHcZTh',
    description: 'Indicada para primeiro atendimento, retorno isolado ou para quem deseja conhecer o método antes de iniciar acompanhamento contínuo.',
    features: [
      '50 minutos de escuta clínica dedicada',
      'Recibo oficial CRP para reembolso',
      'Plataforma segura e criptografada',
      'Agendamento rápido no WhatsApp'
    ],
    active: true,
    isCustom: false
  },
  {
    id: 'mensal',
    title: 'Mensal',
    badge: 'Semanal',
    sessionsCount: 4,
    periodDays: 30,
    periodLabel: '30 dias',
    discountPercent: 28.57,
    finalPrice: 420,
    installmentsCount: 2,
    installmentText: 'Em 2x de R$ 210,00',
    paymentLink: 'https://pay.kiwify.com.br/Bf7QgxM',
    description: 'Indicado para quem deseja iniciar ou manter processo terapêutico semanal, favorecendo continuidade e vínculo clínico.',
    features: [
      '4 sessões individuais (~1x por semana)',
      'Estruturação contínua e vínculo clínico',
      'Recibo mensal para reembolso convênio',
      'Horário semanal fixo reservado'
    ],
    active: true,
    isCustom: false
  },
  {
    id: 'bimestral',
    title: 'Bimestral',
    badge: 'Bimestral',
    sessionsCount: 8,
    periodDays: 60,
    periodLabel: '60 dias',
    discountPercent: 37.07,
    finalPrice: 740,
    installmentsCount: 2,
    installmentText: '2x R$ 370 ou 4x R$ 185',
    paymentLink: 'https://pay.kiwify.com.br/J1OGbSJ',
    description: 'Indicado para maior continuidade, permitindo aprofundar compreensão dos padrões emocionais e comportamentais.',
    features: [
      '8 atendimentos clínicos em 60 dias',
      'Aprofundamento de esquemas mentais',
      'Emissão de recibos mensais oficiais',
      'Acompanhamento personalizado'
    ],
    active: true,
    isCustom: false
  },
  {
    id: 'trimestral',
    title: 'Trimestral',
    badge: 'Trimestral',
    sessionsCount: 12,
    periodDays: 90,
    periodLabel: '90 dias',
    discountPercent: 45.58,
    finalPrice: 960,
    installmentsCount: 3,
    installmentText: 'Em 3x de R$ 320,00',
    paymentLink: 'https://pay.kiwify.com.br/59UayeX',
    description: 'Indicado para estruturar acompanhamento de 3 meses, favorecendo metas clínicas e novos recursos psicológicos.',
    features: [
      '12 atendimentos clínicos em 90 dias',
      'Plano Clínico Integrativo estruturado',
      'Treinamento de Habilidades Psicológicas',
      'Recibos mensais para reembolso'
    ],
    active: true,
    isCustom: false
  }
];

export const DEFAULT_PRICING_SETTINGS: PricingSettings = {
  baseSessionPrice: 147,
  plans: DEFAULT_PLANS
};

// ID Único do Objeto na Nuvem Pública Compartilhada (Real-time Cloud Database com Ativação Dinâmica)
export const CLOUD_OBJECT_ID = 'ff808181a061cdc401a061f1769b0079';
export const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

// Converter dados da nuvem para a lista de planos
function mapCloudDataToSettings(cloudData: any): PricingSettings {
  if (!cloudData) return DEFAULT_PRICING_SETTINGS;

  const basePrice = Number(cloudData.baseSessionPrice) || DEFAULT_PRICING_SETTINGS.baseSessionPrice;

  const plans: PlanConfig[] = [
    {
      ...DEFAULT_PLANS[0],
      finalPrice: Number(cloudData.avulsa_price) || DEFAULT_PLANS[0].finalPrice,
      paymentLink: cloudData.avulsa_link || DEFAULT_PLANS[0].paymentLink,
      active: cloudData.avulsa_active !== 0
    },
    {
      ...DEFAULT_PLANS[1],
      finalPrice: Number(cloudData.mensal_price) || DEFAULT_PLANS[1].finalPrice,
      paymentLink: cloudData.mensal_link || DEFAULT_PLANS[1].paymentLink,
      installmentText: cloudData.mensal_inst || DEFAULT_PLANS[1].installmentText,
      active: cloudData.mensal_active !== 0
    },
    {
      ...DEFAULT_PLANS[2],
      finalPrice: Number(cloudData.bimestral_price) || DEFAULT_PLANS[2].finalPrice,
      paymentLink: cloudData.bimestral_link || DEFAULT_PLANS[2].paymentLink,
      installmentText: cloudData.bimestral_inst || DEFAULT_PLANS[2].installmentText,
      active: cloudData.bimestral_active !== 0
    },
    {
      ...DEFAULT_PLANS[3],
      finalPrice: Number(cloudData.trimestral_price) || DEFAULT_PLANS[3].finalPrice,
      paymentLink: cloudData.trimestral_link || DEFAULT_PLANS[3].paymentLink,
      installmentText: cloudData.trimestral_inst || DEFAULT_PLANS[3].installmentText,
      active: cloudData.trimestral_active !== 0
    }
  ];

  // Plano Customizado 4
  if (cloudData.p4_title && cloudData.p4_title.trim() !== '') {
    plans.push({
      id: 'custom_p4',
      title: cloudData.p4_title,
      badge: 'Personalizado',
      sessionsCount: 6,
      periodDays: 45,
      periodLabel: '45 dias',
      discountPercent: 20,
      finalPrice: Number(cloudData.p4_price) || 500,
      installmentsCount: 2,
      installmentText: cloudData.p4_inst || 'Pagamento facilitado',
      paymentLink: cloudData.p4_link || 'https://pay.kiwify.com.br/',
      description: 'Plano personalizado de acompanhamento terapêutico sob medida.',
      features: [
        'Atendimentos clínicos dedicados',
        'Plano de intervenção direcionado',
        'Emissão de recibos oficiais CRP',
        'Suporte direto via WhatsApp'
      ],
      active: cloudData.p4_active === 1,
      isCustom: true
    });
  }

  // Plano Customizado 5
  if (cloudData.p5_title && cloudData.p5_title.trim() !== '') {
    plans.push({
      id: 'custom_p5',
      title: cloudData.p5_title,
      badge: 'Especial',
      sessionsCount: 16,
      periodDays: 120,
      periodLabel: '120 dias',
      discountPercent: 35,
      finalPrice: Number(cloudData.p5_price) || 1200,
      installmentsCount: 4,
      installmentText: cloudData.p5_inst || 'Em até 4x',
      paymentLink: cloudData.p5_link || 'https://pay.kiwify.com.br/',
      description: 'Modalidade especial para acompanhamento continuado aprofundado.',
      features: [
        'Acompanhamento estendido contínuo',
        'Aprofundamento de esquemas mentais',
        'Emissão mensal de recibos para reembolso',
        'Horários semanais reservados'
      ],
      active: cloudData.p5_active === 1,
      isCustom: true
    });
  }

  return {
    baseSessionPrice: basePrice,
    plans
  };
}

// Converter estrutura PricingSettings para os campos da nuvem
function mapSettingsToCloudData(settings: PricingSettings): any {
  const avulsa = settings.plans.find(p => p.id === 'avulsa') || DEFAULT_PLANS[0];
  const mensal = settings.plans.find(p => p.id === 'mensal') || DEFAULT_PLANS[1];
  const bimestral = settings.plans.find(p => p.id === 'bimestral') || DEFAULT_PLANS[2];
  const trimestral = settings.plans.find(p => p.id === 'trimestral') || DEFAULT_PLANS[3];

  const customPlans = settings.plans.filter(p => p.isCustom);
  const p4 = customPlans[0];
  const p5 = customPlans[1];

  return {
    baseSessionPrice: settings.baseSessionPrice,

    avulsa_price: avulsa.finalPrice,
    avulsa_link: avulsa.paymentLink,
    avulsa_active: avulsa.active ? 1 : 0,

    mensal_price: mensal.finalPrice,
    mensal_link: mensal.paymentLink,
    mensal_inst: mensal.installmentText,
    mensal_active: mensal.active ? 1 : 0,

    bimestral_price: bimestral.finalPrice,
    bimestral_link: bimestral.paymentLink,
    bimestral_inst: bimestral.installmentText,
    bimestral_active: bimestral.active ? 1 : 0,

    trimestral_price: trimestral.finalPrice,
    trimestral_link: trimestral.paymentLink,
    trimestral_inst: trimestral.installmentText,
    trimestral_active: trimestral.active ? 1 : 0,

    p4_title: p4 ? p4.title : '',
    p4_price: p4 ? p4.finalPrice : 0,
    p4_link: p4 ? p4.paymentLink : '',
    p4_inst: p4 ? p4.installmentText : '',
    p4_active: p4 && p4.active ? 1 : 0,

    p5_title: p5 ? p5.title : '',
    p5_price: p5 ? p5.finalPrice : 0,
    p5_link: p5 ? p5.paymentLink : '',
    p5_inst: p5 ? p5.installmentText : '',
    p5_active: p5 && p5.active ? 1 : 0
  };
}

// Buscar configurações diretamente da Nuvem em tempo real (para todos os visitantes)
export async function fetchPricingSettingsFromCloud(): Promise<PricingSettings> {
  try {
    const res = await fetch(CLOUD_API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (res.ok) {
      const obj = await res.json();
      if (obj && obj.data) {
        return mapCloudDataToSettings(obj.data);
      }
    }
  } catch (err) {
    console.warn('Conexão em tempo real com a nuvem indisponível, usando valores oficiais:', err);
  }

  return DEFAULT_PRICING_SETTINGS;
}

// Salvar configurações na Nuvem em tempo real (disponível imediatamente para o mundo todo)
export async function savePricingSettingsToCloud(settings: PricingSettings): Promise<boolean> {
  try {
    const cloudPayload = mapSettingsToCloudData(settings);

    const res = await fetch(CLOUD_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'psicologia_bruno_pricing_v3',
        data: cloudPayload
      })
    });

    if (res.ok) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pricing_config_updated', { detail: settings }));
      }
      return true;
    }
  } catch (err) {
    console.error('Erro ao salvar na nuvem:', err);
  }

  return false;
}

// Restaurar valores oficiais na Nuvem
export async function resetPricingSettingsInCloud(): Promise<PricingSettings> {
  await savePricingSettingsToCloud(DEFAULT_PRICING_SETTINGS);
  return DEFAULT_PRICING_SETTINGS;
}
