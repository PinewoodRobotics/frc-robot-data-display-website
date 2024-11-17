"use client";

import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MotorOutputChart } from "./components/MotorOutputChart";
import { NetworkTableBridge } from "types_plugin_frc_nw_table";
import Robot from "./components/Robot";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [value, setValue] = useState<{ timestamp: number; output: number }[]>(
    []
  );
  const [startPolling, setStart] = useState<boolean>(false);
  const [angle, setAngle] = useState<number>(0);

  useEffect(() => {
    if (!startPolling) return;

    const interval = setInterval(async () => {
      const response = await NetworkTableBridge.getEntryAndClean({
        topic: "motor_speed",
      });

      if (!response.Err && response.Ok) {
        const ok = response.Ok;
        setValue((prevValue) => [
          ...prevValue,
          {
            timestamp: ok.timestamp,
            output: parseFloat(ok.value),
          },
        ]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startPolling]);

  useEffect(() => {
    // Increment the angle periodically to simulate rotation
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 2) % 360); // Increase angle and wrap around at 360 degrees
    }, 50); // Update every 50ms (~20 updates per second)

    return () => clearInterval(interval);
  }, []);

  async function makeGetMotorOutputRequest() {
    const response = await fetch("/api/database/get-entry-and-clean", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: "motor_speed" }),
    });

    return await response.json();
  }

  // Calculate rotating vectors based on the current angle
  const wheelVectors = [
    {
      x: Math.cos((angle * Math.PI) / 180),
      y: Math.sin((angle * Math.PI) / 180),
    },
    {
      x: Math.cos(((angle + 90) * Math.PI) / 180),
      y: Math.sin(((angle + 90) * Math.PI) / 180),
    },
    {
      x: Math.cos(((angle + 180) * Math.PI) / 180),
      y: Math.sin(((angle + 180) * Math.PI) / 180),
    },
    {
      x: Math.cos(((angle + 270) * Math.PI) / 180),
      y: Math.sin(((angle + 270) * Math.PI) / 180),
    },
  ];

  return (
    <main className="flex flex-col gap-y-20">
      <button
        className="w-60 h-40 bg-blue-500 m-5"
        onClick={async () => {
          setStart(true);
        }}
      >
        Start Motor Output Getter
      </button>
      <div className="bg-gray-700 w-fit h-fit px-32 py-24 rounded-lg mx-auto">
        <Robot
          width={400}
          height={200}
          wheelVectors={wheelVectors}
          name="Rocinante"
        />
      </div>
    </main>
  );
}
