'use client';

import { useEffect, useRef, useState } from 'react';
import cloud from 'd3-cloud';
import { WordFrequency } from '@/lib/useWords';

interface WordCloudProps {
  words: WordFrequency[];
}

export default function WordCloud({ words }: WordCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const isMobile = width < 640;
        const height = isMobile ? 400 : 600;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || words.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate font sizes based on frequency and screen size
    const maxValue = Math.max(...words.map((w) => w.value));
    const isMobile = width < 640;
    const minSize = isMobile ? 12 : 16;
    const maxSize = isMobile ? 50 : 80;

    const layout = cloud()
      .size([width, height])
      .words(
        words.map((w) => ({
          text: w.text,
          size: minSize + ((w.value / maxValue) * (maxSize - minSize)),
        }))
      )
      .padding(isMobile ? 3 : 5)
      .rotate(() => 0)
      .font('Arial')
      .fontSize((d: any) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words: any[]) {
      if (!ctx) return;

      ctx.save();
      ctx.translate(width / 2, height / 2);

      words.forEach((word) => {
        ctx.save();
        ctx.translate(word.x, word.y);
        ctx.font = `${word.size}px Arial`;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(word.text, 0, 0);
        ctx.restore();
      });

      ctx.restore();
    }
  }, [words, dimensions]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="border border-gray-300 dark:border-gray-600 rounded-lg mx-auto w-full bg-white dark:bg-gray-700"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
