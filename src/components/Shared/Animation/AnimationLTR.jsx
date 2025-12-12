"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { div } from "motion/react-client";

const AnimationLTR = ({ children }) => {
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
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{
          direction: 1,
          delay: 0.45,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimationLTR;
