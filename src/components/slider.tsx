"use client";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useEffect, useState } from "react";

interface ItinerariesFormProps {
  images: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const SliderMotion: React.FC<ItinerariesFormProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, images.length, page);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("switch image");
      paginate(1);
    }, 10000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.img
        key={page}
        src={images[imageIndex]}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.5 },
        }}
      />
    </AnimatePresence>
  );
};

export default SliderMotion;
