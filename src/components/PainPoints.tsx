import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PAIN_POINTS } from '../data';
import { 
  BrainCircuit, 
  CloudRain, 
  HeartCrack, 
  Users, 
  ShieldAlert, 
  ChevronDown, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-luxury-gold" />,
  CloudRain: <CloudRain className="w-6 h-6 text-luxury-gold" />,
  HeartCrack: <HeartCrack className="w-6 h-6 text-luxury-gold" />,
  Users: <Users className="w-6 h-6 text-luxury-gold" />,
  ShieldAlert: <ShieldCheckWrapper /> // Custom fallback for ShieldAlert
};

function ShieldCheckWrapper() {
  return <ShieldAlert className="w-6 h-6 text-luxury-gold" />;
}

export default function PainPoints() {
  const [selectedId, setSelectedId] = useState<string | null>('anxiety');

  const handleWhatsAppConsult = (title: string) => {
    const text = encodeURIComponent(
      `Olá, Bruno! Estava lendo sobre "${title}" no seu site e me identifiquei muito com a descrição das dores. Gostaria de agendar uma consulta para trabalharmos nisso.`
    );
    window.open(`https://wa.me/5521975249514?text=${text}`, '_blank');
  };

  return (
    <section 
      id="dores"
      className="py-24 bg-luxury-black relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-luxury-gold/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-luxury-gold-light" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Auto-Acolhimento</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
            Você se reconhece em <span className="gold-gradient-text italic">algum destes sentimentos</span> habituais?
          </h2>

          <p className="text-sm sm:text-base text-luxury-text-muted leading-relaxed font-sans font-light">
            Viver com sobrecarga emocional cansa o corpo e adoece a alma. Explore abaixo as demandas mais comuns que tratamos em consultório sob um viés integrativo, científico e gentil.
          </p>
        </div>

        {/* Dynamic Split Layout: Selector on Left, Highly-detailed Interactive Card on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Selector panel (Left 5 columns) */}
          <div id="pain-selectors-list" className="md:col-span-5 flex flex-col gap-4">
            {PAIN_POINTS.map((pain) => {
              const isSelected = selectedId === pain.id;
              return (
                <button
                  key={pain.id}
                  id={`pain-tab-${pain.id}`}
                  onClick={() => setSelectedId(pain.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected 
                      ? 'bg-luxury-charcoal border-luxury-gold/50 shadow-md translate-x-2' 
                      : 'bg-luxury-charcoal/20 border-white/[0.03] hover:border-luxury-gold/20 hover:bg-luxury-charcoal/40'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={`p-2.5 rounded-lg border transition duration-300 shrink-0 ${
                      isSelected ? 'bg-luxury-black border-luxury-gold/30' : 'bg-luxury-black/30 border-white/5'
                    }`}>
                      {iconMap[pain.iconName] || <BrainCircuit className="w-5 h-5 text-luxury-gold" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-sm sm:text-base font-serif font-semibold tracking-tight transition duration-300 truncate ${
                        isSelected ? 'text-luxury-gold-light' : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        {pain.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-luxury-text-muted font-light mt-0.5 truncate">
                        {pain.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-luxury-text-muted transition duration-300 hidden md:block ${
                    isSelected ? 'text-luxury-gold -rotate-90' : 'group-hover:text-white'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Details Content Display (Right 7 columns) */}
          <div className="md:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {PAIN_POINTS.map((pain) => {
                if (pain.id !== selectedId) return null;
                return (
                  <motion.div
                    key={pain.id}
                    id={`pain-details-card-${pain.id}`}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-gradient-to-b from-luxury-charcoal to-luxury-black border border-luxury-gold/20 rounded-2xl p-6 sm:p-8 relative shadow-xl flex flex-col gap-6"
                  >
                    {/* Glowing gold back light marker */}
                    <div className="absolute top-6 right-6 w-20 h-20 bg-luxury-gold/5 rounded-full blur-xl pointer-events-none" />

                    <div className="flex items-center gap-3 pb-4 border-b border-white/[0.05]">
                      <div className="w-12 h-12 rounded-xl bg-luxury-charcoal border border-luxury-gold/30 flex items-center justify-center">
                        {iconMap[pain.iconName]}
                      </div>
                      <div>
                        <span className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">Demandas Comuns</span>
                        <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">{pain.title}</h3>
                      </div>
                    </div>

                    {/* Suffer insight */}
                    <div>
                      <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#dfcaa7] font-semibold mb-2">O Que Você costuma Sentir</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light">
                        {pain.mainPain}
                      </p>
                    </div>

                    {/* The raw unconscious pain */}
                    <div className="bg-luxury-charcoal/50 p-4 rounded-xl border-l-[3px] border-luxury-gold">
                      <h4 className="text-[10px] font-sans uppercase tracking-widest text-luxury-gold-light font-semibold mb-1">A Raiz Invisível</h4>
                      <p className="text-xs text-luxury-text-muted italic leading-relaxed">
                        "{pain.subconsciousMessage}"
                      </p>
                    </div>

                    {/* Integrated mechanism */}
                    <div>
                      <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#dfcaa7] font-semibold mb-2">Abordagem de Bruno</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light">
                        {pain.approach}
                      </p>
                    </div>

                    {/* Temporary immediate clinical advice */}
                    <div className="bg-luxury-gold/5 p-4 rounded-xl border border-luxury-gold/10">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                        <h4 className="text-[10px] font-sans uppercase tracking-widest text-luxury-gold-light font-semibold">Exercício de Bolso Recomendado</h4>
                      </div>
                      <p className="text-xs text-luxury-text-muted leading-relaxed font-light">
                        {pain.advice}
                      </p>
                    </div>

                    {/* Connect directly on WhatsApp with context */}
                    <button
                      id={`whatsapp-consult-btn-${pain.id}`}
                      onClick={() => handleWhatsAppConsult(pain.title)}
                      className="w-full sm:w-auto self-start mt-4 flex items-center justify-center gap-2 bg-luxury-charcoal hover:bg-luxury-gold-dark text-white hover:text-luxury-black border border-luxury-gold/30 hover:border-luxury-gold px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    >
                      <span>Retomar o Controle</span>
                      <ArrowRight className="w-3.5 h-3.5 text-luxury-gold group-hover:text-luxury-black" />
                    </button>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
