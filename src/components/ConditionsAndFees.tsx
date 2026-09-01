import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckSquare, 
  Square, 
  ArrowLeft, 
  MessageSquareHeart, 
  ExternalLink,
  Lock,
  HeartHandshake
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
      <header className="w-full bg-luxury-charcoal/90 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-50 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a 
              href="/landpage"
              className="flex items-center gap-1.5 text-xs text-luxury-gold-light hover:text-white transition font-medium mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar à apresentação</span>
            </a>
            <div className="w-9 h-9 rounded-full border border-luxury-gold/40 flex items-center justify-center bg-[#07090f] overflow-hidden shrink-0 shadow-md">
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
              <p className="text-[10px] text-luxury-gold-light font-mono">
                Psicólogo Clínico • CRP 05/75885
              </p>
            </div>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold-light hover:text-white text-[11px] font-sans px-4 py-2 rounded-full transition"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dúvidas via WhatsApp</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16">

        {/* CABEÇALHO DA PÁGINA DE MODALIDADES */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-xs text-luxury-gold-light uppercase tracking-widest font-medium mb-4">
            <FileText className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Condições Técnicas & Formalização</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-semibold tracking-tight mb-3">
            Modalidades de Acompanhamento Psicológico
          </h1>

          <p className="text-sm sm:text-base text-luxury-gold-light font-medium tracking-wide mb-6">
            Condições de contratação e honorários profissionais
          </p>

          <div className="bg-luxury-charcoal/60 border border-luxury-gold/20 rounded-2xl p-6 text-left text-xs sm:text-sm text-zinc-300 leading-relaxed font-light space-y-3 shadow-lg">
            <p>
              Esta página apresenta as modalidades de organização do acompanhamento psicológico e seus respectivos honorários profissionais.
            </p>
            <p>
              As informações abaixo são disponibilizadas exclusivamente para fins de transparência antes da contratação, não constituindo promoção, desconto, promessa de resultado ou comparação com outros profissionais.
            </p>
            <p className="text-luxury-gold-light font-medium">
              O acompanhamento será conduzido por Bruno de Oliveira Lima — Psicólogo Clínico — CRP 05/75885, respeitando o sigilo profissional, a autonomia do paciente e os limites técnicos da prática psicológica.
            </p>
          </div>
        </section>

        {/* SEÇÃO 1: DECLARAÇÃO DE CIÊNCIA E CONCORDÂNCIA (OBRIGATÓRIO PARA HABILITAR) */}
        <section id="declaracao-de-ciencia" className="mb-12">
          <div className={`rounded-2xl border p-6 sm:p-8 transition duration-300 ${
            showValidationAlert && !isAllChecked 
              ? 'bg-red-950/20 border-red-500/50 shadow-red-500/10 shadow-lg' 
              : 'bg-luxury-charcoal/80 border-luxury-gold/30 shadow-xl'
          }`}>
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
              <h2 className="text-base sm:text-lg font-serif text-white font-semibold">
                Confirmação prévia de entendimento
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6">
              Para prosseguir para a formalização, confirme que você compreendeu as diretrizes abaixo:
            </p>

            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-200">
              
              {/* Checkbox 1 */}
              <div 
                onClick={() => toggleCheck('noPromise')}
                className="flex items-start gap-3 p-3 rounded-xl bg-luxury-black/50 border border-white/5 hover:border-luxury-gold/30 transition cursor-pointer select-none"
              >
                {checkedItems.noPromise ? (
                  <CheckSquare className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                )}
                <span>
                  Entendo que o acompanhamento psicológico não oferece promessa de resultado específico.
                </span>
              </div>

              {/* Checkbox 2 */}
              <div 
                onClick={() => toggleCheck('professionalFees')}
                className="flex items-start gap-3 p-3 rounded-xl bg-luxury-black/50 border border-white/5 hover:border-luxury-gold/30 transition cursor-pointer select-none"
              >
                {checkedItems.professionalFees ? (
                  <CheckSquare className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                )}
                <span>
                  Entendo que os valores apresentados correspondem a honorários profissionais e condições de contratação, não a promoção, desconto ou oferta comercial.
                </span>
              </div>

              {/* Checkbox 3 */}
              <div 
                onClick={() => toggleCheck('scheduleAlignment')}
                className="flex items-start gap-3 p-3 rounded-xl bg-luxury-black/50 border border-white/5 hover:border-luxury-gold/30 transition cursor-pointer select-none"
              >
                {checkedItems.scheduleAlignment ? (
                  <CheckSquare className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                )}
                <span>
                  Entendo que o dia e horário dos atendimentos serão alinhados diretamente com o psicólogo.
                </span>
              </div>

              {/* Checkbox 4 */}
              <div 
                onClick={() => toggleCheck('urgencyLimits')}
                className="flex items-start gap-3 p-3 rounded-xl bg-luxury-black/50 border border-white/5 hover:border-luxury-gold/30 transition cursor-pointer select-none"
              >
                {checkedItems.urgencyLimits ? (
                  <CheckSquare className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                )}
                <span>
                  Entendo que, em situações de urgência, emergência, risco iminente, violência ou ameaça à integridade, o atendimento online pode não ser a modalidade indicada.
                </span>
              </div>

            </div>

            {showValidationAlert && !isAllChecked && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>Por favor, marque todos os 4 itens de ciência acima para liberar os botões de formalização.</span>
              </div>
            )}

            {isAllChecked && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Confirmações registradas. Você já pode selecionar a modalidade desejada abaixo.</span>
              </div>
            )}
          </div>
        </section>

        {/* SEÇÃO 2: MODALIDADES DE ATENDIMENTO & HONORÁRIOS */}
        <section className="mb-14 space-y-6">
          
          <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold text-center mb-6">
            Opções de Organização dos Atendimentos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* MODALIDADE 1: Consulta avulsa */}
            <div className="bg-luxury-charcoal/90 border border-luxury-gold/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold font-semibold">
                    Modalidade 1
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> ~50 min
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white font-semibold mb-2">
                  Consulta avulsa
                </h3>

                <div className="text-xl font-mono text-luxury-gold-light font-bold mb-4">
                  1 atendimento psicológico — R$ 147,00
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  Indicada para primeiro atendimento, atendimento pontual, retorno isolado ou para quem ainda não sabe se deseja iniciar um acompanhamento contínuo.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/0NHcZTh')}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition duration-300 cursor-pointer ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-md'
                      : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Formalizar consulta avulsa</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </button>
              </div>
            </div>

            {/* MODALIDADE 2: Acompanhamento mensal */}
            <div className="bg-luxury-charcoal/90 border border-luxury-gold/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold font-semibold">
                    Modalidade 2
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> 30 dias
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white font-semibold mb-2">
                  Acompanhamento mensal
                </h3>

                <div className="text-xl font-mono text-luxury-gold-light font-bold mb-1">
                  4 atendimentos — R$ 420,00
                </div>

                <div className="text-xs text-zinc-400 font-mono mb-4">
                  Possibilidade de organização em 2 pagamentos de R$ 210,00.
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  Indicado para quem deseja iniciar ou manter um processo terapêutico com frequência semanal, favorecendo continuidade, vínculo e acompanhamento clínico ao longo do mês.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/Bf7QgxM')}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition duration-300 cursor-pointer ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-md'
                      : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Formalizar acompanhamento mensal</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </button>
              </div>
            </div>

            {/* MODALIDADE 3: Acompanhamento bimestral */}
            <div className="bg-luxury-charcoal/90 border border-luxury-gold/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold font-semibold">
                    Modalidade 3
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> 60 dias
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white font-semibold mb-2">
                  Acompanhamento bimestral
                </h3>

                <div className="text-xl font-mono text-luxury-gold-light font-bold mb-1">
                  8 atendimentos — R$ 740,00
                </div>

                <div className="text-xs text-zinc-400 font-mono mb-4">
                  Possibilidade de organização em 2x de R$ 370,00 ou 4x de R$ 185,00.
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  Indicado para quem deseja maior continuidade no acompanhamento, permitindo aprofundar a compreensão dos padrões emocionais, relacionais e comportamentais trabalhados no processo terapêutico.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/J1OGbSJ')}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition duration-300 cursor-pointer ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-md'
                      : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Formalizar acompanhamento bimestral</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </button>
              </div>
            </div>

            {/* MODALIDADE 4: Acompanhamento trimestral */}
            <div className="bg-luxury-charcoal/90 border border-luxury-gold/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold font-semibold">
                    Modalidade 4
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> 90 dias
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white font-semibold mb-2">
                  Acompanhamento trimestral
                </h3>

                <div className="text-xl font-mono text-luxury-gold-light font-bold mb-1">
                  12 atendimentos — R$ 960,00
                </div>

                <div className="text-xs text-zinc-400 font-mono mb-4">
                  Possibilidade de organização em 3 pagamentos de R$ 320,00.
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  Indicado para quem deseja estruturar um acompanhamento com maior regularidade ao longo de três meses, favorecendo continuidade clínica, construção de objetivos terapêuticos e desenvolvimento gradual de recursos psicológicos.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleFormalizationClick('https://pay.kiwify.com.br/59UayeX')}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition duration-300 cursor-pointer ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black hover:brightness-110 shadow-md'
                      : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Formalizar acompanhamento trimestral</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO 3: INFORMAÇÕES IMPORTANTES (CONTRATUAIS E ÉTICAS) */}
        <section className="bg-luxury-charcoal/70 border border-luxury-gold/20 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 text-luxury-gold shrink-0" />
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
        <section className="text-center bg-luxury-black/60 border border-luxury-gold/20 rounded-2xl p-8 mb-12">
          <HeartHandshake className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
          <h3 className="text-lg font-serif text-white font-semibold mb-2">
            Prefere alinhar antes de formalizar?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 font-light">
            Se você tiver dúvidas sobre horários, adequação da queixa ou funcionamento das sessões, sinta-se à vontade para enviar uma mensagem diretamente.
          </p>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg hover:brightness-110 transition"
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
