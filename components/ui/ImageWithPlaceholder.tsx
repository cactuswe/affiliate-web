"use client";
import React, { useState, useEffect } from 'react';

export default function ImageWithPlaceholder({ src, alt, className, lqip }:
  { src: string; alt?: string; className?: string; lqip?: string }){
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    setLoaded(false);
  }, [src]);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* low-quality placeholder */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(8px) saturate(0.9)', transform: 'scale(1.02)', transition: 'opacity 360ms ease',
        backgroundImage: `url(${lqip || '/placeholder.jpg'})`, opacity: loaded ? 0 : 1
      }} />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => { setLoaded(true); setTimeout(()=>setShow(true), 40); }}
        style={{
          width: '100%', height: 'auto', display: 'block', opacity: show ? 1 : 0,
          transition: 'opacity 420ms ease, transform 420ms ease', transform: show ? 'none' : 'translateY(6px)'
        }}
      />
    </div>
  );
}
