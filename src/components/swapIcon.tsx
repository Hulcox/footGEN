import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface Props {
  openIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  toggle: boolean;
}

const variants = {
  openningOpenIcon: { opacity: 1, duration: 0.5, x: "50%" },
  openningCloseIcon: { opacity: 1, duration: 0.5, x: "-50%" },
  closed: { opacity: 0, duration: 0.5, rotate: [0, 0, 360] },
};

const SwapIcon: React.FC<Props> = ({ openIcon, closeIcon, toggle }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={!toggle ? "openningOpenIcon" : "closed"}
        variants={variants}
      >
        {openIcon}
      </motion.div>
      <motion.div
        animate={toggle ? "openningCloseIcon" : "closed"}
        variants={variants}
      >
        {closeIcon}
      </motion.div>
    </AnimatePresence>
  );
};

export default SwapIcon;
