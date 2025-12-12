"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { div } from "motion/react-client";

const AnimationY = ({ children }) => {
  const ref = useRef();

  const isInVew = useInView(ref, { once: true });

  const mainControl = useAnimation();
  useEffect(() => {
    if (isInVew) {
      mainControl.start("visible");
    }
  }, [isInVew]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{
          direction: 0.8,
          delay: 0.25,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimationY;
