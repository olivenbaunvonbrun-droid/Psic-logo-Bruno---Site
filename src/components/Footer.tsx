import React, { useState } from 'react';
import { MapPin, Heart, Shield, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact form submission
    console.log("Mensagem enviada:", { formName, formContact, formMessage });
    setIsSubmitted(true);
  };

  return (
    <footer 
      id="rodapé"
      className="bg-luxury-black border-t border-luxury-gold/15 pt-20 pb-10 text-left relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-luxury-gold/2 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Content columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.05]">
          
          {/* Brand and Description (5 columns) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-luxury-charcoal border border-luxury-gold/40 overflow-hidden">
                <img 
                  src="/media__1779535801913.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain p-0.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-cinzel font-bold leading-tight tracking-[0.1em] text-luxury-gold-light group-hover:text-luxury-gold transition duration-300 whitespace-nowrap">BRUNO DE OLIVEIRA</span>
                <span className="text-[9px] font-sans text-luxury-text-muted tracking-[0.15em] font-medium mt-1 uppercase whitespace-nowrap">Psicólogo Clínico • CRP 05/75885</span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light max-w-sm mt-2">
              Trabalho guiado pelo rigor da ética, embasado na ciência comportamental e no respeito absoluto pela integridade psicológica e dignidade de cada paciente.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-2">
              <span className="bg-[#141416] border border-luxury-gold/20 text-luxury-gold-light font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-luxury-gold" />
                <span>CRP Ativo: 05/75885</span>
              </span>
            </div>

            {/* MapPin details moved here for better space utilization */}
            <div className="flex items-start gap-2.5 text-xs text-luxury-text-muted mt-4 max-w-sm leading-relaxed font-light">
              <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
              <span>Consultório Executivo Online em Criptografia • Disponível para todo o Brasil e Brasileiros no Exterior.</span>
            </div>

            {/* Quick CFP seal representation moved here */}
            <div className="mt-2 p-3.5 rounded-xl bg-luxury-charcoal/40 border border-white/5 text-[10px] text-zinc-500 leading-normal max-w-sm font-light">
              *Atendimento de acordo com a Resolução CFP nº 11/2018. Cadastro regularizado no e-Psi para realização de psicologia online.
            </div>
          </div>

          {/* Quick links (3 columns) */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-bold">Navegação</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#terapeuta" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">O Terapeuta</a>
              <a href="#dores" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Dores Tratadas</a>
              <a href="#abordagem" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Pilares Clínicos</a>
              <a href="#alivio" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Exercício de Alívio</a>
              <a href="#avaliacao" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Teste de Autoavaliação</a>
            </div>
          </div>

          {/* Contact Form Column (4 columns) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <h4 className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-bold">Mensagem Direta</h4>
            
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-3">
              {isSubmitted ? (
                <div className="bg-luxury-gold/5 p-4 rounded-xl border border-luxury-gold/25 text-xs text-luxury-gold-light leading-relaxed font-light text-left">
                  Obrigado! Sua mensagem foi enviada. Entrarei em contato em breve.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-luxury-charcoal/30 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-xs font-light"
                  />
                  <input
                    type="text"
                    required
                    placeholder="E-mail ou WhatsApp"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-luxury-charcoal/30 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-xs font-light"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Sua Mensagem..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-luxury-charcoal/30 text-white placeholder-zinc-600 focus:border-luxury-gold focus:outline-none transition text-xs font-light resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black font-semibold text-xs uppercase tracking-wider py-2.5 rounded-lg transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Mensagem</span>
                  </button>
                </>
              )}
            </form>
          </div>

        </div>

        {/* Bottom micro signature credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide">
            © {currentYear} Bruno de Oliveira Lima • CRP 05/75885. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-sans">
            <span>Desenvolvido com classe e</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>e TCC de 4ª Geração</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
