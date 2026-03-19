"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
  overlay?: string;
}

export function ImageSlideshow({
  images,
  interval = 5000,
  overlay = "bg-primary/60",
}: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt=""
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
