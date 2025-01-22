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
import { FieldObject, Obstacle, PlayingField } from "./components/PlayingField";

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

  const [odometry, setOdometry] = useState<Node[]>([]);

  // robot/odometry

  const fetchWheelPositions = useCallback(async () => {
    const response = await NetworkTableBridge.getEntryAndClean({
      topic: "robot_wheel_positions",
    });

    if (!response.Err && response.Ok && response.Ok.topic !== "ERROR") {
      try {
        let data = response.Ok.value;

        // Handle double stringification
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (error) {
            console.error("Error parsing data:", data, error);
            return; // Exit early if parsing fails
          }
        }

        console.log("Data:", data);

        // Handle the case where data is still a string
        if (typeof data === "string") {
          try {
            data = JSON.parse(data); // Parse again if needed
          } catch (error) {
            console.error("Error parsing data a second time:", data, error);
            return; // Exit early if parsing fails
          }
        }

        // Validate the structure
        if (Array.isArray(data)) {
          const validData = data.filter(
            (v) =>
              v &&
              typeof v.x === "number" &&
              typeof v.y === "number" &&
              !isNaN(v.x) &&
              !isNaN(v.y)
          );

          setWheelPositions(validData);
        } else {
          console.error("Data is not a valid array:", data);
        }
      } catch (error) {
        console.error("Error parsing wheel positions:", error);
      }
    }
  }, []);

  const fetchOdometry = useCallback(async () => {
    const response = await NetworkTableBridge.getEntryAndClean({
      topic: "robot/odometry",
    });

    if (!response.Err && response.Ok && response.Ok.topic !== "ERROR") {
      try {
        console.log(response.Ok.value);
        setOdometry(JSON.parse(response.Ok.value));
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
  }, [startPolling, fetchWheelPositions]);

  return (
    <main className="flex flex-col gap-y-20">
      <button
        className="w-60 h-40 bg-blue-500 m-5"
        onClick={() => setStart(true)}
      >
        Start Output Getter
      </button>
      <div className="bg-gray-700 w-fit h-fit px-32 py-24 rounded-lg mx-auto">
        <Robot width={400} height={200} wheelPositions={wheelPositions} />
      </div>
      <div className="w-[800px] h-[600px] mx-auto">
        <PlayingField>
          <FieldObject
            {...obstacles[0]}
            className="bg-red-500 rounded-md w-10 h-10"
          />
          <FieldObject x={0} y={0}>
            <Robot
              width={150}
              height={100}
              wheelPositions={wheelPositions}
              wheelSize={20}
              globalDirectionVector={{ x: 0, y: 1 }}
            />
          </FieldObject>
        </PlayingField>
      </div>
    </main>
  );
}

// TODO:
