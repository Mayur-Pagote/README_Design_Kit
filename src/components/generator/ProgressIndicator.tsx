
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => {
  const progress = ((current) / total) * 100;

  return (
    <div className="mb-8 mt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white text-muted-foreground">Progress</span>
        <span className="text-sm text-white text-muted-foreground">{current}/{total}</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
