export function AddProfileButton() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dii_10353_13363)">
        <rect
          x="8"
          y="4"
          width="32"
          height="32"
          rx="6"
          fill="url(#paint0_linear_10353_13363)"
          shapeRendering="crispEdges"
        />
        <rect
          x="8.25"
          y="4.25"
          width="31.5"
          height="31.5"
          rx="5.75"
          stroke="url(#paint1_linear_10353_13363)"
          strokeOpacity="0.8"
          strokeWidth="0.5"
          shapeRendering="crispEdges"
        />
        <line
          x1="23.7"
          y1="13.7"
          x2="23.7"
          y2="26.3"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="30.3"
          y1="19.7"
          x2="17.7"
          y2="19.7"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dii_10353_13363"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.921569 0 0 0 0 0.0862745 0 0 0 0 0.164706 0 0 0 0.22 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10353_13363"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10353_13363"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="4" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.358577 0 0 0 0 0.156022 0 0 0 0.19 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_10353_13363"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_10353_13363"
            result="effect3_innerShadow_10353_13363"
          />
        </filter>
        <linearGradient
          id="paint0_linear_10353_13363"
          x1="24"
          y1="4"
          x2="24"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopColor="#190904" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10353_13363"
          x1="8"
          y1="4"
          x2="43.988"
          y2="9.39436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE3AE" />
          <stop offset="0.318468" stopColor="#FF1C1C" />
          <stop offset="0.672639" stopColor="#FFE3AE" />
          <stop offset="0.987012" stopColor="#FF1C1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
