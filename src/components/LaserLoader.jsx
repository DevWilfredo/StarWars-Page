import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";
import wdevLogo from '../assets/wdevLogo.png'

export default function LaserLoader() {
  const [animationState, cycleAnimation] = useCycle("off", "on");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleAnimation();
    }, 1700);
    return () => clearInterval(interval);
  }, [cycleAnimation]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8">
      <motion.div
        className="flex items-center gap-16"
        animate={animationState}
        variants={{
          on: { transition: { duration: 1.7 } },
          off: { transition: { duration: 1.7 } },
        }}
      >
        {/* Logo Izquierdo */}
        <motion.img
          src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
          alt="Star Wars Logo"
          className="w-24 h-auto object-contain"
          variants={{
            off: { opacity: 0.15, filter: "blur(6px)" },
            on: { opacity: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        />

        {/* Sable de luz azul más intenso y glow radial */}
        <motion.div
          className="relative w-2 h-60 flex items-center justify-center"
          variants={{
            off: { opacity: 0.15 },
            on: { opacity: 1 },
          }}
          animate={animationState}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        >
          {/* Glow radial */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "#2c75ff",
              filter: "blur(20px)",
              boxShadow: "0 0 40px 15px #2c75ff",
              zIndex: 5,
            }}
            variants={{
              off: { opacity: 0 },
              on: { opacity: 0.6 },
            }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          />

          {/* Núcleo del sable */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(to top, #1d4ed8 0%, #a5b4fc 100%)",
              zIndex: 10,
            }}
            variants={{
              off: { opacity: 0 },
              on: { opacity: 1 },
            }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          />

          {/* Mango del sable */}
          <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-4 h-6 bg-gray-300 rounded-sm shadow-inner z-20" />
        </motion.div>

        {/* Logo Derecho */}
        <motion.img
          src={wdevLogo}
          alt="Star Wars Logo"
          className="w-24 h-auto object-contain"
          variants={{
            off: { opacity: 0.15, filter: "blur(6px)" },
            on: { opacity: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Texto "Cargando..." */}
      <motion.p
        className="text-blue-300 font-bold text-lg tracking-widest"
        variants={{
          off: { opacity: 0.1 },
          on: { opacity: 1 },
        }}
        animate={animationState}
        transition={{ duration: 1.7, ease: "easeInOut" }}
      >
        Cargando...
      </motion.p>
    </div>
  );
}
