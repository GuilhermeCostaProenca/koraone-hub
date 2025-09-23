import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function LoadingSkeleton({ 
  className = "", 
  lines = 3, 
  height = "h-4" 
}: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`bg-muted rounded-lg ${height}`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
          style={{
            width: i === lines - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <LoadingSkeleton lines={1} height="h-6" className="mb-4" />
      <LoadingSkeleton lines={3} height="h-4" className="mb-4" />
      <div className="flex items-center justify-between">
        <LoadingSkeleton lines={1} height="h-8" className="w-24" />
        <LoadingSkeleton lines={1} height="h-8" className="w-16" />
      </div>
    </div>
  );
}