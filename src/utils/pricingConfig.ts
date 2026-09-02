export interface PlanConfig {
  id: string;
  title: string;
  badge: string;
  iconName?: 'user' | 'calendar' | 'layers' | 'sparkles' | 'shield' | 'heart' | 'award';
  periodLabel: string;
  sessionsCount: number;
  sessionsSubtitle: string;
  discountPercent: number; // em %
  finalPrice: number; // Preço final em R$
  installmentsCount: number;
  installmentText: string;
  paymentLink: string;
  buttonText: string;
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
    iconName: 'user',
    periodLabel: '50 min',
    sessionsCount: 1,
    sessionsSubtitle: '1 atendimento individual',
    discountPercent: 0,
    finalPrice: 147,
    installmentsCount: 1,
    installmentText: 'Pagamento único por sessão',
    paymentLink: 'https://pay.kiwify.com.br/0NHcZTh',
    buttonText: 'Formalizar consulta avulsa',
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
    iconName: 'calendar',
    periodLabel: '30 dias',
    sessionsCount: 4,
    sessionsSubtitle: '4 atendimentos individuais (~1x por semana)',
    discountPercent: 28.57,
    finalPrice: 420,
    installmentsCount: 2,
    installmentText: 'Em 2x de R$ 210,00',
    paymentLink: 'https://pay.kiwify.com.br/Bf7QgxM',
    buttonText: 'Formalizar modalidade mensal',
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
    iconName: 'layers',
    periodLabel: '60 dias',
    sessionsCount: 8,
    sessionsSubtitle: '8 atendimentos clínicos em 60 dias',
    discountPercent: 37.07,
    finalPrice: 740,
    installmentsCount: 2,
    installmentText: '2x R$ 370 ou 4x R$ 185',
    paymentLink: 'https://pay.kiwify.com.br/J1OGbSJ',
    buttonText: 'Formalizar modalidade bimestral',
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
    iconName: 'sparkles',
    periodLabel: '90 dias',
    sessionsCount: 12,
    sessionsSubtitle: '12 atendimentos clínicos em 90 dias',
    discountPercent: 45.58,
    finalPrice: 960,
    installmentsCount: 3,
    installmentText: 'Em 3x de R$ 320,00',
    paymentLink: 'https://pay.kiwify.com.br/59UayeX',
    buttonText: 'Formalizar modalidade trimestral',
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

// Base de Dados em Nuvem Permanente Global (Key-Value Store Segura)
export const MASTER_CLOUD_APP_KEY = 'hmlblz3j';
export const CLOUD_KV_BASE_URL = 'https://keyvalue.immanuel.co/api/KeyVal';
const LOCAL_STORAGE_BACKUP_KEY = 'psi_bruno_pricing_settings_full_v3';

// Funções utilitárias seguras para codificação hexadecimal
function toHex(str: string): string {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    hex += code.toString(16).padStart(2, '0');
  }
  return hex;
}

function fromHex(hex: string): string {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// Buscar configurações completas diretamente da Nuvem em tempo real
export async function fetchPricingSettingsFromCloud(): Promise<PricingSettings> {
  try {
    const countRes = await fetch(`${CLOUD_KV_BASE_URL}/GetValue/${MASTER_CLOUD_APP_KEY}/cfg_chunks`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (countRes.ok) {
      const countVal = await countRes.json();
      const totalChunks = parseInt(countVal, 10);

      if (totalChunks > 0) {
        const chunkPromises: Promise<any>[] = [];
        for (let i = 0; i < totalChunks; i++) {
          chunkPromises.push(
            fetch(`${CLOUD_KV_BASE_URL}/GetValue/${MASTER_CLOUD_APP_KEY}/cfg_c_${i}`, {
              method: 'GET',
              cache: 'no-store'
            }).then(r => r.json())
          );
        }

        const chunks = await Promise.all(chunkPromises);
        const fullHex = chunks.join('');
        if (fullHex && fullHex.length > 0) {
          const reconstructedJson = fromHex(fullHex);
          const parsed = JSON.parse(reconstructedJson);
          if (parsed && Array.isArray(parsed.plans)) {
            if (typeof window !== 'undefined') {
              localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(parsed));
            }
            return parsed;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Erro ao carregar configurações da nuvem:', err);
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

// Salvar configurações completas na Nuvem em tempo real
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
    const rawJson = JSON.stringify(settings);
    const hex = toHex(rawJson);

    // Dividir em pedaços seguros de 120 caracteres para as rotas da API
    const CHUNK_SIZE = 120;
    const chunks: string[] = [];
    for (let i = 0; i < hex.length; i += CHUNK_SIZE) {
      chunks.push(hex.substring(i, i + CHUNK_SIZE));
    }

    const saveRequests = [
      fetch(`${CLOUD_KV_BASE_URL}/UpdateValue/${MASTER_CLOUD_APP_KEY}/cfg_chunks/${chunks.length}`, {
        method: 'POST'
      }),
      ...chunks.map((chunk, idx) => {
        return fetch(`${CLOUD_KV_BASE_URL}/UpdateValue/${MASTER_CLOUD_APP_KEY}/cfg_c_${idx}/${chunk}`, {
          method: 'POST'
        });
      })
    ];

    await Promise.all(saveRequests);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pricing_config_updated', { detail: settings }));
    }

    return true;
  } catch (err) {
    console.error('Erro ao sincronizar na nuvem:', err);
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
