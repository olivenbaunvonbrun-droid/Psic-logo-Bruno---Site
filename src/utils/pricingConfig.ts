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

// Base de Dados em Nuvem Permanente Global (Key-Value Store sem limite de requisições)
export const MASTER_CLOUD_APP_KEY = 'hmlblz3j';
export const CLOUD_KV_BASE_URL = 'https://keyvalue.immanuel.co/api/KeyVal';
const LOCAL_STORAGE_BACKUP_KEY = 'psi_bruno_pricing_settings_backup_v2';

// Funções utilitárias seguras para codificação hexadecimal de valores em URLs
function hexEncode(str: string): string {
  if (!str || str.trim() === '') return 'EMPTY';
  try {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      hex += code.toString(16).padStart(2, '0');
    }
    return hex;
  } catch {
    return encodeURIComponent(str);
  }
}

function hexDecode(hex: string): string {
  if (!hex || hex === 'EMPTY' || hex === 'null' || hex === 'undefined') return '';
  try {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  } catch {
    try {
      return decodeURIComponent(hex);
    } catch {
      return hex;
    }
  }
}

// Buscar configurações diretamente da Nuvem em tempo real (para todos os visitantes globais)
export async function fetchPricingSettingsFromCloud(): Promise<PricingSettings> {
  // Tentar primeiro obter da nuvem global compartilhada
  try {
    const keys = [
      'basePrice',
      'avulsaPrice', 'avulsaLink', 'avulsaActive',
      'mensalPrice', 'mensalLink', 'mensalInst', 'mensalActive',
      'bimestralPrice', 'bimestralLink', 'bimestralInst', 'bimestralActive',
      'trimestralPrice', 'trimestralLink', 'trimestralInst', 'trimestralActive',
      'p4Title', 'p4Price', 'p4Link', 'p4Inst', 'p4Active',
      'p5Title', 'p5Price', 'p5Link', 'p5Inst', 'p5Active'
    ];

    const responses = await Promise.allSettled(
      keys.map(async (k) => {
        const res = await fetch(`${CLOUD_KV_BASE_URL}/GetValue/${MASTER_CLOUD_APP_KEY}/${k}`, {
          method: 'GET',
          cache: 'no-store'
        });
        if (!res.ok) return [k, ''];
        const val = await res.json();
        return [k, hexDecode(String(val))];
      })
    );

    const cloudData: Record<string, string> = {};
    for (const r of responses) {
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        cloudData[r.value[0]] = r.value[1];
      }
    }

    if (cloudData.basePrice && Number(cloudData.basePrice) > 0) {
      const basePrice = Number(cloudData.basePrice) || DEFAULT_PRICING_SETTINGS.baseSessionPrice;

      const plans: PlanConfig[] = [
        {
          ...DEFAULT_PLANS[0],
          finalPrice: Number(cloudData.avulsaPrice) || DEFAULT_PLANS[0].finalPrice,
          paymentLink: cloudData.avulsaLink || DEFAULT_PLANS[0].paymentLink,
          active: cloudData.avulsaActive !== '0'
        },
        {
          ...DEFAULT_PLANS[1],
          finalPrice: Number(cloudData.mensalPrice) || DEFAULT_PLANS[1].finalPrice,
          paymentLink: cloudData.mensalLink || DEFAULT_PLANS[1].paymentLink,
          installmentText: cloudData.mensalInst || DEFAULT_PLANS[1].installmentText,
          active: cloudData.mensalActive !== '0'
        },
        {
          ...DEFAULT_PLANS[2],
          finalPrice: Number(cloudData.bimestralPrice) || DEFAULT_PLANS[2].finalPrice,
          paymentLink: cloudData.bimestralLink || DEFAULT_PLANS[2].paymentLink,
          installmentText: cloudData.bimestralInst || DEFAULT_PLANS[2].installmentText,
          active: cloudData.bimestralActive !== '0'
        },
        {
          ...DEFAULT_PLANS[3],
          finalPrice: Number(cloudData.trimestralPrice) || DEFAULT_PLANS[3].finalPrice,
          paymentLink: cloudData.trimestralLink || DEFAULT_PLANS[3].paymentLink,
          installmentText: cloudData.trimestralInst || DEFAULT_PLANS[3].installmentText,
          active: cloudData.trimestralActive !== '0'
        }
      ];

      // Plano Customizado 4
      if (cloudData.p4Title && cloudData.p4Title.trim() !== '') {
        plans.push({
          id: 'custom_p4',
          title: cloudData.p4Title,
          badge: 'Personalizado',
          sessionsCount: 6,
          periodDays: 45,
          periodLabel: '45 dias',
          discountPercent: 20,
          finalPrice: Number(cloudData.p4Price) || 500,
          installmentsCount: 2,
          installmentText: cloudData.p4Inst || 'Pagamento facilitado',
          paymentLink: cloudData.p4Link || 'https://pay.kiwify.com.br/',
          description: 'Plano personalizado de acompanhamento terapêutico sob medida.',
          features: [
            'Atendimentos clínicos dedicados',
            'Plano de intervenção direcionado',
            'Emissão de recibos oficiais CRP',
            'Suporte direto via WhatsApp'
          ],
          active: cloudData.p4Active === '1',
          isCustom: true
        });
      }

      // Plano Customizado 5
      if (cloudData.p5Title && cloudData.p5Title.trim() !== '') {
        plans.push({
          id: 'custom_p5',
          title: cloudData.p5Title,
          badge: 'Especial',
          sessionsCount: 16,
          periodDays: 120,
          periodLabel: '120 dias',
          discountPercent: 35,
          finalPrice: Number(cloudData.p5Price) || 1200,
          installmentsCount: 4,
          installmentText: cloudData.p5Inst || 'Em até 4x',
          paymentLink: cloudData.p5Link || 'https://pay.kiwify.com.br/',
          description: 'Modalidade especial para acompanhamento continuado aprofundado.',
          features: [
            'Acompanhamento estendido contínuo',
            'Aprofundamento de esquemas mentais',
            'Emissão mensal de recibos para reembolso',
            'Horários semanais reservados'
          ],
          active: cloudData.p5Active === '1',
          isCustom: true
        });
      }

      const loadedSettings: PricingSettings = { baseSessionPrice: basePrice, plans };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(loadedSettings));
      }
      return loadedSettings;
    }
  } catch (err) {
    console.warn('Erro ao ler da nuvem:', err);
  }

  // Backup em localStorage se estiver offline
  if (typeof window !== 'undefined') {
    try {
      const savedLocal = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
      if (savedLocal) {
        return JSON.parse(savedLocal);
      }
    } catch {
      // continua para padrão
    }
  }

  return DEFAULT_PRICING_SETTINGS;
}

// Salvar configurações na Nuvem em tempo real (disponível imediatamente para todos os visitantes)
export async function savePricingSettingsToCloud(settings: PricingSettings): Promise<boolean> {
  // Salvar backup local imediato
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  try {
    const avulsa = settings.plans.find(p => p.id === 'avulsa') || DEFAULT_PLANS[0];
    const mensal = settings.plans.find(p => p.id === 'mensal') || DEFAULT_PLANS[1];
    const bimestral = settings.plans.find(p => p.id === 'bimestral') || DEFAULT_PLANS[2];
    const trimestral = settings.plans.find(p => p.id === 'trimestral') || DEFAULT_PLANS[3];

    const customPlans = settings.plans.filter(p => p.isCustom);
    const p4 = customPlans[0];
    const p5 = customPlans[1];

    const entries = [
      ['basePrice', hexEncode(String(settings.baseSessionPrice))],
      
      ['avulsaPrice', hexEncode(String(avulsa.finalPrice))],
      ['avulsaLink', hexEncode(avulsa.paymentLink)],
      ['avulsaActive', hexEncode(avulsa.active ? '1' : '0')],

      ['mensalPrice', hexEncode(String(mensal.finalPrice))],
      ['mensalLink', hexEncode(mensal.paymentLink)],
      ['mensalInst', hexEncode(mensal.installmentText)],
      ['mensalActive', hexEncode(mensal.active ? '1' : '0')],

      ['bimestralPrice', hexEncode(String(bimestral.finalPrice))],
      ['bimestralLink', hexEncode(bimestral.paymentLink)],
      ['bimestralInst', hexEncode(bimestral.installmentText)],
      ['bimestralActive', hexEncode(bimestral.active ? '1' : '0')],

      ['trimestralPrice', hexEncode(String(trimestral.finalPrice))],
      ['trimestralLink', hexEncode(trimestral.paymentLink)],
      ['trimestralInst', hexEncode(trimestral.installmentText)],
      ['trimestralActive', hexEncode(trimestral.active ? '1' : '0')],

      ['p4Title', hexEncode(p4 ? p4.title : '')],
      ['p4Price', hexEncode(p4 ? String(p4.finalPrice) : '0')],
      ['p4Link', hexEncode(p4 ? p4.paymentLink : '')],
      ['p4Inst', hexEncode(p4 ? p4.installmentText : '')],
      ['p4Active', hexEncode(p4 && p4.active ? '1' : '0')],

      ['p5Title', hexEncode(p5 ? p5.title : '')],
      ['p5Price', hexEncode(p5 ? String(p5.finalPrice) : '0')],
      ['p5Link', hexEncode(p5 ? p5.paymentLink : '')],
      ['p5Inst', hexEncode(p5 ? p5.installmentText : '')],
      ['p5Active', hexEncode(p5 && p5.active ? '1' : '0')]
    ];

    // Envio para a nuvem global
    await Promise.all(
      entries.map(async ([k, v]) => {
        return fetch(`${CLOUD_KV_BASE_URL}/UpdateValue/${MASTER_CLOUD_APP_KEY}/${k}/${v}`, {
          method: 'POST'
        });
      })
    );

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pricing_config_updated', { detail: settings }));
    }

    return true;
  } catch (err) {
    console.error('Erro ao sincronizar na nuvem:', err);
    // Como foi salvo no localStorage com sucesso, notificamos o app localmente
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pricing_config_updated', { detail: settings }));
    }
    return true;
  }
}

// Restaurar valores oficiais na Nuvem
export async function resetPricingSettingsInCloud(): Promise<PricingSettings> {
  await savePricingSettingsToCloud(DEFAULT_PRICING_SETTINGS);
  return DEFAULT_PRICING_SETTINGS;
}
