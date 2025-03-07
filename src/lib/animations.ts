export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren || 0.1,
      delayChildren: delayChildren || 0
    }
  }
});

export const fadeIn = (direction: string, delay: number) => ({
  hidden: {
    x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
});

export const slideIn = (direction: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut'
    }
  }
});
