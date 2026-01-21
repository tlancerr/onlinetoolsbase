"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("0");
  const [climate, setClimate] = useState("normal");
  const [result, setResult] = useState<string | null>(null);

  function calculateWater() {
    if (!weight) {
      setResult("Please enter your weight.");
      return;
    }

    const w = parseFloat(weight);

    // Base water intake formula: 35 ml per kg
    let dailyMl = w * 35;

    // Activity adjustment: +350 ml per 30 minutes of exercise
    const act = parseFloat(activity);
    dailyMl += act * 350;

    // Climate adjustment
    if (climate === "hot") dailyMl *= 1.2;
    if (climate === "cold") dailyMl *= 0.9;

    const liters = (dailyMl / 1000).toFixed(2);

    setResult(`Recommended Daily Water Intake: ${liters} liters per day.`);
  }

  return (
    <ToolLayout
      title="Daily Water Intake Calculator"
      description="Calculate your recommended daily water intake based on weight, activity level, and climate."
      category="Health and Fitness Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Weight (kg)</label>
          <input
            type="number"
            className="tool-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Daily Physical Activity</label>
          <select
            className="tool-input"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="0">No exercise</option>
            <option value="1">30 minutes/day</option>
            <option value="2">60 minutes/day</option>
            <option value="3">90 minutes/day</option>
            <option value="4">120+ minutes/day</option>
          </select>
        </div>

        <div>
          <label className="tool-label">Climate</label>
          <select
            className="tool-input"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="hot">Hot Climate</option>
            <option value="cold">Cold Climate</option>
          </select>
        </div>

        <button onClick={calculateWater} className="btn-primary">
          Calculate Water Intake
        </button>

        {result && (
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
