'use client';

import { useEffect, useRef } from 'react';
import cloud from 'd3-cloud';
import { WordFrequency } from '@/lib/useWords';

interface WordCloudProps {
  words: WordFrequency[];
}

export default function WordCloud({ words }: WordCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || words.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate font sizes based on frequency
    const maxValue = Math.max(...words.map((w) => w.value));
    const minSize = 16;
    const maxSize = 80;

    const layout = cloud()
      .size([width, height])
      .words(
        words.map((w) => ({
          text: w.text,
          size: minSize + ((w.value / maxValue) * (maxSize - minSize)),
        }))
      )
      .padding(5)
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
  }, [words]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-300 rounded-lg mx-auto"
    />
  );
}
