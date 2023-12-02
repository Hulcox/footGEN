import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  children: React.ReactNode;
}

const Collapse: React.FC<Props> = ({ open, children }) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Collapse;
