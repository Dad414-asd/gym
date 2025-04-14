import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const schedule = [
  { day: "Thứ 2", exercises: ["Deadlift", "Pull-up", "Barbell Row", "EZ Bar Curl"], meals: ["Sáng: Yến mạch + sữa", "Trưa: Cơm + ức gà + rau", "Tối: Cá hồi + khoai lang"] },
  { day: "Thứ 3", exercises: ["Bench Press", "Incline Press", "Dips", "Triceps Pushdown"], meals: ["Sáng: Bánh mì đen + trứng", "Trưa: Cơm + bò + rau", "Tối: Salad + cá ngừ"] },
  { day: "Thứ 4", exercises: ["Cardio nhẹ", "Stretching", "Đi bộ hoặc nghỉ ngơi"], meals: ["Sáng: Cháo yến mạch", "Trưa: Cơm + thịt gà + rau", "Tối: Trứng luộc + súp"] },
  { day: "Thứ 5", exercises: ["Overhead Press", "Lateral Raise", "Front Raise", "Plank"], meals: ["Sáng: Ngũ cốc + sữa chua", "Trưa: Cơm + cá + rau", "Tối: Gà nướng + khoai"] },
  { day: "Thứ 6", exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Lunges"], meals: ["Sáng: Chuối + bơ đậu phộng", "Trưa: Cơm + bò xào", "Tối: Cá nướng + rau"] },
  { day: "Thứ 7", exercises: ["Push-up", "Pull-up", "Goblet squat", "Abs Circuit"], meals: ["Sáng: Trứng + bánh mì", "Trưa: Bún bò", "Tối: Súp lơ + thịt nạc"] },
  { day: "Chủ nhật", exercises: ["Nghỉ ngơi phục hồi", "Ăn uống đầy đủ", "Ngủ đủ 7-8 tiếng"], meals: ["Sáng: Tự do", "Trưa: Ăn theo sở thích", "Tối: Nhẹ nhàng"] },
];

export default function App() {
  const [checked, setChecked] = useState(() => JSON.parse(localStorage.getItem("checked") || "{}"));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak") || "0", 10));
  const [today] = useState(new Date().toLocaleDateString("vi-VN", { weekday: "long" }));
  const [selectedDay, setSelectedDay] = useState(null);
  const [bodyLog, setBodyLog] = useState(() => JSON.parse(localStorage.getItem("bodyLog") || "[]"));
  const [newEntry, setNewEntry] = useState({ date: "", height: "", weight: "" });

  useEffect(() => localStorage.setItem("checked", JSON.stringify(checked)), [checked]);
  useEffect(() => localStorage.setItem("streak", streak), [streak]);
  useEffect(() => localStorage.setItem("bodyLog", JSON.stringify(bodyLog)), [bodyLog]);

  const toggle = (day, index) => {
    const key = `${day}-${index}`;
    const newChecked = { ...checked, [key]: !checked[key] };
    setChecked(newChecked);

    const allDone = schedule.flatMap(d => d.exercises.map((_, i) => `${d.day}-${i}`)).every(k => newChecked[k]);
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

  const handleLogSubmit = () => {
    if (!newEntry.date || !newEntry.height || !newEntry.weight) return;
    setBodyLog([...bodyLog, newEntry]);
    setNewEntry({ date: "", height: "", weight: "" });
  };

  const weeklyData = bodyLog.map(entry => ({
    date: entry.date,
    weight: parseFloat(entry.weight)
  }));

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "linear-gradient(to bottom, #111, #222)", minHeight: "100vh", color: "white" }}>
      <h1>🗓️ Hôm nay: {today}</h1>
      <h2>🔥 Chuỗi ngày liên tiếp: {streak}</h2>

      <div style={{ margin: "20px 0", padding: 15, border: "1px solid #444", borderRadius: 8 }}>
        <h3>📊 Cập nhật tình trạng cơ thể</h3>
        <input placeholder="Ngày (vd: 2024-04-15)" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} style={{ marginRight: 10 }} />
        <input placeholder="Chiều cao (cm)" value={newEntry.height} onChange={e => setNewEntry({ ...newEntry, height: e.target.value })} style={{ marginRight: 10 }} />
        <input placeholder="Cân nặng (kg)" value={newEntry.weight} onChange={e => setNewEntry({ ...newEntry, weight: e.target.value })} style={{ marginRight: 10 }} />
        <button onClick={handleLogSubmit}>Lưu</button>

        <ul style={{ marginTop: 15 }}>
          {bodyLog.map((entry, i) => (
            <li key={i}>📅 {entry.date} — 🧍‍♂️ {entry.height}cm — ⚖️ {entry.weight}kg</li>
          ))}
        </ul>
      </div>

      <div style={{ height: 300, background: "#fff", padding: 10, borderRadius: 10, marginBottom: 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip />
            <Bar dataKey="weight" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {schedule.map(({ day }) => (
          <button key={day} onClick={() => setSelectedDay(day)} style={{ padding: "10px 15px", backgroundColor: selectedDay === day ? "#ffc107" : "#333", border: "none", color: "white", cursor: "pointer", borderRadius: 5 }}>
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
                    <input type="checkbox" checked={checked[key] || false} onChange={() => toggle(selectedDay, i)} />
                    {checked[key] ? <del>{ex}</del> : ex}
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