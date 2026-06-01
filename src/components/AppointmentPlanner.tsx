import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Check, Send, Sparkles, User, HelpCircle, Clock, MapPin } from 'lucide-react';

export default function AppointmentPlanner() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [mainConcern, setMainConcern] = useState('Ansiedade ou Angústia constante');
  const [preferredTime, setPreferredTime] = useState('Tarde (12h às 18h)');
  const [isCopied, setIsCopied] = useState(false);

  const concerns = [
    'Ansiedade ou Angústia constante',
    'Baixa Autoestima & Autocobrança crônica',
    'Traumas & Feridas do Passado',
    'Dependência Emocional ou Solidão',
    'Desenvolvimento Pessoal e Inteligência Emocional'
  ];

  const times = [
    'Manhã (08h às 12h)',
    'Tarde (12h às 18h)',
    'Noite (18h às 21h)'
  ];

  const generateDraftText = () => {
    const fallbackName = name ? name.trim() : 'Visitante do Site';
    const ageText = age.trim() ? `, tenho ${age.trim()} anos` : '';
    const locationText = stateLocation.trim() ? ` e falo de ${stateLocation.trim()}` : '';
    return `Olá, Bruno de Oliveira! Meu nome é ${fallbackName}${ageText}${locationText}. Estava lendo seus recursos no seu site e gostaria de agendar uma consulta psicoterapêutica para tratar sobre "${mainConcern}". Tenho maior flexibilidade de horários no período da ${preferredTime}. Como podemos dar o próximo passo?`;
  };

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(generateDraftText());
    window.open(`https://wa.me/5521975249514?text=${message}`, '_blank');
  };

  return (
    <section 
      id="planejador-agendamento"
      className="py-24 bg-luxury-charcoal relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-luxury-gold/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column explanation */}
        <div className="md:col-span-5 flex flex-col text-left">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-medium">Fluxo Facilitado</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight mb-6">
            Dê o primeiro passo rumo ao seu <span className="gold-gradient-text italic font-medium">alívio emocional</span> com facilidade.
          </h2>

          <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light mb-8">
            Planejar uma sessão de terapia não precisa ser doloroso ou burocrático. Use nosso rascunhador inteligente para expressar seus objetivos e preferências de horários em poucos cliques. Nós geramos uma mensagem elegante e personalizada pronta para você enviar a Bruno diretamente pelo WhatsApp.
          </p>

          <div className="bg-luxury-black/50 p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-luxury-gold shrink-0" />
              <p className="text-xs text-[#dfcaa7]">Relação terapêutica 100% humanizada do início ao fim.</p>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-luxury-gold shrink-0" />
              <p className="text-xs text-[#dfcaa7]">Atendimento rigoroso de acordo com o Código de Ética do CFP.</p>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-luxury-gold shrink-0" />
              <p className="text-xs text-[#dfcaa7]">Criptografia ponta a ponta e total segurança online.</p>
            </div>
          </div>
        </div>

        {/* Right column Form draft builder */}
        <div className="md:col-span-7">
          <form 
            onSubmit={handleLaunchWhatsApp}
            className="w-full bg-luxury-black/60 p-6 sm:p-8 rounded-3xl border border-luxury-gold/15 shadow-2xl flex flex-col gap-6"
          >
            {/* Form title details */}
            <div className="border-b border-white/[0.05] pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-sans tracking-widest text-[#dfcaa7] uppercase font-bold">Rascunhador de Consulta</span>
                <h3 className="text-lg font-serif text-white font-medium mt-0.5">Mensagem Personalizada de Agendamento</h3>
              </div>
              <Sparkles className="w-5 h-5 text-luxury-gold" />
            </div>

            {/* Input Name */}
            <div className="flex flex-col text-left gap-2">
              <label className="text-xs font-sans text-luxury-text-muted font-medium flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-luxury-gold" />
                Seu Nome (Como gostaria de ser chamado?)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex. Mariana Silva"
                className="w-full p-3.5 rounded-xl border border-white/5 bg-luxury-charcoal/20 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-sm font-light"
              />
            </div>

            {/* Inputs Idade and Estado in a 2-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input Idade */}
              <div className="flex flex-col text-left gap-2">
                <label className="text-xs font-sans text-luxury-text-muted font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-luxury-gold" />
                  Sua Idade
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex. 28"
                  className="w-full p-3.5 rounded-xl border border-white/5 bg-luxury-charcoal/20 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-sm font-light"
                />
              </div>

              {/* Input Estado */}
              <div className="flex flex-col text-left gap-2">
                <label className="text-xs font-sans text-luxury-text-muted font-medium flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                  Seu Estado (UF)
                </label>
                <input
                  type="text"
                  value={stateLocation}
                  onChange={(e) => setStateLocation(e.target.value)}
                  placeholder="Ex. Rio de Janeiro / RJ"
                  className="w-full p-3.5 rounded-xl border border-white/5 bg-luxury-charcoal/20 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-sm font-light"
                />
              </div>
            </div>

            {/* Selector Concerns */}
            <div className="flex flex-col text-left gap-2">
              <label className="text-xs font-sans text-luxury-text-muted font-medium flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-luxury-gold" />
                Qual o principal tema que deseja tratar hoje?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {concerns.map((concern) => {
                  const isSelected = mainConcern === concern;
                  return (
                    <button
                      type="button"
                      key={concern}
                      onClick={() => setMainConcern(concern)}
                      className={`px-4 py-2 text-left rounded-lg text-xs transition duration-200 border cursor-pointer ${
                        isSelected 
                          ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold font-medium' 
                          : 'bg-luxury-charcoal/10 border-white/5 hover:border-luxury-gold/30 text-luxury-text-muted hover:text-white'
                      }`}
                    >
                      {concern}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sector Preferred hours */}
            <div className="flex flex-col text-left gap-2">
              <label className="text-xs font-sans text-luxury-text-muted font-medium flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                Qual período do dia você possui maior facilidade para sessões?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {times.map((t) => {
                  const isSelected = preferredTime === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setPreferredTime(t)}
                      className={`px-4 py-2.5 rounded-lg text-xs transition border cursor-pointer ${
                        isSelected 
                          ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold font-medium' 
                          : 'bg-luxury-charcoal/10 border-white/5 hover:border-luxury-gold/30 text-luxury-text-muted hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview of generated text */}
            <div className="bg-luxury-black/80 rounded-2xl p-4 border border-white/5 text-left">
              <span className="text-[10px] font-sans tracking-wide text-zinc-500 block mb-2 uppercase font-semibold">Visualização prévia do rascunho clínico</span>
              <p className="text-xs text-luxury-text-muted font-light leading-relaxed italic">
                "{generateDraftText()}"
              </p>
            </div>

            {/* Button click trigger */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-widest py-4.5 rounded-xl transition shadow-lg cursor-pointer mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar e começar a cuidar de mim</span>
            </button>
            <span className="text-[9px] text-zinc-500 font-sans leading-none">Ao clicar, você será redirecionado com segurança para o WhatsApp.</span>

          </form>
        </div>

      </div>
    </section>
  );
}
