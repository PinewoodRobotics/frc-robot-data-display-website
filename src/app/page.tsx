"use client";

import { useCallback, useEffect, useState } from "react";

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
import { NetworkTableBridge } from "types_plugin_frc_nw_table";
import Robot, { Node } from "./components/Robot";
import {
  FieldObject,
  FieldText,
  Obstacle,
  PlayingField,
  VelocityMeter,
} from "./components/PlayingField";

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
  const [startPolling, setStart] = useState<boolean>(false);
  const [wheelPositions, setWheelPositions] = useState<Node[]>([]);

  const [obstacles, setObstacles] = useState<Obstacle[]>([
    {
      x: 200,
      y: 300,
    },
  ]);

  const [odometry, setOdometry] = useState<Node>({ x: 0, y: 0 });

  const fetchWheelPositions = useCallback(async () => {
    const response = await NetworkTableBridge.getEntryAndClean({
      topic: "robot_wheel_positions",
    });

    if (!response.Err && response.Ok && response.Ok.topic !== "ERROR") {
      try {
        const data = JSON.parse(JSON.parse(response.Ok.value));
        setWheelPositions(data);
      } catch (error) {
        console.error("Error parsing wheel positions:", error);
      }
    }
  }, []);

  const fetchOdometry = useCallback(async () => {
    const response = await NetworkTableBridge.getEntryAndClean({
      topic: "robot_odometry",
    });

    if (!response.Err && response.Ok && response.Ok.topic !== "ERROR") {
      try {
        const data = JSON.parse(JSON.parse(response.Ok.value));
        setOdometry(data);
      } catch (error) {
        console.error("Error parsing odometry data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (startPolling) {
      const interval = setInterval(() => {
        fetchWheelPositions();
        fetchOdometry();
      }, 25);

      return () => clearInterval(interval);
    }
  }, [startPolling, fetchWheelPositions, fetchOdometry]);

  return (
    <main className="flex flex-col">
      <div className="w-1/3 h-[600px]">
        <div className="mx-5 h-full">
          <PlayingField showAxes={true} axisColor="#4b5563">
            <FieldObject
              x={0}
              y={0}
              objDimensions={{ width: 150, height: 150 }}
            >
              <Robot
                width={150}
                height={150}
                wheelPositions={wheelPositions}
                wheelSize={20}
                globalDirectionVector={{ x: 0, y: 1 }}
                rotationVector={{ x: 0.5, y: 1 }}
              />
            </FieldObject>
            <div className="absolute top-2 left-2 w-16 h-64">
              <VelocityMeter velocity={1} maxVelocity={10} />
            </div>
          </PlayingField>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="w-32 h-16 bg-blue-500 m-5 rounded-lg"
          onClick={() => setStart(!startPolling)}
        >
          {startPolling ? "Stop Output Getter" : "Start Output Getter"}
        </button>
      </div>
    </main>
  );
}

// TODO:
