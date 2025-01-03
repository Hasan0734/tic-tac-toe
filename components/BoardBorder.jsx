import React from "react";
import { motion } from "framer-motion";

const BoardBorder = () => {
  return (
    <svg
      className="stroke-primary stroke-[6px] m-auto w-[216px] h-full absolute -top-[4px] inset-0 z-10"
     
    >
      <motion.path
        d="M108,83L6,83"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M108,153L6,153"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M108,83L210,83"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M108,153L210,153"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M73,118L73,16"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M143,118L143,16"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M73,118L73,220"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M143,118L143,220"
        initial={{ strokeDasharray: 52 }}
        animate={{ strokeDasharray: 102 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

export default BoardBorder;
