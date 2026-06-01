import React from 'react';
import { motion } from 'motion/react';
import { Brain, HeartHandshake, Compass, Eye, Sparkles } from 'lucide-react';

export default function Approach() {
  const pillars = [
    {
      icon: <Brain className="w-8 h-8 text-luxury-gold" />,
      title: "TCC de 4ª Geração",
      subtitle: "Flexibilidade Cognitiva e Aceitação Clinicamente Amparada",
      desc: "Diferente das abordagens antigas que travavam combates diretos e extenuantes contra pensamentos negativos, a 4ª geração da TCC trabalha a desfusão celular e intelectual das crenças ruins. Integramos ferramentas de Atenção Plena e Terapia de Aceitação e Compromisso (ACT) para te ensinar a observar o sofrimento de longe, sem se diluir nele.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-luxury-gold" />,
      title: "Humanismo & Compaixão",
      subtitle: "Olhar Incondicionalmente Seguro e Horizontalizado",
      desc: "Nenhum ser humano pode ser enquadrado puramente sob rótulos ou listas estéreis de sintomas. No consultório de Bruno, a sua vivência é respeitada com máxima dignidade e empatia absoluta. Acolhemos a dor com a elegância de quem entende que sofrer é parte do destino compartilhado do mundo.",
    },
    {
      icon: <Compass className="w-8 h-8 text-luxury-gold" />,
      title: "Descoberta de Valores Reais",
      subtitle: "Navegando em Direção a uma Vida com Sentido Próprio",
      desc: "Não buscamos apenas 'remediar' ou estabilizar seu humor, mas te ajudar a responder de maneira robusta: quais são seus valores mais caros? O que te acorda de manhã? Te auxiliamos a edificar hábitos vivos enraizados no que de fato faz seu coração bater de orgulho e clareza.",
    },
    {
      icon: <Eye className="w-8 h-8 text-luxury-gold" />,
      title: "Cicatrizes Transgeracionais",
      subtitle: "Integração Com a Profundidade Psicanalítica",
      desc: "Para que a TCC de 4ª geração opere com total eficácia, visitamos as feridas da infância e as defesas construídas no passado traumático. Emprestamos a profundidade psicanalítica para compreender a raiz das suas armaduras emocionais, permitindo uma ressignificação integrada de verdade.",
    }
  ];

  return (
    <section 
      id="abordagem"
      className="py-24 bg-luxury-charcoal relative overflow-hidden text-center"
    >
      {/* Decorative vertical divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-luxury-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Metodologia Exclusiva</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            A convergência ideal entre <span className="gold-gradient-text italic">rigor científico</span> e acolhimento humano.
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base text-luxury-text-muted leading-relaxed font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            O psicólogo Bruno de Oliveira atua amparado na psicoterapia integrativa. Isso significa que escolhemos e lapidamos as melhores ferramentas das neurociências mundiais especificamente para o formato da sua dor psicológica.
          </motion.p>
        </div>

        {/* Pillars Layout (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              id={`pillar-card-${idx}`}
              className="bg-luxury-black/50 hover:bg-luxury-black/90 p-8 rounded-2xl border border-luxury-gold/5 hover:border-luxury-gold/20 transition-all duration-500 flex flex-col sm:flex-row gap-6 relative group shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Pillar top golden glowing corner accent */}
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-luxury-gold/30 to-transparent group-hover:w-24 transition-all duration-500" />
              <div className="absolute top-0 right-0 h-16 w-[1px] bg-gradient-to-b from-luxury-gold/30 to-transparent group-hover:h-24 transition-all duration-500" />

              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-luxury-charcoal border border-luxury-gold/10 group-hover:border-luxury-gold/40 transition duration-300">
                {pillar.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-serif text-white tracking-tight group-hover:text-luxury-gold-light transition duration-300">
                  {pillar.title}
                </h3>
                <span className="text-xs font-sans text-luxury-gold-dark font-semibold tracking-wide">
                  {pillar.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light mt-2">
                  {pillar.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Clinical Framework highlight */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-luxury-black/80 via-luxury-charcoal/80 to-luxury-black/80 p-8 rounded-2xl border border-luxury-gold/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-left flex-1">
            <h4 className="text-lg font-serif text-white font-semibold">"Carrego comigo a convicção de que a minha missão profissional é diminuir o sofrimento no mundo."</h4>
            <p className="text-xs text-luxury-gold/70 font-mono mt-1 uppercase tracking-widest">— Bruno de Oliveira Lima, CRP 05/75885</p>
          </div>
          
          <div className="w-full md:w-44 h-24 rounded-xl overflow-hidden border border-white/10 shrink-0 relative shadow-md">
            <img 
              src="/media__1780328241087.jpg" 
              alt="Relação Saudável" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <a
            href="#alivio"
            className="shrink-0 bg-transparent hover:bg-luxury-gold border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold hover:text-luxury-black px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center"
          >
            Ver Exercício Prático
          </a>
        </motion.div>

      </div>
    </section>
  );
}
