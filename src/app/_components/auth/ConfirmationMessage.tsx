import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setTimeout(onClose, 3000)}
          className="fixed top-[400px] left-1/2 transform -translate-x-1/2 p-4 bg-success rounded-xl shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationMessage;
