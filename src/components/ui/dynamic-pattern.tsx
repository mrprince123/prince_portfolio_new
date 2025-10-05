import React, { useRef, useEffect } from "react";

interface DynamicPatternProps {
  width?: number;
  height?: number;
  shapeCount?: number;
}

const DynamicPattern: React.FC<DynamicPatternProps> = ({
  width = 800,
  height = 400,
  shapeCount = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to generate a random color
  const randomColor = () => `hsl(${Math.random() * 360}, 70%, 60%)`;

  // Function to check if a new shape overlaps with existing ones
  const checkOverlap = (shapes: any[], x: number, y: number, size: number) => {
    for (let shape of shapes) {
      const dx = shape.x - x;
      const dy = shape.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (shape.size + size) / 2 + 5) {
        return true;
      }
    }
    return false;
  };

  // Function to draw the pattern
  const drawPattern = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    const shapes: any[] = [];

    let attempts = 0;
    while (shapes.length < shapeCount && attempts < shapeCount * 10) {
      attempts++;
      const size = 20 + Math.random() * 50;
      const x = size / 2 + Math.random() * (width - size);
      const y = size / 2 + Math.random() * (height - size);

      if (!checkOverlap(shapes, x, y, size)) {
        shapes.push({ x, y, size });
        const rotation = Math.random() * Math.PI * 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = randomColor();
        const shapeType = Math.random();
        if (shapeType < 0.33) {
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (shapeType < 0.66) {
          ctx.fillRect(-size / 2, -size / 2, size, size);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }
  };

  // Function to generate the pattern
  const generatePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawPattern(ctx);
  };

  useEffect(() => {
    generatePattern();
  }, [shapeCount]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-2xl shadow-elegant border border-border/50"
      />
      <div className="flex justify-center">
        <button
          onClick={generatePattern}
          className="mt-4 px-4 dark:text-white  text-black font-medium"
        >
          Click to Generate New{" "}
          <span className="text-gradient">AI Pattern</span>
        </button>
      </div>
    </div>
  );
};

export default DynamicPattern;
