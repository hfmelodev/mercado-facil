type BrandIconProps = {
  size: number;
};

export function BrandIcon({ size }: Readonly<BrandIconProps>) {
  const padding = size * 0.18;
  const radius = size * 0.26;
  const strokeWidth = Math.max(10, size * 0.06);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#10b981",
        borderRadius: radius,
      }}
    >
      <svg
        width={size - padding * 2}
        height={size - padding * 2}
        viewBox="0 0 24 24"
        fill="none"
        role="img"
        aria-label="Mercado Facil"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Mercado Facil</title>
        <path
          d="M4 10L6.5 19H17.5L20 10H4Z"
          stroke="white"
          strokeWidth={strokeWidth / 20}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 10V8.25C9 6.45 10.35 5 12 5C13.65 5 15 6.45 15 8.25V10"
          stroke="white"
          strokeWidth={strokeWidth / 20}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 13.5H15" stroke="white" strokeWidth={strokeWidth / 20} strokeLinecap="round" />
      </svg>
    </div>
  );
}
