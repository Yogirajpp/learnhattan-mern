export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0.7,
      transition: {
        duration: 0.2,
        delay,
        ease: [0.25, 0.1, 0.25, 0.5],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.25]
      }
    },
    exit: {
      opacity: 0,
      opacity: 0,
      transition: {
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }
  }
}
