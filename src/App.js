import React, { useState, useEffect } from "react";

const schedule = [
  {
    day: "Thứ 2",
    exercises: ["Deadlift", "Pull-up", "Barbell Row", "EZ Bar Curl"],
    meals: ["Sáng: Yến mạch + sữa", "Trưa: Cơm + ức gà + rau", "Tối: Cá hồi + khoai lang"]
  },
  {
    day: "Thứ 3",
    exercises: ["Bench Press", "Incline Press", "Dips", "Triceps Pushdown"],
    meals: ["Sáng: Bánh mì đen + trứng", "Trưa: Cơm + bò + rau", "Tối: Salad + cá ngừ"]
  },
  {
    day: "Thứ 4",
    exercises: ["Cardio nhẹ", "Stretching", "Đi bộ hoặc nghỉ ngơi"],
    meals: ["Sáng: Cháo yến mạch", "Trưa: Cơm + thịt gà + rau", "Tối: Trứng luộc + súp"]
  },
  {
    day: "Thứ 5",
    exercises: ["Overhead Press", "Lateral Raise", "Front Raise", "Plank"],
    meals: ["Sáng: Ngũ cốc + sữa chua", "Trưa: Cơm + cá + rau", "Tối: Gà nướng + khoai"]
  },
  {
    day: "Thứ 6",
    exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Lunges"],
    meals: ["Sáng: Chuối + bơ đậu phộng", "Trưa: Cơm + bò xào", "Tối: Cá nướng + rau"]
  },
  {
    day: "Thứ 7",
    exercises: ["Push-up", "Pull-up", "Goblet squat", "Abs Circuit"],
    meals: ["Sáng: Trứng + bánh mì", "Trưa: Bún bò", "Tối: Súp lơ + thịt nạc"]
  },
  {
    day: "Chủ nhật",
    exercises: ["Nghỉ ngơi phục hồi", "Ăn uống đầy đủ", "Ngủ đủ 7-8 tiếng"],
    meals: ["Sáng: Tự do", "Trưa: Ăn theo sở thích", "Tối: Nhẹ nhàng"]
  },
];

export default function App() {
  const [checked, setChecked] = useState(() => {
    const stored = localStorage.getItem("checked")
    return stored ? JSON.parse(stored) : {};
  });

  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem("streak")
    return stored ? parseInt(stored, 10) : 0;
  });

  const [today] = useState(new Date().toLocaleDateString("vi-VN", { weekday: "long" }));
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  const toggle = (day, index) => {
    const key = `${day}-${index}`;
    const newChecked = { ...checked, [key]: !checked[key] };
    setChecked(newChecked);

    const allDone = schedule
      .flatMap(d => d.exercises.map((_, i) => `${d.day}-${i}`))
      .every(k => newChecked[k]);

    if (allDone) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      alert(`🔥 Chuỗi ngày: ${newStreak}! ` + getReward(newStreak));
    }
  };

  const getReward = (s) => {
    if (s === 3) return "Tốt lắm, DAD mới bắt đầu mà rất chăm chỉ!";
    if (s === 5) return "💪 Bền bỉ ghê! 5 ngày rồi đó!";
    if (s === 10) return "🔥 Bạn đang lên form rất tốt!";
    if (s === 15) return "🌟 15 ngày liên tiếp – không ai cản được bạn!";
    if (s === 30) return "🏆 Bạn đang là một chiến binh thực thụ!";
    if (s === 50) return "✨ Cơ thể bạn đang biến đổi rõ rệt!";
    if (s === 75) return "🚀 Không chỉ là thể chất, bạn đang trở thành biểu tượng!";
    if (s === 100) return "💯 Huyền thoại rồi DAD ơi!!!";
    if (s === 150) return "👑 Bạn đã bước vào giới hạn của siêu nhân!";
    return "Tiếp tục duy trì nhé!";
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", backgroundImage: "url('https://i.imgur.com/yoZ1B4m.jpg')", backgroundSize: "cover", minHeight: "100vh", color: "white" }}>
      <h1>🗓️ Hôm nay: {today}</h1>
      <h2>🔥 Chuỗi ngày liên tiếp: {streak}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {schedule.map(({ day }) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{ padding: "10px 15px", backgroundColor: selectedDay === day ? "#ffc107" : "#333", border: "none", color: "white", cursor: "pointer", borderRadius: 5 }}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDay && (
        <div style={{ marginTop: 30 }}>
          <h2>{selectedDay}</h2>
          <h4>Bài tập:</h4>
          <ul>
            {schedule.find(s => s.day === selectedDay).exercises.map((ex, i) => {
              const key = `${selectedDay}-${i}`;
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checked[key] || false}
                      onChange={() => toggle(selectedDay, i)}
                    /> {checked[key] ? <del>{ex}</del> : ex}
                  </label>
                </li>
              );
            })}
          </ul>
          <h4>Chế độ ăn:</h4>
          <ul>
            {schedule.find(s => s.day === selectedDay).meals.map((meal, i) => (
              <li key={i}>{meal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
