import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Award, Shield, CheckCircle, GraduationCap, Users } from 'lucide-react';

export default function AboutTherapist() {
  const [photoError, setPhotoError] = useState(false);
  const specializedTags = [
    "Acompanhamento Psicológico",
    "Desenvolvimento Pessoal",
    "Inteligência Emocional",
    "Inteligência socioemocional",
    "Psicologia do Esporte",
    "Tratamento de Traumas",
    "Superação de Tristeza",
    "Lidar com Medos & Fobias",
    "Alterações de Humor",
    "Superar Dependência Emocional",
    "Aumento de Autoestima"
  ];

  const credentials = [
    { title: "Formação em Neurociências", school: "Investigação dos padrões cerebrais e de sinapses físicas" },
    { title: "Especialista em TCC de 4ª Geração", school: "Flexibilidade psicológica, ACT e Atenção Plena integrados" },
    { title: "Abordagem Psicanalítica e Humanista", school: "Ressignificação profunda de traumas de infância" },
    { title: "Atendimento em Conformidade com o CFP", school: "Cadastro regularizado no e-Psi para sessões online nacionais e internacionais" }
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Olá, Bruno! Estava lendo sua biografia profissional e gostaria de agendar um horário com você."
    );
    const url = `https://wa.me/5521975249514?text=${text}`;
    if ((window as any).triggerWhatsAppModal) {
      (window as any).triggerWhatsAppModal(url, "about");
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section 
      id="terapeuta"
      className="py-24 bg-luxury-black relative overflow-hidden"
    >
      {/* Visual top border styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column (Luxury Badge / Illustration Frame / Photo Layout) */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div 
            id="therapist-biography-card"
            className="w-full max-w-[390px] rounded-2xl relative overflow-hidden bg-luxury-charcoal/30 border border-luxury-gold/15 p-6 shadow-2xl flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* The circular portrait container replicating profile layout */}
            <div className="relative w-44 h-44 rounded-full border-2 border-luxury-gold/40 mx-auto overflow-hidden bg-gradient-to-b from-[#1b1b1e] to-luxury-black p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-luxury-black relative flex items-center justify-center">
                {/* Real photo representing Bruno */}
                <img 
                  src={photoError ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400" : "/media__1780322063258.jpg"} 
                  alt="Bruno de Oliveira"
                  className="w-full h-full object-cover scale-[1.6] origin-[center_35%]"
                  onError={() => setPhotoError(true)}
                  referrerPolicy="no-referrer"
                />
                
                {/* Warm orange radial lighting and overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15)_0%,transparent_70%)] pointer-events-none" />

                {/* Real-life circular watermark symbol */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-luxury-charcoal border border-luxury-gold/20 text-[#dfcaa7] rounded-full px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase shadow">
                  e-Psi CFP
                </div>
              </div>
            </div>

            {/* Quick Consultation Badge matching PsyMeet info details text */}
            <div className="text-center">
              <span className="text-[10px] font-sans text-luxury-gold uppercase tracking-[0.25em] font-bold">Inscrição Profissional</span>
              <h3 className="text-xl font-serif text-white font-semibold mt-1">Bruno de Oliveira Lima</h3>
              <p className="text-xs text-luxury-gold-light mt-0.5 font-medium tracking-wide">Psicólogo Clínico Integrativo</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">CRP: 05/75885</p>
            </div>

            {/* Structured details mapping tags from platform */}
            <div className="border-t border-white/[0.05] pt-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-luxury-text-muted">Método Predominante:</span>
                <span className="text-white font-semibold">TCC 4ª Geração</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-luxury-text-muted">Público Alvo:</span>
                <span className="text-white font-semibold">Adolescentes • Adultos</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-luxury-text-muted">Formato de Sessão:</span>
                <span className="text-[#dfcaa7] font-semibold">Online (Plataforma Segura)</span>
              </div>
            </div>

            {/* Active ethical certification notice */}
            <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 text-[10px] text-emerald-400 flex items-center gap-2 justify-center leading-relaxed">
              <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Cadastro e-Psi Ativo para Atendimento Online</span>
            </div>

          </motion.div>
        </div>

        {/* Right Column: Bio Narrative copy & specialized tags (7 columns) */}
        <div className="md:col-span-7 text-left flex flex-col items-start justify-center">
          
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Sobre o Psicoterapeuta</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8">
            A dor não precisa ser um caminho solitário. Permita-me <span className="gold-gradient-text italic font-medium">caminhar ao seu lado.</span>
          </h2>

          <div className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light flex flex-col gap-6 mb-8 max-w-2xl">
            <p>
              "Acredito que a terapia não deve ser um processo frio, distante ou mecânico. Sou especialista em TCC integrativa porque entendo que a mente e o corpo estão intimamente interligados, precisando de respostas concretas baseadas na neurociência para reorganizar sinapses físicas e aliviar os desgastes emocionais."
            </p>
            <p>
              "Eu sei o que é ver a ansiedade paralisar, a exaustão apagar o brilho da vida e a culpa tornar a autocobrança um chicote silencioso. Minha missão de vida não é julgar ou enquadrar você em gavetas teóricas, mas sim estender a mão para construir respostas práticas de autonomia emocional e bem-estar."
            </p>
          </div>

          {/* Training list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {credentials.map((cred, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-luxury-charcoal/30 p-4 rounded-xl border border-white/5">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-serif text-white font-semibold leading-normal">{cred.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 font-light leading-normal">{cred.school}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Specializations list tags */}
          <div className="w-full flex flex-col gap-4">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-luxury-gold/80 font-bold">Campos Clínicos de Atuação</h4>
            <div className="flex flex-wrap gap-2">
              {specializedTags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-luxury-charcoal text-zinc-300 text-xs font-sans border border-white/5 hover:border-luxury-gold/30 hover:text-white transition duration-300 select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Direct CTA button to book with Bruno */}
          <button
            id="about-me-whatsapp-btn"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full mt-10 transition hover:brightness-110 active:scale-95 shadow-lg shadow-luxury-gold/10 cursor-pointer"
          >
            <span>Voltar a ser protagonista da minha história</span>
          </button>

        </div>

      </div>
    </section>
  );
}
