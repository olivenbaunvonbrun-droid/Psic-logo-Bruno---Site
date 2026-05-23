import { Testimonial, PainPoint, AssessmentQuestion, FaqItem } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: "Mariana S.",
    age: 34,
    location: "Rio de Janeiro - RJ",
    role: "Advogada Corporativa",
    text: "Cheguei ao Bruno carregando um esgotamento terrível e uma ansiedade que travava meu peito todas as manhãs. Eu sentia que precisava ser perfeita em tudo, mas só acumulava medos e dependência da opinião alheia. A psicoterapia foi um divisor de águas. O jeito firme, porém profundamente humano e sem julgamentos do Bruno, apoiado na TCC de 4ª geração, me fez compreender e acolher minha história. Hoje respiro mais leve, sei colocar limites e recuperei o comando da minha mente.",
    outcome: "Recuperação do pânico e burnout, restabelecimento de limites saudáveis de trabalho."
  },
  {
    id: 't2',
    name: "Rodrigo M.",
    age: 29,
    location: "São Paulo - SP",
    role: "Empreendedor de Tecnologia",
    text: "Minhas relações eram pautadas pela dependência emocional e o medo constante da rejeição. Eu me abandonava para agradar os outros e sofria com flutuações severas de humor e depressão silenciosa. A terapia com o Bruno me trouxe inteligência de verdade sobra as minhas emoções. Ele me ensinou conceitos da neurociência e estratégias práticas que mudaram minha forma de agir. O consultório dele online é um refúgio de dignidade e acolhimento.",
    outcome: "Superação da dependência emocional, independência afetiva e estabilização do humor."
  },
  {
    id: 't3',
    name: "Heloísa F.",
    age: 42,
    location: "Niterói - RJ",
    role: "Médica Pediatra",
    text: "O Bruno de Oliveira é de uma sensibilidade ímpar. Carrego traumas de infância complexos que reverberavam na minha forma de maternar e na minha autoestima. Ele une a profundidade da compreensão humana com ferramentas científicas de ponta. Sentir que você está sendo verdadeiramente ouvida por um profissional de altíssimo nível, cuja missão clara é reduzir a dor, muda de forma crucial a nossa autoconfiança de viver.",
    outcome: "Ressignificação de traumas familiares, aumento expressivo da autoestima e segurança pessoal."
  }
];

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'anxiety',
    title: "Ansiedade & Preocupação Constante",
    subtitle: "A mente acelerada que parece nunca dar trégua para repousar.",
    iconName: "BrainCircuit",
    mainPain: "Pensamentos catastróficos em looping, aperto constante no peito, noites de sono rasas e a sensação de que algo terrível vai acontecer a qualquer segundo.",
    subconsciousMessage: "Você carrega o fardo invisível de tentar controlar o futuro para se sentir seguro, mas isso está roubando a sua capacidade de desfrutar o seu presente.",
    approach: "Na TCC de 4ª Geração (voltada à aceitação, atenção plena e flexibilidade mental), não tentamos lutar desesperadamente contra seus pensamentos ansiosos. Ensinamos seu cérebro a observar essas histórias sem se fundir a elas, reduzindo a hipervigilância neurológica.",
    advice: "DICA PRÁTICA: Quando a ansiedade atingir o pico, mude seu foco para a periferia do corpo. Sinta o peso dos seus pés tocando o solo e o tecido da sua roupa. A ansiedade vive no futuro; a realidade apoia-se no presente."
  },
  {
    id: 'depression',
    title: "Vazio Emocional & Tristeza Profunda",
    subtitle: "Quando a vida perde o brilho acadêmico e as cores parecem lavadas.",
    iconName: "CloudRain",
    mainPain: "Cansaço extremo que não passa com o sono, apatia em relação a hobbies que antes traziam alegria, culpa corrosiva e a sensação de carregar um peso pesado no peito.",
    subconsciousMessage: "O cansaço que você sente não é preguiça física: é a sua mente entrando em exaustão após passar anos suprimindo dores, frustrações e tentativas hercúleas de se encaixar.",
    approach: "Integrando a Act (Terapia de Aceitação e Compromisso) com a Neurociência, investigamos de maneira humanizada as necessidades profundas que foram silenciadas. Restauramos a conexão com seus valores fundamentais para dar novos objetivos vivos à sua rotina.",
    advice: "DICA PRÁTICA: Não espere a 'vontade' ou motivação chegar para agir. A cura da depressão começa com micro-ações de autocuidado, mesmo sem vontade. O movimento cria a emoção, e não o oposto."
  },
  {
    id: 'trauma',
    title: "Traumas & Cicatrizes do Passado",
    subtitle: "Ecos do ontem que continuam ditando as regras das suas reações hoje.",
    iconName: "HeartCrack",
    mainPain: "Gatilhos emocionais intensos que disparam por motivos aparentemente simples, medos irracionais de abandono ou rejeição e lembranças invasivas que invadem seus pensamentos.",
    subconsciousMessage: "Sua criança interna passou por momentos em que precisou criar armaduras pesadas para sobreviver. Mas as armaduras que te protegeram lá atrás agora estão te sufocando.",
    approach: "Utilizamos técnicas de reprocessamento cognitivo e compaixão clínica. Criamos um ambiente luxuoso de total confidencialidade e segurança absoluta para acolher as feridas antigas, gerando autocompaixão e reescrevendo o roteiro da sua própria história.",
    advice: "DICA PRÁTICA: Em um momento de gatilho traumático, abrace-se firmemente de braços cruzados e respire pausadamente. Lembre-se, em voz baixa: 'Aquele perigo acabou. Estou em segurança aqui, agora.'"
  },
  {
    id: 'dependence',
    title: "Dependência Emocional & Medo de Solidão",
    subtitle: "O esgotamento mental de viver pisando em ovos para nunca desagradar.",
    iconName: "Users",
    mainPain: "Anular todas as suas vontades para agradar o parceiro(a), medo desesperador de ser deixado sozinho, necessidade de validação externa para validar suas menores escolhas cotidianas.",
    subconsciousMessage: "Por medo de perder o amor do outro, você acabou cometendo o maior erro de todos: abandonou a si mesmo no processo.",
    approach: "Fortalecemos a sua diferenciação do Eu e sua autonomia afetiva. Através de treinos de assertividade comportamental e regulação emocional profunda, você descobrirá que sua companhia é um lugar seguro e extremamente rico de viver.",
    advice: "DICA PRÁTICA: Comece a tomar pequenas decisões sozinho, sem pedir a aprovação de ninguém. Perceba que você é perfeitamente capaz de guiar suas escolhas e suportar as consequências."
  },
  {
    id: 'selfesteen',
    title: "Baixa Autoestima & Autocobrança Cruel",
    subtitle: "A voz julgadora interna que sabota suas conquistas antes de acontecerem.",
    iconName: "ShieldAlert",
    mainPain: "Síndrome do impostor no trabalho, comparação obsessiva com o feed impecável das redes sociais alheias, sensação de insuficiência persistente mesmo sendo altamente qualificado.",
    subconsciousMessage: "Sua mente aprendeu que seu valor depende estritamente das suas entregas e performance. Você se tornou seu carrasco mais impiedoso.",
    approach: "Trabalhamos na desconstrução desse diálogo interno destrutivo usando a Terapia Metacognitiva e o mindfulness. Substituímos o chicote da autocobrança por uma responsabilidade compassiva e extremamente potente.",
    advice: "DICA PRÁTICA: Da próxima vez que cometer um erro, pergunte-se: 'Se um melhor amigo estivesse nessa situação, eu diria as mesmas palavras duras para ele?' Trate-se com a mesma classe e elegância que trata os outros."
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: "Com que frequência você sente um aperto inexplicável no peito ou pensamentos acelerados sobre coisas que ainda nem aconteceram?",
    category: 'anxiety',
    options: [
      { text: "Raramente ou quase nunca", score: 0 },
      { text: "Algumas vezes na semana, sinto uma inquietação sutil", score: 2 },
      { text: "Quase todos os dias, sinto angústia física e mente descontrolada", score: 4 }
    ]
  },
  {
    id: 2,
    text: "Como você lida com a necessidade de aprovação e validação das pessoas que se relacionam com você?",
    category: 'dependence',
    options: [
      { text: "Me sinto seguro de minhas decisões mesmo que discordem", score: 0 },
      { text: "Frequentemente mudo as minhas opiniões ou atitudes para evitar conflitos", score: 2 },
      { text: "Dói de forma insuportável pensar que alguém possa estar desapontado comigo", score: 4 }
    ]
  },
  {
    id: 3,
    text: "Quando você pensa no seu futuro ou avalia as suas conquistas, qual sentimento predomina?",
    category: 'self_esteem',
    options: [
      { text: "Orgulho e otimismo realista pelas próximas etapas", score: 0 },
      { text: "Sensação de que sou uma farsa e de que nunca faço o suficiente", score: 2 },
      { text: "Desesperança profunda e a certeza de que estou sempre atrasado", score: 4 }
    ]
  },
  {
    id: 4,
    text: "Como tem sido a sua energia vital, o seu sono e a sua vontade de realizar atividades simples ultimamente?",
    category: 'depression',
    options: [
      { text: "Regular, durmo bem e consigo realizar meus planos", score: 0 },
      { text: "Me sinto cansado emocionalmente, mas sigo operando no piloto automático", score: 2 },
      { text: "Acordo sem forças, sinto um vazio persistente e um esgotamento indescritível", score: 4 }
    ]
  },
  {
    id: 5,
    text: "Ao enfrentar uma memória desconfortável de rejeição ou uma falha de postura no seu histórico, qual é a sua reação?",
    category: 'dependence',
    options: [
      { text: "Compreendo que era o meu melhor momento e sigo em frente", score: 0 },
      { text: "Fico remoendo o ocorrido por dias, sentindo culpa silenciosa", score: 2 },
      { text: "Isso revive instantaneamente gatilhos intensos e sinto dor como se fosse hoje", score: 4 }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    category: "Geral",
    question: "Como funciona a psicoterapia online?",
    answer: "A psicoterapia online é conduzida por videochamadas criptografadas de ponta a ponta, oferecendo o mesmo nível de eficácia, calor humano e rigor ético de um atendimento presencial. Ela permite que você seja atendido no conforto e sigilo do seu lar, economizando tempo valioso com deslocamentos e facilitando o encaixe na rotina de quem viaja bastante."
  },
  {
    category: "Metodologia",
    question: "O que é a TCC de 4ª geração?",
    answer: "Se a primeira geração focou no comportamento e a segunda nas distorções de pensamento, a 4ª geração da Terapia Cognitivo-Comportamental representa o ápice da integração clínica. Ela une o rigor científico da neurociência comportamental clássica com o mindfulness (atenção plena), Terapia de Aceitação e Compromisso (ACT), autocompaixão profunda e espiritualidade laica. foca não apenas em 'silenciar' sintomas, mas em desenvolver flexibilidade psicológica para construir uma vida autêntica que de fato valha a pena ser vivida."
  },
  {
    category: "Investimento & Atendimento",
    question: "Você aceita plano de saúde / convênio?",
    answer: "Os atendimentos são particulares para garantir a máxima excelência, tempo dedicado de estudo ao seu caso e privacidade ética absoluta. Emitimos recibo com todos os dados profissionais necessários para você solicitar o reembolso integral ou parcial junto ao seu plano de saúde, conforme as regras da sua operadora."
  },
  {
    category: "Geral",
    question: "Qual é a frequência recomendada das consultas?",
    answer: "Inicialmente, as sessões ocorrem semanalmente (com duração aproximada de 50 minutos). Esse ritmo é crucial para estabelecer o vínculo analítico, diagnosticar a dinâmica do sofrimento e implementar as ferramentas práticas. Conforme o paciente adquire autonomia emocional e regulação psicológica, espaçamos o intervalo de encontros de maneira planejada."
  },
  {
    category: "Metodologia",
    question: "É indicado para adolescentes ou somente adultos?",
    answer: "O psicólogo Bruno de Oliveira é altamente qualificado para atender tanto adolescentes quanto adultos. A abordagem integrativa adapta-se à faixa etária: utilizando linguagens mais dinâmicas e reflexivas para jovens em fase de estruturação de identidade, e profundos insights lógicos e neurocientíficos para adultos focados em carreira, casamento e ressignificação de passados complexos."
  }
];
