export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center px-6 py-3"
    >
      <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#b99155]/60" />

      <svg
        width="46"
        height="24"
        viewBox="0 0 46 24"
        fill="none"
        className="mx-3"
      >
        {/* stem */}

        <path
          d="M4 12C11 12 15 9 18 5"
          stroke="#b99155"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <path
          d="M42 12C35 12 31 9 28 5"
          stroke="#b99155"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* leaves */}

        <path
          d="M15 7C10 7 9 3 9 3C14 3 16 5 15 7Z"
          fill="#b45e43"
          opacity="0.8"
        />

        <path
          d="M31 7C36 7 37 3 37 3C32 3 30 5 31 7Z"
          fill="#b45e43"
          opacity="0.8"
        />

        {/* centre flower */}

        <circle
          cx="23"
          cy="12"
          r="2.4"
          fill="#d49a52"
        />

        <ellipse
          cx="23"
          cy="7"
          rx="2"
          ry="4"
          fill="#b45e43"
        />

        <ellipse
          cx="23"
          cy="17"
          rx="2"
          ry="4"
          fill="#b45e43"
        />

        <ellipse
          cx="18"
          cy="12"
          rx="4"
          ry="2"
          fill="#b45e43"
        />

        <ellipse
          cx="28"
          cy="12"
          rx="4"
          ry="2"
          fill="#b45e43"
        />
      </svg>

      <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#b99155]/60" />
    </div>
  );
}