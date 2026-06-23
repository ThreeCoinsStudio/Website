import React, { useEffect, useState } from 'react';
import { Search, Gamepad2, Timer, Wand2, Zap, ExternalLink, Heart, ArrowRight, User } from 'lucide-react';
import data from './data.json';
import { PitchDeckViewer } from './components/PitchDeckViewer';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Handle mobile haptic feedback roughly (if available in modern browsers)
  const handleInteract = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(19, 19, 23, 0.4), rgba(19, 19, 23, 1)), url(${data.hero.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Parallax effect
  };

  return (
    <div className="min-h-screen font-sans bg-surface selection:bg-solar-gold selection:text-obsidian-base overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${scrolled ? 'border-white/5 bg-surface/90 backdrop-blur-md shadow-lg shadow-black/20 py-2' : 'border-transparent bg-transparent py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex items-center justify-between">
          <div className="flex items-center gap-3 select-none active:scale-95 transition-transform">
             {data.navigation.studioIcon ? (
               <img src={data.navigation.studioIcon} alt={data.navigation.studioName} className="w-10 h-10 rounded-lg object-contain bg-solar-gold/10 p-1 shadow-[0_0_15px_rgba(228,159,45,0.4)]" />
             ) : (
               <div className="w-10 h-10 rounded-lg bg-solar-gold flex items-center justify-center font-black text-obsidian-base shadow-[0_0_15px_rgba(228,159,45,0.4)]">3C</div>
             )}
             <span className="font-bold text-lg md:text-xl tracking-tight text-white">{data.navigation.studioName}</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={handleInteract} className="text-white/70 hover:text-white transition-colors p-2 active:scale-90" aria-label="Search"><Search size={22} /></button>
            <a href={data.links.discord} target="_blank" rel="noreferrer" onClick={handleInteract} className="hidden md:flex text-white/70 hover:text-white transition-colors active:scale-90"><Gamepad2 size={24} /></a>
            <a href={data.links.steam} target="_blank" rel="noreferrer" onClick={handleInteract} className="bg-solar-gold/10 text-solar-gold hover:bg-solar-gold hover:text-obsidian-base px-5 md:px-6 py-2.5 rounded-md text-sm font-bold transition-all border border-solar-gold/30 active:scale-95 shadow-[0_0_20px_rgba(228,159,45,0.1)] hover:shadow-[0_0_25px_rgba(228,159,45,0.4)]">{data.navigation.demoButtonText}</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 px-5 md:px-16" style={heroStyle}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10">
          
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8">
              <div className="hidden sm:block h-[2px] w-12 bg-solar-gold"></div>
              <span className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-solar-gold uppercase">{data.hero.eventSub}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 text-white leading-[1.05]">
              {data.hero.title} <span className="text-solar-gold inline-block hover:scale-105 transition-transform duration-500 cursor-default">{data.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-10 md:mb-12 leading-relaxed">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href={data.links.steam} onClick={handleInteract} target="_blank" rel="noreferrer" className="bg-solar-gold hover:bg-white text-obsidian-base px-8 py-5 rounded-lg font-bold transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-[0_4px_25px_rgba(228,159,45,0.3)]">
                {data.hero.primaryButton}
                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href={data.links.teaser} onClick={handleInteract} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/15 text-white border border-white/20 px-8 py-5 rounded-lg font-bold transition-all flex items-center justify-center backdrop-blur-sm active:scale-95">
                {data.hero.secondaryButton}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Status Card uses glassmorphism */}
            <div className="w-full max-w-md bg-deep-slate/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:bg-deep-slate/60 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-[#a4b7d1] w-28 md:w-32 leading-relaxed uppercase">{data.project.statusLabel}</span>
                <div className="w-2.5 h-2.5 rounded-full bg-solar-gold shadow-[0_0_12px_rgba(228,159,45,1)] animate-pulse"></div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-5">
                  <span className="text-white/60 font-medium tracking-wide">{data.project.versionLabel}</span>
                  <span className="font-bold text-white text-xl">{data.project.version}</span>
                </div>
                <div className="flex flex-col gap-4 pb-2">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60 font-medium tracking-wide">{data.project.difficultyLabel}</span>
                    <span className="font-bold text-solar-gold text-xl drop-shadow-[0_0_5px_rgba(228,159,45,0.4)]">{data.project.difficulty}</span>
                  </div>
                  <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-solar-gold rounded-full w-4/5 shadow-[0_0_15px_rgba(228,159,45,0.6)]"></div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-mono mt-6">
                  {data.project.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 border-b border-white/5 max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 pb-8 md:pb-0 first:pt-0 last:pb-0 group">
              <div className="text-5xl md:text-7xl font-black text-solar-gold mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(228,159,45,0.2)]">{stat.value}</div>
              <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/50 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sprints Section */}
      <section className="py-24 md:py-40 px-5 md:px-16 max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-24 text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight">
            {data.sprints.headline} <span className="text-solar-gold block sm:inline">{data.sprints.headlineHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed mx-auto lg:mx-0">
            {data.sprints.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 bg-surface-container rounded-2xl overflow-hidden border border-white/5 group relative active:scale-[0.98] transition-transform cursor-pointer shadow-2xl">
             <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-black">
               <img src={data.sprints.cards.main.image} alt={data.sprints.cards.main.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 opacity-50" />
             </div>
             <div className="p-8 md:p-12 absolute bottom-0 bg-gradient-to-t from-surface-container via-surface-container/90 to-transparent w-full pt-32">
               <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">{data.sprints.cards.main.title}</h3>
               <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">{data.sprints.cards.main.description}</p>
             </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-1">
            <div className="bg-surface-container rounded-2xl p-8 md:p-10 border border-white/5 flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left shadow-xl hover:border-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full border border-solar-gold/40 bg-solar-gold/5 flex items-center justify-center text-solar-gold mb-8 shadow-[0_0_15px_rgba(228,159,45,0.15)]">
                <Timer size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{data.sprints.cards.secondary1.title}</h3>
              <p className="text-white/60 text-base leading-relaxed">{data.sprints.cards.secondary1.description}</p>
            </div>

            <div onClick={handleInteract} className="bg-solar-gold rounded-2xl p-8 md:p-10 flex-1 flex flex-col justify-center text-obsidian-base shadow-[0_8px_30px_rgba(228,159,45,0.2)] hover:shadow-[0_12px_40px_rgba(228,159,45,0.4)] transition-all cursor-pointer group active:scale-[0.98]">
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">{data.sprints.cards.secondary2.title}</h3>
              <p className="opacity-80 font-semibold mb-8 text-base leading-relaxed">{data.sprints.cards.secondary2.description}</p>
              <button className="font-bold border-b-4 border-obsidian-base/20 group-hover:border-obsidian-base pb-1 self-start flex items-center gap-3 transition-colors text-lg uppercase tracking-wide">
                {data.sprints.cards.secondary2.action}
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-40 px-5 md:px-16 max-w-[1440px] mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-[3/4] max-w-lg mx-auto w-full lg:max-w-none shadow-2xl group">
             <img src={data.features.image} alt="Feature visual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-surface/20"></div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col text-center lg:text-left">
            <div className="inline-block px-5 py-2 rounded-full border border-surface-container-high bg-surface-container text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-[#a4b7d1] uppercase mb-8 self-center lg:self-start shadow-sm">
               {data.features.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight">
              {data.features.title} <span className="text-solar-gold italic">{data.features.highlight}</span> {data.features.suffix}
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-12 md:mb-16 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {data.features.description}
            </p>

            <div className="space-y-10 md:space-y-12 text-left">
              {data.features.items.map((item, i) => (
                <div key={i} className="flex gap-5 md:gap-6 bg-surface-container/50 p-6 rounded-xl border border-transparent hover:border-white/5 hover:bg-surface-container transition-colors">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-surface-container flex items-center justify-center text-solar-gold shrink-0 border border-white/5 shadow-inner">
                    {i === 0 ? <Wand2 size={24} /> : <Zap size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-base text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 md:py-40 px-5 md:px-16 max-w-[1440px] mx-auto text-center">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight">
            {data.founders.title} <span className="text-solar-gold">{data.founders.highlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            {data.founders.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {data.founders.list.map((founder, i) => (
            <div key={i} className="bg-surface-container rounded-2xl p-8 md:p-10 text-left border border-white/5 flex flex-col justify-end min-h-[300px] md:min-h-[400px] h-full relative overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-surface-container-high/40 to-surface-container-high/80 group-hover:to-surface-container-high transition-colors duration-500 z-0"></div>
              
              <div className="relative z-10 pt-10 flex flex-col items-start h-full pb-6">
                {founder.avatar ? (
                  <img src={founder.avatar} alt={founder.name} className="w-16 h-16 rounded-full border-2 border-solar-gold/50 bg-obsidian-base/50 p-1 mb-6 shadow-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-solar-gold/50 bg-obsidian-base/50 p-1 mb-6 shadow-lg flex items-center justify-center text-solar-gold">
                    <User size={32} />
                  </div>
                )}
              </div>

              <div className="relative z-10 mt-auto pt-4">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">{founder.name}</h3>
                <div className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-solar-gold mb-5 md:mb-6 uppercase">{founder.role}</div>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {founder.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-32 md:py-48 px-5 md:px-16 bg-surface-container border-t border-b border-white/5 relative overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-solar-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            {data.cta.title}
           </h2>
           <p className="text-xl md:text-2xl text-white/60 mb-12 md:mb-16 leading-relaxed">
            {data.cta.description}
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-6">
             <a href={data.links.steam} onClick={handleInteract} target="_blank" rel="noreferrer" className="bg-solar-gold hover:bg-white text-obsidian-base px-8 md:px-10 py-5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-lg md:text-xl active:scale-95 shadow-[0_5px_30px_rgba(228,159,45,0.4)]">
               <Heart size={24} fill="currentColor" />
               {data.cta.buttons.primary}
             </a>
             <a href={data.links.discord} onClick={handleInteract} target="_blank" rel="noreferrer" className="bg-obsidian-base hover:bg-white/10 text-white border border-white/10 px-8 md:px-10 py-5 rounded-xl font-bold transition-all flex items-center justify-center text-lg md:text-xl active:scale-95">
               {data.cta.buttons.secondary}
             </a>
           </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-5 md:px-16 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-sm text-white/40">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 font-mono text-center md:text-left">
            <span className="text-white font-sans font-bold text-lg md:text-xl tracking-tight">{data.navigation.studioName}</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="leading-relaxed">{data.footer.copyright}</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-10 font-mono tracking-[0.1em] text-xs uppercase items-center">
             <a href={data.links.steamStore} className="hover:text-solar-gold transition-colors font-bold">{Object.keys(data.links)[0]} Store</a>
             <a href={data.links.discord} className="hover:text-solar-gold transition-colors font-bold">Discord</a>
             <button onClick={() => setIsPitchDeckOpen(true)} className="hover:text-solar-gold transition-colors font-bold cursor-pointer">Pitch Deck</button>
             <div className="hidden sm:flex items-center justify-center w-12 h-12 border border-white/10 rounded-xl ml-4 bg-surface-container overflow-hidden">
               {data.navigation.studioIcon && <img src={data.navigation.studioIcon} alt="Logo" className="w-full h-full object-contain p-1" />}
             </div>
          </div>
        </div>
      </footer>

      {/* Pitch Deck Modal */}
      <PitchDeckViewer 
        isOpen={isPitchDeckOpen} 
        onClose={() => setIsPitchDeckOpen(false)} 
        slides={data.pitchDeck.slides} 
        title={data.pitchDeck.title} 
      />
    </div>
  );
}
