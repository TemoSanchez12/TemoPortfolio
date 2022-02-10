import { motion, AnimatePresence } from 'framer-motion'
import MainNavigation from './main-navigation'
import Hero from './hero'
import { useRouter } from 'next/router'

import Stars from '../decoration/stars'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const MainLayout = ({ children }) => {
  const router = useRouter()

  return (
    <div className='main-layout__stars-container'>
      <Stars />
      <div className='main-layout__container'>
        <MainNavigation />
        <Hero />

        <AnimatePresence exitBeforeEnter initial={true}>
          <motion.main
            key={router.route}
            className='main-layout__main-container'
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4, type: 'easeInOut' }}
            style={{ position: 'relative' }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <p className='main-layout__footer'>Temo Sanchez, All Rights Reserved</p>
      </div>
    </div>
  )
}

export default MainLayout
