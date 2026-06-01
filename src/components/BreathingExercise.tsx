import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Heart, ShieldAlert, Sparkles, Wind } from 'lucide-react';

type BreatheState = 'idle' | 'inhale' | 'hold_full' | 'exhale' | 'hold_empty';

interface PhaseGuide {
  title: string;
  instruction: string;
  color: string;
  scale: number;
}

const PHASES: Record<BreatheState, PhaseGuide> = {
  idle: {
    title: "Respiração do Vago",
    instruction: "Pronto para acalmar seu sistema nervoso inflado?",
    color: "from-zinc-800 to-zinc-900 border-zinc-700",
    scale: 1,
  },
  inhale: {
    title: "Inale suavemente...",
    instruction: "Puxe o ar lentamente pelo nariz, enchendo o diafragma de oxigênio.",
    color: "from-luxury-gold/20 to-luxury-gold/5 border-luxury-gold/40 shadow-[0_0_30px_rgba(197,168,128,0.25)]",
    scale: 1.4,
  },
  hold_full: {
    title: "Segure o oxigênio...",
    instruction: "Apenas repouse e perceba o silêncio contido em seus pulmões.",
    color: "from-[#dfcaa7]/20 to-luxury-gold/10 border-luxury-gold/50 shadow-[0_0_40px_rgba(197,168,128,0.35)]",
    scale: 1.4,
  },
  exhale: {
    title: "Exale com classe...",
    instruction: "Solte o ar bem devagar pela boca, relaxando completamente os ombros.",
    color: "from-zinc-800/80 to-zinc-900 border-luxury-gold/20 shadow-[0_0_15px_rgba(197,168,128,0.1)]",
    scale: 0.85,
  },
  hold_empty: {
    title: "Aguarde sem ar...",
    instruction: "Permaneça nesse leve vazio estável antes do próximo ciclo.",
    color: "from-zinc-900 to-black border-white/5",
    scale: 0.85,
  },
};

export default function BreathingExercise() {
  const [exerciseState, setExerciseState] = useState<BreatheState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activePhase = PHASES[exerciseState];

  useEffect(() => {
    if (exerciseState === 'idle') {
      if (timerRef.current) clearInterval(timerRef.current);
      setSecondsLeft(4);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Progress to the next box breathing phase
          switch (exerciseState) {
            case 'inhale':
              setExerciseState('hold_full');
              return 4;
            case 'hold_full':
              setExerciseState('exhale');
              return 4;
            case 'exhale':
              setExerciseState('hold_empty');
              return 4;
            case 'hold_empty':
              setExerciseState('inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            default:
              return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exerciseState]);

  const handleStart = () => {
    setExerciseState('inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  const handleStop = () => {
    setExerciseState('idle');
  };

  const handleReset = () => {
    setExerciseState('idle');
    setTimeout(() => {
      setExerciseState('inhale');
      setSecondsLeft(4);
      setCyclesCompleted(0);
    }, 100);
  };

  return (
    <section 
      id="alivio"
      className="py-24 bg-luxury-charcoal relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-luxury-gold/2 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column description */}
        <div className="md:col-span-6 flex flex-col text-left">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Bônus Clínico</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
            Ansiedade ou aperto no peito neste momento? <span className="gold-gradient-text italic font-medium">Respire Conosco.</span>
          </h2>

          <p className="text-sm sm:text-base text-luxury-text-muted leading-relaxed font-sans font-light mb-8">
            Experimente a técnica de **Respiração Quadrada (Box Breathing)**, amplamente recomendada por terapeutas integrativos de 4ª geração e neurocientistas de elite. Esse exercício simples estimula o nervo vago e desliga a hipervigilância da amígdala cerebral em menos de 3 minutos.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-semibold font-mono flex items-center justify-center shrink-0">1</span>
              <p className="text-xs sm:text-sm text-zinc-300">Inale o ar calmamente durante 4 segundos.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-semibold font-mono flex items-center justify-center shrink-0">2</span>
              <p className="text-xs sm:text-sm text-zinc-300">Segure com os pulmões cheios por 4 segundos.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-semibold font-mono flex items-center justify-center shrink-0">3</span>
              <p className="text-xs sm:text-sm text-zinc-300">Exale longamente de maneira relaxada por 4 segundos.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-semibold font-mono flex items-center justify-center shrink-0">4</span>
              <p className="text-xs sm:text-sm text-zinc-300">Aguarde com o diafragma vazio por 4 segundos antes de recomeçar.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-luxury-gold bg-luxury-black/60 p-4 border border-luxury-gold/10 rounded-xl max-w-md">
            <Sparkles className="w-4 h-4 text-luxury-gold shrink-0" />
            <p className="leading-relaxed font-light">
              Este recurso representa o cuidado imediato e empático do consultório de Bruno para acolher você independentemente de onde você esteja.
            </p>
          </div>

          {/* Illustrative beach family photo representing relaxation */}
          <div className="mt-6 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] w-full max-w-md relative shadow-lg">
            <img 
              src="/media__1780328241113.jpg" 
              alt="Família na praia" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right column: Interactive interactive circle breathe indicator */}
        <div id="interactive-circle-container" className="md:col-span-6 flex flex-col items-center justify-center">
          
          <div className="relative w-full max-w-[420px] rounded-2xl bg-luxury-black/40 border border-luxury-gold/15 p-8 flex flex-col items-center justify-center min-h-[460px] shadow-2xl">
            
            {/* Ambient gold cycle status counter */}
            <div className="absolute top-6 left-6 text-xs text-luxury-text-muted">
              Ciclos Concluídos: <span className="text-luxury-gold font-mono font-semibold">{cyclesCompleted}</span>
            </div>

            {/* Breathing layout sphere */}
            <div className="h-64 flex items-center justify-center relative w-full mb-8">
              
              {/* Outer pulsing ring lines */}
              <AnimatePresence>
                {exerciseState !== 'idle' && (
                  <motion.div
                    key="breathing-ring"
                    className="absolute inset-0 rounded-full border border-luxury-gold/20"
                    animate={{
                      scale: [activePhase.scale - 0.1, activePhase.scale + 0.1, activePhase.scale - 0.1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Main Sphere containing values */}
              <motion.div
                id="breathing-sphere"
                className={`w-36 h-36 rounded-full bg-gradient-to-b border flex flex-col items-center justify-center transition-all duration-1000 ${activePhase.color}`}
                animate={{ scale: activePhase.scale }}
                transition={{ duration: 3.8, ease: "linear" }}
              >
                {exerciseState === 'idle' ? (
                  <Wind className="w-10 h-10 text-luxury-gold/75" />
                ) : (
                  <div className="flex flex-col items-center justify-center relative">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-luxury-gold">
                      {exerciseState === 'inhale' && 'Inale'}
                      {exerciseState === 'hold_full' && 'Segure'}
                      {exerciseState === 'exhale' && 'Exale'}
                      {exerciseState === 'hold_empty' && 'Aguarde'}
                    </span>
                    <span className="text-4xl font-serif font-semibold text-white mt-1 select-none font-mono">
                      {secondsLeft}s
                    </span>
                  </div>
                )}
              </motion.div>

            </div>

            {/* Instruction output texts */}
            <div className="text-center max-w-sm h-20 flex flex-col justify-center mb-6">
              <h3 className="text-lg font-serif text-white font-medium mb-1">
                {activePhase.title}
              </h3>
              <p className="text-xs text-luxury-text-muted leading-relaxed px-4 font-light">
                {activePhase.instruction}
              </p>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-4">
              {exerciseState === 'idle' ? (
                <button
                  id="activate-breathing"
                  onClick={handleStart}
                  className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Iniciar Relaxamento</span>
                </button>
              ) : (
                <>
                  <button
                    id="pause-breathing"
                    onClick={handleStop}
                    className="flex items-center gap-2 bg-luxury-charcoal hover:bg-zinc-800 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 rounded-full transition cursor-pointer"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </button>
                  <button
                    id="reset-breathing"
                    onClick={handleReset}
                    className="flex items-center justify-center bg-luxury-charcoal hover:bg-zinc-800 text-luxury-gold border border-luxury-gold/20 w-11 h-11 rounded-full transition cursor-pointer"
                    title="Recomeçar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
