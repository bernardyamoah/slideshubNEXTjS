export const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate:(index:number)=>( {
      opacity: 1,
      y: 0,
      
      transition: {
        delay:0.05 * index,
      }
    }),
  }