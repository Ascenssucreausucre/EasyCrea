// Feedback.js
import { useFeedback } from "../context/FeedbackContext";
import { motion } from "framer-motion";

export function Feedback() {
  const { feedback } = useFeedback();

  if (!feedback) return null;

  return (
    <motion.div
      className={`${feedback.type} status-feedback`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <p>{feedback.message}</p>
    </motion.div>
  );
}
