import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ASSESSMENT_QUESTIONS } from '../data';
import { ClipboardList, ArrowRight, RotateCcw, MessageCircleCode, CheckSquare, Sparkles } from 'lucide-react';

export default function SelfAssessment() {
  const [currentStep, setCurrentStep] = useState(0); // 0 corresponds to introductory slide
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (category: string, score: number) => {
    // Add score to registry
    setScores((prev) => ({ ...prev, [category]: (prev[category] || 0) + score }));
    setTotalScore((t) => t + score);

    // Transition directly or complete
    if (currentStep < ASSESSMENT_QUESTIONS.length) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleNextFromIntro = () => {
    setCurrentStep(1);
    setScores({});
    setTotalScore(0);
    setIsCompleted(false);
  };

  const restartAssessment = () => {
    setCurrentStep(0);
    setScores({});
    setTotalScore(0);
    setIsCompleted(false);
  };

  const getResultCategory = () => {
    if (totalScore <= 6) return 'sutil';
    if (totalScore <= 13) return 'moderado';
    return 'elevado';
  };

  const resultDetails = {
    sutil: {
      title: "Desgaste Emocional Sutil",
      badge: "Estável",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      desc: "Os resultados sugerem que você está conseguindo manter o equilíbrio psicológico diante dos estresses cotidianos. Há oscilações normais da vida, mas com bom patamar de autonomia interna.",
      advice: "Melhore o autocuidado mantendo rituais de sono regulares, limites claros entre lazer e trabalho, e praticando meditações periódicas.",
      whatsappMsg: "Olá, Bruno! Concluí a autoavaliação do seu site e obtive nível 'Sutil/Estável' (pontuação: totalScore). Gostaria de agendar uma sessão preventiva para manter meu autodesenvolvimento em foco!"
    },
    moderado: {
      title: "Carga Emocional Moderada (Alerta)",
      badge: "Alerta",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/5",
      desc: "Percebe-se que as pressões acumuladas (excesso de ansiedade, autocobrança insistente ou dependência sutil das circunstâncias) estão consumindo sua energia vital. Há sinais de piloto automático e desgaste silencioso.",
      advice: "Este é o momento ideal para iniciar a psicoterapia. Evite postergar até que isso se transforme em um esgotamento crônico ou distúrbio de pânico.",
      whatsappMsg: "Olá, Bruno! Concluí a autoavaliação do seu site e obtive nível 'Moderado/Alerta'. Identifiquei desgastes na minha rotina e gostaria de agendar uma sessão de psicoterapia para organizar esses pontos."
    },
    elevado: {
      title: "Balanço Emocional Sobrecarregado",
      badge: "Crítico",
      color: "border-rose-500/30 text-rose-400 bg-rose-500/5",
      desc: "Seu sistema nervoso está emitindo alertas nítidos de exaustão e sofrimento crítico. O peso da ansiedade persistente, os vazios emocionais recorrentes ou a autossabotagem crônica estão travando o seu desenvolvimento e bem-estar habitual.",
      advice: "Buscar acompanhamento terapêutico especializado não é sinal de fraqueza, mas um ato de coragem e autocuidado com sua própria dignidade. Bruno oferece suporte de acolhimento excelente focado nessa regulação.",
      whatsappMsg: "Olá, Bruno! Concluí a autoavaliação do seu site e obtive resultado 'Sobrecarregado/Crítico'. Gostaria de iniciar meu processo de psicoterapia integrativa com você o quanto antes."
    }
  }[getResultCategory()];

  const handleWhatsAppResult = () => {
    const textToSend = resultDetails.whatsappMsg.replace('totalScore', String(totalScore));
    const cleanUrl = `https://wa.me/5521975249514?text=${encodeURIComponent(textToSend)}`;
    if ((window as any).triggerWhatsAppModal) {
      (window as any).triggerWhatsAppModal(cleanUrl, "assessment");
    } else {
      window.open(cleanUrl, '_blank');
    }
  };

  const activeQuestion = ASSESSMENT_QUESTIONS[currentStep - 1];

  return (
    <section 
      id="avaliacao"
      className="py-24 bg-luxury-black relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-luxury-gold/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Autoavaliação Clínica</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Como está a sua <span className="gold-gradient-text italic">Saúde Emocional</span> hoje?
          </h2>

          <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light">
            Responda honestamente a 5 perguntas rápidas de auto-acolhimento baseadas em triagens psicológicas de rotina e receba um direcionamento inicial reflexivo.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-luxury-charcoal/40 border border-luxury-gold/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* Step 0: Introductory Panel */}
            {currentStep === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center">
                  <CheckSquare className="w-8 h-8 text-luxury-gold" />
                </div>
                
                <div className="max-w-md">
                  <h3 className="text-xl font-serif text-white font-medium mb-2">Instrumento de Triagem Reflexivo</h3>
                  <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-light">
                    Este teste rápido não constitui um diagnóstico clínico definitivo, mas ajuda você a identificar padrões de ansiedade, dependência afetiva e autossustentabilidade a fim de compreender suas fendas de rotina.
                  </p>
                </div>

                <button
                  id="start-assessment"
                  onClick={handleNextFromIntro}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full shadow-lg transition cursor-pointer"
                >
                  <span>Iniciar Avaliação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-zinc-500 font-sans tracking-tight">Tempo estimado: 1 minuto • Sem dados coletados</span>
              </motion.div>
            )}

            {/* Questions Step */}
            {currentStep > 0 && currentStep <= ASSESSMENT_QUESTIONS.length && activeQuestion && (
              <motion.div
                key={`question-${activeQuestion.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 text-left"
              >
                {/* Progress Indicator */}
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                  <span className="text-[10px] font-sans tracking-widest text-[#dfcaa7] font-semibold uppercase">
                    Etapa {currentStep} de {ASSESSMENT_QUESTIONS.length}
                  </span>
                  <div className="w-32 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="bg-luxury-gold h-full transition-all duration-300"
                      style={{ width: `${(currentStep / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question core text */}
                <h3 className="text-lg sm:text-xl font-serif text-white leading-relaxed font-medium">
                  {activeQuestion.text}
                </h3>

                {/* Options mapping */}
                <div className="flex flex-col gap-3.5 mt-2">
                  {activeQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      id={`opt-btn-${currentStep}-${idx}`}
                      onClick={() => handleSelectOption(activeQuestion.category, option.score)}
                      className="w-full text-left p-4 rounded-xl border border-white/5 bg-luxury-black/30 hover:bg-luxury-charcoal hover:border-luxury-gold/40 text-xs sm:text-sm text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step Complete: Results Slide */}
            {currentStep > ASSESSMENT_QUESTIONS.length && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center gap-6"
              >
                <span className={`px-4 py-1.5 rounded-full border text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${resultDetails.color}`}>
                  Resultado: {resultDetails.badge}
                </span>

                <div className="max-w-xl">
                  <h3 className="text-2xl font-serif text-white font-medium mb-3">
                    {resultDetails.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-4">
                    {resultDetails.desc}
                  </p>
                  
                  {/* Immediate Recommendation */}
                  <div className="bg-luxury-black p-4 rounded-xl border border-luxury-gold/10 text-xs text-luxury-text-muted leading-relaxed font-light flex items-start gap-3 text-left">
                    <Sparkles className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block mb-0.5">Direcionamento Reconfortante</span>
                      {resultDetails.advice}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                  <button
                    id="whatsapp-share-results"
                    onClick={handleWhatsAppResult}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-wider px-6 py-4 rounded-full shadow-lg transition cursor-pointer"
                  >
                    <span>Parar de adiar minha felicidade</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="restart-assessment"
                    onClick={restartAssessment}
                    className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 text-luxury-text-muted hover:text-white px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refazer Avaliação</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
