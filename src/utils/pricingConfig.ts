export interface PlanConfig {
  id: 'avulsa' | 'mensal' | 'bimestral' | 'trimestral';
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
}

export interface PricingSettings {
  baseSessionPrice: number;
  plans: {
    avulsa: PlanConfig;
    mensal: PlanConfig;
    bimestral: PlanConfig;
    trimestral: PlanConfig;
  };
}

export const DEFAULT_PRICING_SETTINGS: PricingSettings = {
  baseSessionPrice: 147,
  plans: {
    avulsa: {
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
      ]
    },
    mensal: {
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
      ]
    },
    bimestral: {
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
      ]
    },
    trimestral: {
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
      ]
    }
  }
};

// ID Único do Objeto na Nuvem Pública Compartilhada (Real-time Cloud Database)
export const CLOUD_OBJECT_ID = 'ff808181a061cdc401a061ebff320071';
export const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

// Converter dados da nuvem para a estrutura PricingSettings
function mapCloudDataToSettings(cloudData: any): PricingSettings {
  if (!cloudData) return DEFAULT_PRICING_SETTINGS;

  return {
    baseSessionPrice: Number(cloudData.baseSessionPrice) || DEFAULT_PRICING_SETTINGS.baseSessionPrice,
    plans: {
      avulsa: {
        ...DEFAULT_PRICING_SETTINGS.plans.avulsa,
        badge: cloudData.avulsa_badge || DEFAULT_PRICING_SETTINGS.plans.avulsa.badge,
        finalPrice: Number(cloudData.avulsa_price) || DEFAULT_PRICING_SETTINGS.plans.avulsa.finalPrice,
        paymentLink: cloudData.avulsa_link || DEFAULT_PRICING_SETTINGS.plans.avulsa.paymentLink,
        installmentText: cloudData.avulsa_inst_text || DEFAULT_PRICING_SETTINGS.plans.avulsa.installmentText
      },
      mensal: {
        ...DEFAULT_PRICING_SETTINGS.plans.mensal,
        badge: cloudData.mensal_badge || DEFAULT_PRICING_SETTINGS.plans.mensal.badge,
        finalPrice: Number(cloudData.mensal_price) || DEFAULT_PRICING_SETTINGS.plans.mensal.finalPrice,
        discountPercent: Number(cloudData.mensal_discount) ?? DEFAULT_PRICING_SETTINGS.plans.mensal.discountPercent,
        installmentsCount: Number(cloudData.mensal_installments) || DEFAULT_PRICING_SETTINGS.plans.mensal.installmentsCount,
        installmentText: cloudData.mensal_inst_text || DEFAULT_PRICING_SETTINGS.plans.mensal.installmentText,
        paymentLink: cloudData.mensal_link || DEFAULT_PRICING_SETTINGS.plans.mensal.paymentLink
      },
      bimestral: {
        ...DEFAULT_PRICING_SETTINGS.plans.bimestral,
        badge: cloudData.bimestral_badge || DEFAULT_PRICING_SETTINGS.plans.bimestral.badge,
        finalPrice: Number(cloudData.bimestral_price) || DEFAULT_PRICING_SETTINGS.plans.bimestral.finalPrice,
        discountPercent: Number(cloudData.bimestral_discount) ?? DEFAULT_PRICING_SETTINGS.plans.bimestral.discountPercent,
        installmentsCount: Number(cloudData.bimestral_installments) || DEFAULT_PRICING_SETTINGS.plans.bimestral.installmentsCount,
        installmentText: cloudData.bimestral_inst_text || DEFAULT_PRICING_SETTINGS.plans.bimestral.installmentText,
        paymentLink: cloudData.bimestral_link || DEFAULT_PRICING_SETTINGS.plans.bimestral.paymentLink
      },
      trimestral: {
        ...DEFAULT_PRICING_SETTINGS.plans.trimestral,
        badge: cloudData.trimestral_badge || DEFAULT_PRICING_SETTINGS.plans.trimestral.badge,
        finalPrice: Number(cloudData.trimestral_price) || DEFAULT_PRICING_SETTINGS.plans.trimestral.finalPrice,
        discountPercent: Number(cloudData.trimestral_discount) ?? DEFAULT_PRICING_SETTINGS.plans.trimestral.discountPercent,
        installmentsCount: Number(cloudData.trimestral_installments) || DEFAULT_PRICING_SETTINGS.plans.trimestral.installmentsCount,
        installmentText: cloudData.trimestral_inst_text || DEFAULT_PRICING_SETTINGS.plans.trimestral.installmentText,
        paymentLink: cloudData.trimestral_link || DEFAULT_PRICING_SETTINGS.plans.trimestral.paymentLink
      }
    }
  };
}

// Converter estrutura PricingSettings para os campos da nuvem
function mapSettingsToCloudData(settings: PricingSettings): any {
  return {
    baseSessionPrice: settings.baseSessionPrice,
    avulsa_badge: settings.plans.avulsa.badge,
    avulsa_price: settings.plans.avulsa.finalPrice,
    avulsa_link: settings.plans.avulsa.paymentLink,
    avulsa_inst_text: settings.plans.avulsa.installmentText,

    mensal_badge: settings.plans.mensal.badge,
    mensal_price: settings.plans.mensal.finalPrice,
    mensal_discount: settings.plans.mensal.discountPercent,
    mensal_installments: settings.plans.mensal.installmentsCount,
    mensal_inst_text: settings.plans.mensal.installmentText,
    mensal_link: settings.plans.mensal.paymentLink,

    bimestral_badge: settings.plans.bimestral.badge,
    bimestral_price: settings.plans.bimestral.finalPrice,
    bimestral_discount: settings.plans.bimestral.discountPercent,
    bimestral_installments: settings.plans.bimestral.installmentsCount,
    bimestral_inst_text: settings.plans.bimestral.installmentText,
    bimestral_link: settings.plans.bimestral.paymentLink,

    trimestral_badge: settings.plans.trimestral.badge,
    trimestral_price: settings.plans.trimestral.finalPrice,
    trimestral_discount: settings.plans.trimestral.discountPercent,
    trimestral_installments: settings.plans.trimestral.installmentsCount,
    trimestral_inst_text: settings.plans.trimestral.installmentText,
    trimestral_link: settings.plans.trimestral.paymentLink
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
        name: 'psicologia_bruno_pricing_cloud_v1',
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
