import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section 
      id="duvidas"
      className="py-24 bg-luxury-charcoal relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/2 w-96 h-96 bg-luxury-gold/2 rounded-full blur-[90px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium font-sans">Esclarecimentos Éticos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
            Dúvidas Frequentes sobre a <span className="gold-gradient-text italic">Psicoterapia Online</span>
          </h2>

          <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light">
            Entenda detalhadamente cada detalhe técnico e ético do tratamento antes de iniciar sua primeira sessão com Bruno de Oliveira Lima.
          </p>
        </div>

        {/* Accoridon panels links mapping */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                id={`faq-bar-${idx}`}
                className="bg-luxury-black/40 border border-white/5 rounded-2xl overflow-hidden transition duration-300"
              >
                
                {/* Trigger heading click */}
                <button
                  type="button"
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-luxury-black/80 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-luxury-charcoal border border-luxury-gold/20 text-[#dfcaa7] rounded px-2 py-0.5 font-mono uppercase">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-semibold text-white tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-luxury-gold-light shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 border-t border-white/[0.03] text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light bg-luxury-charcoal/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Extra contact request */}
        <div className="mt-12 text-center text-xs text-luxury-text-muted flex items-center justify-center gap-2">
          <span>Ainda possui alguma dúvida não listada?</span>
          <a
            href="#planejador-agendamento"
            className="text-luxury-gold hover:text-[#dfcaa7] font-semibold underline underline-offset-4"
          >
            Chame Bruno diretamente no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
