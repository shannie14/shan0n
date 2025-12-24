import React, { useEffect, useState } from "react";

const HERO_SIZE = 48;      // matches Tailwind w-12 h-12 (12 * 4px)
const STEP = 10;           // how many pixels the hero moves each key press
const GAME_WIDTH = 640;    // must match Tailwind width on the game area
const GAME_HEIGHT = 360;   // must match Tailwind height on the game area

type Position = {
  x: number;
  y: number;
};

const ArrowKeyHeroPage: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    x: 20,
    y: GAME_HEIGHT - HERO_SIZE - 20, // start near bottom-left
  });

  // Keep hero inside the box
  const clampPosition = (pos: Position): Position => {
    const maxX = GAME_WIDTH - HERO_SIZE - 5;
    const maxY = GAME_HEIGHT - HERO_SIZE - 5;

    return {
      x: Math.min(Math.max(pos.x, 0), maxX),
      y: Math.min(Math.max(pos.y, 0), maxY),
    };
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        event.preventDefault(); // stop page from scrolling
      }

      setPosition((prev) => {
        let next: Position = { ...prev };

        if (key === "ArrowLeft") {
          next.x -= STEP;
        } else if (key === "ArrowRight") {
          next.x += STEP;
        } else if (key === "ArrowUp") {
          next.y -= STEP;
        } else if (key === "ArrowDown") {
          next.y += STEP;
        }

        return clampPosition(next);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center font-pixel text-white">
      <main className="text-center space-y-4">
        <h1 className="text-2xl text-accent drop-shadow">
          Arrow Key Hero (TSX)
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
          Use the <span className="text-accent">arrow keys</span> on your
          keyboard to move the character inside the box.
        </p>

        {/* Game area */}
        <section
          className="
            bg-playground border-4 border-accent rounded-3xl shadow-xl
            w-[640px] h-[360px] relative overflow-hidden mx-auto
          "
        >
          {/* Character – swap this div for an <img> if you want a sprite */}
          <div
            className="
              absolute left-0 top-0 w-12 h-12 bg-hero rounded-xl shadow-md
              flex items-center justify-center text-[10px] text-white font-bold
              transition-transform
            "
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            M
          </div>

          <div className="absolute bottom-2 right-3 text-[10px] text-white/50">
            Try holding the arrow keys!
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArrowKeyHeroPage;
