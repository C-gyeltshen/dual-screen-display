"use client";

import Squares from "../../component/Squares";
import Dashboard from "../../component/Dashboard";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <div
        style={{ position: "absolute", inset: 0, zIndex: 0, height: "100%" }}
      >
        <Squares />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Dashboard />
      </div>
    </div>
  );
}
