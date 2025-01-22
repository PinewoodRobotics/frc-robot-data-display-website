"use client";

interface ArrowProps {
  x: number; // x position of arrow start
  y: number; // y position of arrow start
  angle: number; // angle in degrees
  length: number; // length of arrow
  width?: number; // width of arrow shaft
  headSize?: number; // size of arrow head
  color?: string; // color of arrow
  className?: string; // additional CSS classes
  showHead?: boolean; // option to hide arrow head and just show line
}

export default function Arrow({
  x,
  y,
  angle,
  length,
  width = 4,
  headSize = 12,
  color = "white",
  className = "",
  showHead = true,
}: ArrowProps) {
  // Convert angle to radians
  const angleRad = (angle - 90) * (Math.PI / 180);

  // Calculate end point
  const endX = x + length * Math.cos(angleRad);
  const endY = y + length * Math.sin(angleRad);

  // Calculate arrow head points
  const headAngle1 = angleRad - Math.PI / 6;
  const headAngle2 = angleRad + Math.PI / 6;

  const head1X = endX - headSize * Math.cos(headAngle1);
  const head1Y = endY - headSize * Math.sin(headAngle1);
  const head2X = endX - headSize * Math.cos(headAngle2);
  const head2Y = endY - headSize * Math.sin(headAngle2);

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      className={className}
    >
      {/* Arrow shaft */}
      <line
        x1={x}
        y1={y}
        x2={showHead ? endX - headSize * Math.cos(angleRad) : endX}
        y2={showHead ? endY - headSize * Math.sin(angleRad) : endY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      {/* Arrow head */}
      {showHead && (
        <polygon
          points={`${endX},${endY} ${head1X},${head1Y} ${head2X},${head2Y}`}
          fill={color}
          stroke={color}
          strokeWidth={1}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
