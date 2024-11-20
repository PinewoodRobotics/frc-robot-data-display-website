"use client";

import { useEffect, useState } from "react";
import { FieldObject } from "./PlayingField";

interface PathNode {
  x: number;
  y: number;
  isStart?: boolean;
  isEnd?: boolean;
  isPath?: boolean;
}

interface PathProps {
  nodes: PathNode[];
  showConnections?: boolean;
  pathColor?: string;
  startColor?: string;
  endColor?: string;
  nodeSize?: number;
  lineWidth?: number;
  nodeClassName?: string;
}

export function Path({
  nodes,
  showConnections = true,
  pathColor = "#4CAF50",
  startColor = "#3B82F6",
  endColor = "#EF4444",
  nodeSize = 5,
  lineWidth = 2,
  nodeClassName = "",
}: PathProps) {
  const halfNodeSize = nodeSize / 2;

  return (
    <>
      {/* Render connections between nodes */}
      {showConnections && nodes.length > 1 && (
        <svg
          className="absolute w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {nodes.map((node, index) => {
            if (index === nodes.length - 1) return null;
            const nextNode = nodes[index + 1];
            return (
              <line
                key={`path-${index}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke={pathColor}
                strokeWidth={lineWidth}
              />
            );
          })}
        </svg>
      )}

      {/* Render nodes 
      {nodes.map((node, index) => (
        <FieldObject
          key={`node-${index}`}
          x={node.x - halfNodeSize}
          y={node.y - halfNodeSize}
          className={`rounded-full ${nodeClassName} ${
            node.isStart
              ? `bg-[${startColor}]`
              : node.isEnd
              ? `bg-[${endColor}]`
              : node.isPath
              ? `bg-[${pathColor}]`
              : "bg-yellow-500"
          }`}
          style={{
            width: nodeSize,
            height: nodeSize,
          }}
        />
      ))}*/}
    </>
  );
}
