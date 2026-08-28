type GujaratiMotifProps = {
  className?: string;
};

export default function GujaratiMotif({
  className = "",
}: GujaratiMotifProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="60"
          cy="60"
          r="42"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />

        <circle
          cx="60"
          cy="60"
          r="24"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        {[0, 45, 90, 135].map((rotation) => (
          <path
            key={rotation}
            d="M60 18 C66 34 74 42 90 48 C74 54 66 62 60 78 C54 62 46 54 30 48 C46 42 54 34 60 18Z"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
            transform={`rotate(${rotation} 60 60)`}
          />
        ))}

        <circle
          cx="60"
          cy="60"
          r="3"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}