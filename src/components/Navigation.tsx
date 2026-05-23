import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, PhoneCall, Clock, HeartHandshake } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Keep elegant clock updated in Portuguese layout
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'America/Sao_Paulo'
      };
      setCurrentTime(new Intl.DateTimeFormat('pt-BR', options).format(now));
    };

    window.addEventListener('scroll', handleScroll);
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'O Terapeuta', href: '#terapeuta' },
    { name: 'Dores Emocionais', href: '#dores' },
    { name: 'Abordagem Clínica', href: '#abordagem' },
    { name: 'Recursos de Alívio', href: '#alivio' },
    { name: 'Autoavaliação', href: '#avaliacao' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Dúvidas', href: '#duvidas' },
  ];

  const handleWhatsAppClick = () => {
    // Send a message asking for dynamic consultation booking
    const message = encodeURIComponent(
      "Olá, Bruno! Acessei o seu site e gostaria de agendar uma consulta para entender melhor o atendimento terapêutico."
    );
    window.open(`https://wa.me/5521975249514?text=${message}`, '_blank');
  };

  return (
    <>
      <nav 
        id="navbar-root"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-luxury-black/90 backdrop-blur-md py-4 shadow-xl border-b border-luxury-gold/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <motion.a 
            href="#" 
            id="brand-logo"
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Custom minimalist gold PSI emblem representing the logo design in pictures */}
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-luxury-charcoal border border-luxury-gold/40 group-hover:border-luxury-gold overflow-hidden transition duration-300 shrink-0">
              <img 
                src="/media__1779535801913.png" 
                alt="Logo Bruno de Oliveira" 
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full border border-luxury-gold/5 scale-125 group-hover:scale-135 transition duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-cinzel font-bold leading-tight tracking-[0.1em] text-luxury-gold-light group-hover:text-luxury-gold transition duration-300">BRUNO DE OLIVEIRA</span>
              <span className="text-[9px] font-sans text-luxury-text-muted tracking-[0.25em] font-medium mt-1 uppercase">Psicoterapia Clínica</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <div className="flex items-center gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  id={`nav-link-${idx}`}
                  className="text-xs tracking-wider text-luxury-text-muted hover:text-luxury-gold-light transition duration-300 uppercase py-1 relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-luxury-gold after:transition-all hover:after:w-full hover:after:left-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Time badge representing commitment to prompt care */}
            <motion.div 
              id="clock-badge"
              className="flex items-center gap-1.5 px-3 py-1 bg-luxury-charcoal/50 border border-luxury-gold/10 rounded-full text-[10px] font-mono text-luxury-gold/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Clock className="w-3 h-3 text-luxury-gold-light" />
              <span>{currentTime || 'Brasília'}</span>
            </motion.div>

            {/* WhatsApp Premium CTA */}
            <motion.button
              id="desktop-whatsapp-cta"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 active:scale-95 text-luxury-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition duration-300 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Iniciar Mudança</span>
            </motion.button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Small subtle clock for mobile */}
            <div className="text-[10px] font-mono text-luxury-gold/70 bg-luxury-charcoal border border-luxury-gold/10 py-1 px-2.5 rounded-full">
              {currentTime.split(':').slice(0, 2).join(':') || '12:00'}
            </div>
            
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-gold-light hover:text-luxury-gold p-1"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-luxury-black/98 backdrop-blur-xl border-t border-luxury-gold/10 md:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-5 pt-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  id={`mobile-nav-link-${idx}`}
                  className="text-sm tracking-widest text-luxury-text-muted hover:text-luxury-gold-light border-b border-white/[0.03] pb-3 transition duration-300 uppercase"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8 pb-12 border-t border-luxury-gold/5 pt-6">
              <div className="flex items-center gap-2 text-xs text-luxury-text-muted justify-center">
                <HeartHandshake className="w-4 h-4 text-luxury-gold" />
                <span>Atendimento humanizado para sua saúde mental</span>
              </div>
              <button
                id="mobile-whatsapp-cta"
                onClick={() => {
                  handleWhatsAppClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light active:scale-95 text-luxury-black text-xs font-semibold uppercase tracking-wider py-4 rounded-full transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Iniciar Mudança</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
