
import React, { useState } from "react";

const schedule = [
  {
    day: "Thứ 2",
    exercises: ["Deadlift", "Pull-up", "Barbell Row", "EZ Bar Curl"],
  },
  {
    day: "Thứ 3",
    exercises: ["Bench Press", "Incline Press", "Dips", "Triceps Pushdown"],
  },
  {
    day: "Thứ 4",
    exercises: ["Cardio nhẹ", "Stretching", "Đi bộ hoặc nghỉ ngơi"],
  },
  {
    day: "Thứ 5",
    exercises: ["Overhead Press", "Lateral Raise", "Front Raise", "Plank"],
  },
  {
    day: "Thứ 6",
    exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Lunges"],
  },
  {
    day: "Thứ 7",
    exercises: ["Push-up", "Pull-up", "Goblet squat", "Abs Circuit"],
  },
  {
    day: "Chủ nhật",
    exercises: ["Nghỉ ngơi phục hồi", "Ăn uống đầy đủ", "Ngủ đủ 7-8 tiếng"],
  },
];

export default function App() {
  const [checked, setChecked] = useState({});

  const toggle = (day, index) => {
    const key = `${day}-${index}`;
    setChecked({ ...checked, [key]: !checked[key] });
  };

  return (
    <div style={{ padding: 20 }}>
      {schedule.map(({ day, exercises }) => (
        <div key={day} style={{ marginBottom: 20 }}>
          <h2>{day}</h2>
          <ul>
            {exercises.map((ex, i) => {
              const key = `${day}-${i}`;
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checked[key] || false}
                      onChange={() => toggle(day, i)}
                    />{" "}
                    {checked[key] ? <del>{ex}</del> : ex}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
