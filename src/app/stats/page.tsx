"use client";

import { RobotStats } from "../components/RobotStats";

export default function Stats() {
  return (
    <div className="p-8">
      <RobotStats>
        <div className="text-white">
          <p>No robot data available</p>
        </div>
      </RobotStats>
    </div>
  );
}
