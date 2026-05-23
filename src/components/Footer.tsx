import React, { useState } from 'react';
import { Phone, Mail, MapPin, Heart, Shield, Sparkles, MessageCircleCode } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Olá, Bruno! Acessei o rodapé do seu site e gostaria de agendar uma consulta psicoterapêutica."
    );
    window.open(`https://wa.me/5521975249514?text=${text}`, '_blank');
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
                <span className="text-base sm:text-lg font-cinzel font-bold leading-tight tracking-[0.1em] text-luxury-gold-light group-hover:text-luxury-gold transition duration-300">BRUNO DE OLIVEIRA</span>
                <span className="text-[9px] font-sans text-luxury-text-muted tracking-[0.25em] font-medium mt-1 uppercase">Psicoterapia Clínica</span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-luxury-text-muted leading-relaxed font-sans font-light max-w-sm mt-2">
              Trabalho guiado pelo rigor da ética, embasado na ciência comportamental e no respeito absoluto pela integridade psicológica e dignidade de cada paciente.
            </p>

            <span className="mt-4 bg-[#141416] border border-luxury-gold/20 text-luxury-gold-light font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-luxury-gold" />
              <span>CRP Ativo: 05/75885</span>
            </span>
          </div>

          {/* Quick links (3 columns) */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-bold">Navegação</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#terapeuta" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">O Terapeuta</a>
              <a href="#dores" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Dores Tratadas</a>
              <a href="#abordagem" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Pillars Clínicos</a>
              <a href="#alivio" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Exercício de Alívio</a>
              <a href="#avaliacao" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Teste de Autoavaliação</a>
              <a href="#depoimentos" className="text-xs text-luxury-text-muted hover:text-luxury-gold transition">Depoimentos Reais</a>
            </div>
          </div>

          {/* Contact Details (4 columns) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <h4 className="text-xs font-sans tracking-[0.3em] uppercase text-luxury-gold-light font-bold">Atendimento e Contato</h4>
            
            <div className="flex flex-col gap-3.5 w-full">
              
              <div className="flex items-start gap-3 text-xs text-luxury-text-muted">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>Consultório Executivo Online em Criptografia • Disponível para todo o Brasil e Brasileiros no Exterior.</span>
              </div>

              {/* Tel click triggers directly onto Whatsapp */}
              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 text-xs text-luxury-text-muted hover:text-luxury-gold transition text-left cursor-pointer"
              >
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>(21) 97524-9514 (Enviar WhatsApp)</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-luxury-text-muted">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>bruno.deoliveira.crp@outlook.com</span>
              </div>

            </div>

            {/* Quick CFP seal representation */}
            <div className="mt-4 p-3.5 rounded-xl bg-luxury-charcoal/40 border border-white/5 text-[10px] text-zinc-500 leading-normal max-w-xs font-light">
              *Atendimento de acordo com a Resolução CFP nº 11/2018. Cadastro regularizado no e-Psi para realização de psicologia online.
            </div>

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
