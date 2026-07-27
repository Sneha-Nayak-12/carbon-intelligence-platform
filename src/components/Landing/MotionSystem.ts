export const transitionPresets = {
  cinematic: {
    duration: 1.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  },
  springHeavy: {
    type: "spring",
    stiffness: 85,
    damping: 14
  },
  springMicro: {
    type: "spring",
    stiffness: 220,
    damping: 20
  }
};

export const headlineVariants = {
  hidden: {
    y: 20,
    filter: 'blur(8px)',
    opacity: 0,
    letterSpacing: '0.15em'
  },
  visible: {
    y: 0,
    filter: 'blur(0px)',
    opacity: 1,
    letterSpacing: 'normal',
    transition: transitionPresets.cinematic
  }
};

export const logoVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

export const navItemVariants: any = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 1.0,
      ease: "easeOut"
    }
  })
};
