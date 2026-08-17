import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, PlayIcon, RotateCwIcon } from 'lucide-react';
import type { Product } from '../../types';
import { cn } from '../../utils/cn';

type Mode = 'photos' | 'video' | '360';

interface GalleryProps {
  product: Product;
}

export function Gallery({ product }: GalleryProps) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>('photos');
  const [zoom, setZoom] = useState<{x: number;y: number;} | null>(null);
  const [spin, setSpin] = useState(0);

  const modes: Array<{key: Mode;label: string;icon: typeof ImageIcon;available: boolean;}> = [
  { key: 'photos', label: 'Photos', icon: ImageIcon, available: true },
  { key: 'video', label: 'Video', icon: PlayIcon, available: product.hasVideo },
  { key: '360', label: '360°', icon: RotateCwIcon, available: product.has360 }];


  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setZoom({
      x: (event.clientX - bounds.left) / bounds.width * 100,
      y: (event.clientY - bounds.top) / bounds.height * 100
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="flex-1">
        <div
          className="relative aspect-square w-full overflow-hidden bg-beige"
          onMouseMove={mode === 'photos' ? onMove : undefined}
          onMouseLeave={() => setZoom(null)}>
          
          {mode === 'photos' &&
          <img
            src={product.images[active]}
            alt={`${product.name} — view ${active + 1}`}
            className="h-full w-full object-cover transition-transform duration-200"
            style={
            zoom ?
            { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } :
            { transform: 'scale(1)' }
            } />

          }

          {mode === 'video' &&
          <div className="relative h-full w-full">
              <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/45 text-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60">
                  <PlayIcon className="ml-1 h-6 w-6" />
                </span>
                <p className="text-[11px] uppercase tracking-luxe">Studio film · 42 sec</p>
              </div>
            </div>
          }

          {mode === '360' &&
          <div className="relative h-full w-full">
              <motion.img
              src={product.images[Math.abs(spin) % product.images.length]}
              alt=""
              animate={{ rotate: spin * 4 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              className="h-full w-full object-cover" />
            
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink/70 to-transparent p-5 text-white">
                <p className="text-[11px] uppercase tracking-luxe">Drag the slider to rotate</p>
                <input
                type="range"
                min={-45}
                max={45}
                value={spin}
                onChange={(event) => setSpin(Number(event.target.value))}
                aria-label="Rotate the product"
                className="w-2/3 accent-gold" />
              
              </div>
            </div>
          }

          {mode === 'photos' &&
          <p className="pointer-events-none absolute bottom-4 right-4 bg-white/85 px-3 py-1 text-[10px] uppercase tracking-luxe text-ink">
              Hover to zoom
            </p>
          }
        </div>

        <div className="mt-3 flex gap-2">
          {modes.
          filter((item) => item.available).
          map((item) =>
          <button
            key={item.key}
            type="button"
            onClick={() => setMode(item.key)}
            className={cn(
              'flex items-center gap-2 border px-4 py-2 text-[11px] uppercase tracking-luxe transition-colors',
              mode === item.key ?
              'border-gold bg-gold text-ink' :
              'border-ink/15 text-ink-muted hover:border-gold hover:text-ink'
            )}>
            
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 lg:w-24 lg:flex-col">
        {product.images.map((image, index) =>
        <button
          key={image + index}
          type="button"
          onClick={() => {
            setActive(index);
            setMode('photos');
          }}
          aria-label={`View image ${index + 1}`}
          className={cn(
            'aspect-square w-20 shrink-0 overflow-hidden border transition-colors lg:w-full',
            active === index && mode === 'photos' ? 'border-gold' : 'border-transparent hover:border-ink/20'
          )}>
          
            <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        )}
      </div>
    </div>);

}