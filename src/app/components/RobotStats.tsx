"use client";

export function RobotStats({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg">
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Robot Statistics</h3>
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
}
