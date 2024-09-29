import * as React from "react";
import { SVGProps } from "react";
import { motion } from "framer-motion";

export const HIAnimation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 408 392"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.g
      id="photo"
      animate={{ y: [3, -3, 3] }}
      transition={{
        times: [0, 1],
        duration: 3,
        repeat: Infinity,
        type: "keyframes",
        ease: "easeInOut",
      }}
    >
      <g id="Ellipse 1" filter="url(#filter0_f_2_19)">
        <ellipse cx={215.5} cy={189} rx={188.5} ry={185} fill="#D9E2EC" />
        <path
          d="M403.5 189C403.5 290.888 319.338 373.5 215.5 373.5C111.662 373.5 27.5 290.888 27.5 189C27.5 87.1123 111.662 4.5 215.5 4.5C319.338 4.5 403.5 87.1123 403.5 189Z"
          stroke="#D9E2EC"
        />
      </g>
      <motion.g
        id="person"
        animate={{ rotate: [0, -1, 0] }}
        transition={{
          times: [0, 1],
          duration: 2,
          repeat: Infinity,
          type: "keyframes",
          ease: "easeInOut",
        }}
      >
        <circle
          id="head"
          cx={275}
          cy={115}
          r={69}
          stroke="#004AAD"
          strokeWidth={10}
        />
        <path
          id="body"
          d="M273.689 182.625L273.986 314"
          stroke="#004AAD"
          strokeWidth={10}
        />
        <motion.g
          id="completeLeftArm"
          animate={{ rotate: [0, -3, 0] }}
          transition={{
            times: [0, 1],
            duration: 1,
            repeat: Infinity,
            type: "keyframes",
            ease: "easeInOut",
          }}
          style={{ originX: "273.689px", originY: "182.625px" }}
        >
          <path
            id="leftArm"
            d="M323.064 274.791L273.689 235.291"
            stroke="#004AAD"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            id="leftForearm"
            d="M373.54 222.289L325.254 274.626"
            stroke="#004AAD"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ originX: "325.254px", originY: "274.626px" }}
            animate={{
              rotate: [0, -20, 0],
            }}
            transition={{
              times: [0, 1],
              duration: 1,
              repeat: Infinity,
              type: "keyframes",
              ease: "easeInOut",
            }}
          />
        </motion.g>
        <path
          id="rightArm"
          d="M161.772 280.86L271.787 238.583"
          stroke="#004AAD"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <g id="notebook">
        <path
          id="keyboard"
          d="M316.48 316.791C317.861 316.791 318.98 315.672 318.98 314.291C318.98 312.91 317.861 311.791 316.48 311.791L316.48 316.791ZM72.8974 316.791L316.48 316.791L316.48 311.791L72.8974 311.791L72.8974 316.791Z"
          fill="#808080"
        />
        <path
          id="screen"
          d="M38.006 186.441C37.657 185.147 38.6533 183.883 39.9924 183.921L215.692 188.792C216.612 188.818 217.396 189.468 217.591 190.368L243.128 308.13C243.398 309.378 242.446 310.557 241.169 310.554L72.929 310.209C72.0267 310.207 71.2373 309.601 71.0022 308.73L38.006 186.441Z"
          fill="#D1D1D1"
        />
      </g>
    </motion.g>
    <defs>
      <filter
        id="filter0_f_2_19"
        x={23}
        y={0}
        width={385}
        height={378}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation={2} result="effect1_foregroundBlur_2_19" />
      </filter>
    </defs>
  </svg>
);
