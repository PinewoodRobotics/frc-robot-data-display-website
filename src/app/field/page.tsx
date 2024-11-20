"use client";

import { useState } from "react";
import { FieldObject, PlayingField } from "../components/PlayingField";
import Robot from "../components/Robot";
import { Path } from "../components/Path";

export default function Field() {
  const [obstacles] = useState([
    { x: 200, y: 300 },
    { x: 400, y: 200 },
    { x: 600, y: 400 },
  ]);

  return (
    <div className="w-full h-screen p-8">
      <div className="w-full h-full">
        <PlayingField>
          {/* Add some static obstacles */}
          {obstacles.map((obstacle, i) => (
            <FieldObject
              key={i}
              {...obstacle}
              className="bg-red-500 rounded-md w-10 h-10"
            />
          ))}

          {/* Add a robot */}
          <FieldObject x={50} y={50}>
            <Robot
              width={150}
              height={100}
              wheelPositions={[
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
              ]}
              wheelSize={20}
              name="Robot 1"
              path={[
                { x: 400, y: 300 },
                { x: 425, y: 350 },
                { x: 450, y: 700 },
              ]}
              fontSize="1rem"
              className="bg-blue-500"
            />
          </FieldObject>

          {/* Add a path 
          <Path
            nodes={[
              { x: 50, y: 50, isStart: true },
              { x: 300, y: 250 },
              { x: 500, y: 300, isEnd: true },
            ]}
          />*/}
        </PlayingField>
      </div>
    </div>
  );
}
