import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { MessageSquareQuote, Star, Check, Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section 
      id="depoimentos"
      className="py-24 bg-luxury-black relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-luxury-gold/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header section titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquareQuote className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Relatos de Transformidade</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
            Histórias de <span className="gold-gradient-text italic font-medium">superação e regulação</span> emocional de quem vivenciou.
          </h2>

          <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light">
            Entenda como homens e mulheres ressignificaram dores limitantes em suas carreiras, casamentos e autoimagem sob a facilitação terapêutica integrativa de Bruno de Oliveira.
          </p>
        </div>

        {/* Testimonials Layout (Cards) */}
        <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              className="bg-luxury-charcoal/40 hover:bg-luxury-charcoal/80 border border-luxury-gold/5 hover:border-luxury-gold/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 relative shadow-xl min-h-[420px] group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Background radial gold glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,168,128,0.03)_0%,transparent_60%)] pointer-events-none" />

              <div>
                {/* Visual Stars & Decorative Quote icon combo */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-8 h-8 text-luxury-gold-dark/20 group-hover:text-luxury-gold/40 transition duration-300" />
                </div>

                {/* Testimonial Copy */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light italic mb-8">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Patient Meta and the clinical outcome highlights */}
              <div>
                {/* Milestone transformation box */}
                <div className="mt-4 mb-5 p-3 rounded-xl bg-luxury-black/60 border border-luxury-gold/10 flex items-start gap-2 text-left">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-sans text-luxury-gold font-bold uppercase tracking-wider block">Maior Conquista Clínica</span>
                    <span className="text-xs text-[#dfcaa7] italic leading-tight font-light">{testimonial.outcome}</span>
                  </div>
                </div>

                {/* Patient Signature */}
                <div className="flex items-center gap-3 border-t border-white/[0.05] pt-4 text-left">
                  <div className="w-9 h-9 rounded-full bg-luxury-charcoal border border-luxury-gold/20 flex items-center justify-center font-serif text-sm font-semibold text-luxury-gold-light select-none">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-semibold text-white leading-none">{testimonial.name}</h4>
                    <span className="text-[10px] text-luxury-text-muted mt-1 block">
                      {testimonial.age && `${testimonial.age} anos, `}{testimonial.role || 'Paciente'}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Informative CFP Ethic Note */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] text-zinc-500 font-sans leading-relaxed tracking-wider max-w-2xl mx-auto">
            *Nota ética: Os relatos contidos acima refletem as experiências individuais relatadas livremente pelos pacientes reais e foram devidamente autorizados. Para preservar o absoluto sigilo e privacidade necessários ao exercício clínico do CFP, determinados nomes e detalhes específicos foram sutilmente alterados.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
