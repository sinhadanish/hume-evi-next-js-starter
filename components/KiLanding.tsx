"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import KiNav from "./KiNav"
import dynamic from "next/dynamic"

// Import Chat component dynamically to avoid SSR issues
const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

const KiLanding = ({ accessToken }: { accessToken: string }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDemoActive, setIsDemoActive] = useState(false)
  const [currentTagline, setCurrentTagline] = useState(0)
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()

  const taglines = [
    "Have those tough conversations with a little help",
    "Someone who gets both of you",
    "Like having a friend who really listens",
    "Find common ground, without taking sides",
    "Turn misunderstandings into moments of connection",
    "Help finding the right words when emotions run high",
  ]

  const cycleTaglines = useCallback(() => {
    setCurrentTagline((prev) => (prev + 1) % taglines.length)
  }, [])

  useEffect(() => {
    const taglineInterval = setInterval(cycleTaglines, 3000)
    return () => clearInterval(taglineInterval)
  }, [cycleTaglines])

  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(45deg, #3b82f6, #06b6d4)",
        "linear-gradient(90deg, #0ea5e9, #06b6d4)",
        "linear-gradient(135deg, #0ea5e9, #0284c7)",
        "linear-gradient(180deg, #3b82f6, #0ea5e9)",
      ],
      transition: {
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  const startDemo = () => {
    setIsTransitioning(true)

    // Use a longer transition time to ensure components have time to initialize
    demoTimeoutRef.current = setTimeout(() => {
      setIsDemoActive(true)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {!isDemoActive ? (
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-sky-400" />

          {/* Gentle wave animation - much slower and smoother */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <motion.path
                fill="#ffffff"
                fillOpacity="0.5"
                initial={{
                  d: "M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                }}
                animate={{
                  d: [
                    "M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                    "M0,192L80,186.7C160,181,320,171,480,165.3C640,160,800,160,960,154.7C1120,149,1280,139,1360,133.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                    "M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 60,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                fill="#ffffff"
                fillOpacity="0.3"
                initial={{
                  d: "M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                }}
                animate={{
                  d: [
                    "M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                    "M0,224L80,229.3C160,235,320,245,480,240C640,235,800,213,960,213.3C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                    "M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 80,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          {/* Slower, smoother star particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, index) => {
              const size = Math.random() * 3 + 1
              const left = `${Math.random() * 100}%`
              const top = `${Math.random() * 100}%`
              const animationDuration = Math.random() * 10 + 20 // Much slower

              return (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: size,
                    height: size,
                    left,
                    top,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0], // Very subtle opacity change
                  }}
                  transition={{
                    duration: animationDuration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut", // Smoother easing
                    delay: Math.random() * 10,
                  }}
                />
              )
            })}
          </div>

          {/* Ki Nav */}
          <KiNav />

          {/* Content */}
          <div className="relative min-h-screen text-white font-sans flex flex-col items-center justify-center z-10">
            <AnimatePresence>
              {!isTransitioning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-center z-10 relative px-6 w-full max-w-4xl mx-auto"
                >
                  <motion.h1
                    initial={{ letterSpacing: "0.2em", opacity: 0 }}
                    animate={{ letterSpacing: "0.5em", opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-8xl font-thin mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                  >
                    Ki
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="text-xl font-light text-white mb-8"
                  >
                    The friend every couple needs
                  </motion.p>

                  {/* Fixed height container with absolute positioning for taglines */}
                  <div className="relative h-16 mb-16">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTagline}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <p className="text-2xl font-extralight text-white px-4 drop-shadow-sm">
                          {taglines[currentTagline]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startDemo}
                        className="flex items-center justify-center space-x-4 bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg"
                      >
                        <span>See Ki in action</span>
                        <ArrowRight className="ml-2" />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isTransitioning && (
                <motion.div
                  initial={{ scale: 0, borderRadius: "100%" }}
                  animate={{ scale: 20, borderRadius: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-blue-500 z-20"
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-8 right-8 flex justify-between text-white/80 text-sm font-light z-10"
            >
              <span>&copy; 2025 Ki</span>
              <span className="text-white/60">Helping relationships thrive</span>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen">
          <Chat accessToken={accessToken} autoConnect={true} />
        </div>
      )}
    </div>
  )
}

export default KiLanding
