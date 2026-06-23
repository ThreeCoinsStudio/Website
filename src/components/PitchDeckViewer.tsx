import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  layout: string;
  title: string;
  subtitle?: string;
  content?: string;
  items?: any[];
  contact?: {
    x?: string;
    email?: string;
  };
}

interface PitchDeckViewerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  title: string;
}

export function PitchDeckViewer({ isOpen, onClose, slides, title }: PitchDeckViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const renderSlideContent = () => {
    switch (currentSlide.layout) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-white px-4">{currentSlide.title}</h1>
            <div className="bg-solar-gold text-obsidian-base font-bold px-8 py-3 rounded-full text-xl md:text-2xl">
              {currentSlide.subtitle}
            </div>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mt-8 leading-relaxed">
              {currentSlide.content}
            </p>
          </div>
        );
      case 'text':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{currentSlide.title}</h2>
             <p className="text-2xl md:text-3xl text-solar-gold font-medium leading-relaxed">{currentSlide.content}</p>
          </div>
        );
      case 'list':
        return (
          <div className="flex flex-col h-full pl-0 md:pl-12 pt-12 md:pt-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16 inline-block pb-4 border-b border-solar-gold/30">{currentSlide.title}</h2>
            {currentSlide.content && (
              <p className="text-xl text-white/80 mb-8 max-w-3xl italic border-l-4 border-solar-gold pl-4">{currentSlide.content}</p>
            )}
            <ul className="space-y-6 max-w-4xl">
              {currentSlide.items?.map((item, idx) => (
                <li key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg md:text-xl border-b border-white/5 pb-4">
                  {item.label && <span className="text-white/50 font-mono tracking-widest uppercase text-sm md:text-base w-48 shrink-0">{item.label}</span>}
                  <span className="text-white font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'cards':
        return (
           <div className="flex flex-col h-full pt-12 md:pt-20 items-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16">{currentSlide.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
              {currentSlide.items?.map((item, idx) => (
                <div key={idx} className="bg-surface-container border border-solar-gold/20 p-8 rounded-xl flex flex-col justify-center items-center text-center shadow-lg h-48">
                  {item.label && <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{item.label}</h4>}
                  {item.value && <p className="text-solar-gold text-lg md:text-xl opacity-90">{item.value}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'team':
         return (
          <div className="flex flex-col h-full pt-12 md:pt-20 items-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16">{currentSlide.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
              {currentSlide.items?.map((item, idx) => (
                <div key={idx} className="bg-surface-container border border-white/5 p-8 rounded-xl flex flex-col text-left">
                  {item.label && <h4 className="text-2xl font-black text-white mb-1">{item.label}</h4>}
                  {item.sub && <div className="text-solar-gold font-mono text-sm tracking-widest mb-6 font-bold">{item.sub}</div>}
                  {item.value && <p className="text-white/60 text-sm md:text-base leading-relaxed">{item.value}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'split':
        return (
          <div className="flex flex-col md:flex-row h-full pt-12 md:pt-20 items-stretch gap-12">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">{currentSlide.title}</h2>
              {currentSlide.content && (
                <p className="text-xl md:text-2xl text-solar-gold font-medium leading-relaxed italic border-l-4 border-solar-gold pl-6">
                  {currentSlide.content}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center bg-surface-container/50 border border-white/5 p-8 rounded-2xl">
              <ul className="space-y-6">
                {currentSlide.items?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg text-white">
                    <span className="text-solar-gold mt-1">•</span>
                    <span className="leading-relaxed">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-12 max-w-4xl mx-auto pt-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-white px-4">{currentSlide.title}</h1>
              <div className="text-solar-gold font-bold px-8 py-2 text-2xl md:text-3xl">
                {currentSlide.subtitle}
              </div>
              {currentSlide.content && (
                <p className="text-xl md:text-2xl text-white/70 mt-4 leading-relaxed">
                  {currentSlide.content}
                </p>
              )}
            </div>
            
            {(currentSlide.contact?.x || currentSlide.contact?.email !== undefined) && (
              <div className="flex flex-col sm:flex-row gap-6 mt-12 w-full max-w-lg justify-center">
                {currentSlide.contact.x && (
                  <a 
                    href={currentSlide.contact.x} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-surface-container hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
                  >
                    X (Twitter)
                  </a>
                )}
                {currentSlide.contact.email !== undefined && (
                  <a 
                    href={currentSlide.contact.email ? `mailto:${currentSlide.contact.email}` : "#"} 
                    className={`flex-1 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${currentSlide.contact.email ? 'bg-solar-gold hover:bg-white text-obsidian-base active:scale-95 shadow-[0_5px_30px_rgba(228,159,45,0.4)]' : 'bg-surface-container border border-white/5 text-white/30 cursor-not-allowed'}`}
                    onClick={(e) => !currentSlide.contact.email && e.preventDefault()}
                  >
                    Email Us
                  </a>
                )}
              </div>
            )}
          </div>
        );
      default:
        return (
           <div className="flex flex-col h-full pt-12 md:pt-20 text-center">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-16">{currentSlide.title}</h2>
             <p className="text-white">Content layout unsupported</p>
           </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8">
       <div className="relative w-full max-w-7xl h-[85vh] bg-surface rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
         
         {/* Simple subtle background pattern */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,159,45,0.05),transparent_50%)] pointer-events-none"></div>

         <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
           <div className="flex items-center gap-4">
             <div className="text-solar-gold font-mono text-xs uppercase tracking-[0.2em]">{title}</div>
             <div className="bg-white/10 text-white/50 px-3 py-1 rounded text-xs font-mono">
               {currentSlideIndex + 1} / {slides.length}
             </div>
           </div>
           
           <button 
             onClick={onClose}
             className="p-2 bg-surface-container hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
           >
             <X size={24} />
           </button>
         </div>

         <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 relative z-10">
            {renderSlideContent()}
         </div>

         <div className="flex items-center justify-between p-6 border-t border-white/10 bg-surface-container relative z-10">
           <button 
             onClick={handlePrev} 
             disabled={currentSlideIndex === 0}
             className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-surface border border-white/10 rounded-lg text-white font-medium transition-colors"
           >
             <ChevronLeft size={20} /> Previous
           </button>
           
           <div className="flex gap-2">
             {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${idx === currentSlideIndex ? 'bg-solar-gold w-6' : 'bg-white/20 hover:bg-white/40'}`}
                />
             ))}
           </div>

           <button 
             onClick={handleNext} 
             disabled={currentSlideIndex === slides.length - 1}
             className="flex items-center gap-2 px-6 py-3 bg-solar-gold hover:bg-white text-obsidian-base disabled:opacity-30 border border-transparent rounded-lg font-bold transition-all shadow-md"
           >
             Next <ChevronRight size={20} />
           </button>
         </div>
       </div>
    </div>
  );
}
