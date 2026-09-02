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
  baseSessionPrice: number; // Preço base da sessão avulsa (ex: 147)
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

const STORAGE_KEY = 'bruno_psicologia_pricing_config_v1';

export function getPricingSettings(): PricingSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_PRICING_SETTINGS;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Mesclar para garantir compatibilidade caso novos campos sejam adicionados
      return {
        ...DEFAULT_PRICING_SETTINGS,
        ...parsed,
        plans: {
          ...DEFAULT_PRICING_SETTINGS.plans,
          ...(parsed.plans || {})
        }
      };
    }
  } catch (err) {
    console.error('Erro ao ler configurações de preços do localStorage:', err);
  }

  return DEFAULT_PRICING_SETTINGS;
}

export function savePricingSettings(settings: PricingSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('pricing_config_updated'));
  } catch (err) {
    console.error('Erro ao salvar configurações de preços no localStorage:', err);
  }
}

export function resetPricingSettings(): PricingSettings {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('pricing_config_updated'));
    } catch (err) {
      console.error('Erro ao resetar configurações de preços:', err);
    }
  }
  return DEFAULT_PRICING_SETTINGS;
}
