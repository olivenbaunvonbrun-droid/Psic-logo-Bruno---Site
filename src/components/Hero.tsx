import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, MessageSquareHeart, CheckCircle, ArrowDown } from 'lucide-react';

export default function Hero() {
  const [heroError, setHeroError] = useState(false);
  
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Olá, Bruno! Acessei seu site e gostaria de agendar uma consulta inicial para cuidar da minha saúde emocional."
    );
    window.open(`https://wa.me/5521975249514?text=${text}`, '_blank');
  };

  return (
    <section 
      id="hero-root"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-radial from-luxury-charcoal to-luxury-black"
    >
      {/* Background ambient gold lights */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative vertical lines representing clean architectural columns of premium office */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:100px_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="md:col-span-6 flex flex-col items-start text-left">
          
          <motion.div 
            id="hero-tagline-badge"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-[10px] sm:text-xs tracking-widest text-[#dfcaa7] font-sans font-medium uppercase mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>TCC de 4ª Geração & Neurociência Comportamental</span>
          </motion.div>

          <motion.h1 
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Seu cansaço não é preguiça. E esse <span className="gold-gradient-text italic font-medium">aperto no peito</span> não precisa ser o seu normal.
          </motion.h1>

          <motion.p 
            id="hero-description"
            className="text-sm sm:text-base md:text-lg text-luxury-text-muted leading-relaxed font-sans font-light max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Você não precisa segurar o peso do mundo sozinho, fingindo força enquanto desmorona em silêncio por dentro. Sou Bruno de Oliveira, psicólogo e terapeuta. Estou aqui para te oferecer um espaço seguro de escuta atenta, pautado pela ciência e pelo respeito absoluto à sua história, para que você possa finalmente respirar em paz.
          </motion.p>

          {/* Quick value props */}
          <motion.div 
            id="hero-features"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Acolhimento da sua Dor</h4>
                <p className="text-xs text-luxury-text-muted mt-0.5">Um refúgio seguro onde você não precisa usar máscaras nem fingir que está bem.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Ciência com Alma</h4>
                <p className="text-xs text-luxury-text-muted mt-0.5">O melhor da TCC de última geração e neurociência focados no alívio do sofrimento.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Sessões Online Privadas</h4>
                <p className="text-xs text-luxury-text-muted mt-0.5">Terapia de onde você estiver, por chamada criptografada com sigilo absoluto.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Inscrição Profissional Ativa</h4>
                <p className="text-xs text-luxury-text-muted mt-0.5">Bruno de Oliveira Lima, cadastrado sob o número de registro CRP 05/75885.</p>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            id="hero-actions"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              id="hero-whatsapp-btn"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-sm uppercase tracking-wider px-8 py-4.5 rounded-full shadow-lg hover:shadow-luxury-gold/20 active:scale-95 transition cursor-pointer"
            >
              <MessageSquareHeart className="w-5 h-5" />
              <span>Retomar o controle da minha vida</span>
            </button>
            
            <a
              href="#terapeuta"
              id="hero-about-btn"
              className="flex items-center justify-center gap-2 border border-luxury-gold/30 hover:border-luxury-gold/70 text-luxury-gold-light hover:text-white px-8 py-4.5 rounded-full text-sm font-semibold uppercase tracking-wider transition"
            >
              <span>Conhecer o Terapeuta</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>

        </div>

        {/* Right Column: Replicating the Visual Identity exactly matching the photos */}
        <div className="md:col-span-6 flex justify-center items-center">
          <motion.div
            id="hero-portrait-card"
            className="w-full max-w-[480px] rounded-2xl relative overflow-hidden bg-luxury-charcoal/40 border border-luxury-gold/20 p-5 shadow-2xl flex flex-col gap-6"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top gold decor lines mimicking classic architectural styling arches */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
            
            {/* The Psychologist Frame: stylized depiction with dark elegant layout mimicking the first images */}
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#1c1c20] to-[#0c0c0d] border border-white/[0.05] group flex flex-col justify-end items-center">
              
              <img 
                src={heroError ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=750" : "/media__1780315858307.jpg"} 
                alt="Bruno de Oliveira - Psicólogo Clínico" 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition duration-700 pointer-events-none"
                onError={() => setHeroError(true)}
                referrerPolicy="no-referrer"
              />
              
              {/* Radial warm lighting overlay (only on fallback) */}
              {heroError && (
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent pointer-events-none" />
              )}

              {/* Overlay elements only shown if the custom branded picture fails to load */}
              {heroError && (
                <div className="relative z-10 w-[90%] mb-4 bg-luxury-black/90 p-4 rounded-lg border border-luxury-gold/20 backdrop-blur-md flex flex-col items-center shadow-lg">
                  
                  {/* Gold Psi Mandala exactly representing the penult picture */}
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/50 flex items-center justify-center bg-[#07090f] relative overflow-hidden shadow-inner">
                    <img 
                      src="/media__1779535801913.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain p-0.5"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Elegant names */}
                  <h3 className="font-serif italic text-base text-white font-semibold mt-2.5 leading-none">
                    Bruno de Oliveira
                  </h3>
                  <p className="text-[10px] sm:text-xs text-luxury-gold-light tracking-widest font-sans font-medium uppercase mt-1">
                    PSICÓLOGO | CRP 05/75885
                  </p>
                  <p className="text-[10px] font-mono text-luxury-text-muted mt-1.5 opacity-80">
                    (21) 97524-9514
                  </p>
                </div>
              )}

              {/* Visual sign with physical telephone to highlight real life representation */}
              <span className="absolute top-3 left-3 bg-[#111]/90 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Sessões Disponíveis
              </span>
            </div>

            {/* Extra details corresponding to the luxury style of the therapist */}
            <div className="flex justify-between items-center bg-luxury-charcoal/80 p-3 rounded-xl border border-luxury-gold/5 text-center">
              <div className="flex-1 border-r border-white/5">
                <p className="text-[10px] text-luxury-text-muted tracking-wider uppercase font-sans">Abordagem</p>
                <p className="text-xs text-white font-semibold mt-1">TCC Integrativa</p>
              </div>
              <div className="flex-1 border-r border-white/5">
                <p className="text-[10px] text-luxury-text-muted tracking-wider uppercase font-sans">Público</p>
                <p className="text-xs text-white font-semibold mt-1">Adulto e Jovem</p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-luxury-text-muted tracking-wider uppercase font-sans">Formato</p>
                <p className="text-xs text-luxury-gold-light font-semibold mt-1">Atendimento Online</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Elegant scroll down decor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition cursor-pointer">
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-luxury-gold-light">Saiba Mais</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-luxury-gold to-transparent" />
      </div>

    </section>
  );
}
