import { useState } from "react";
import api from "../services/api";

export default function SessionForm({ reload }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/sessions", {
      task,
      category,
      duration,
      mood,
    });

    setTask("");
    setCategory("");
    setDuration("");
    setMood("");

    reload();
  };

  return (
    <>
      <h2 className="section-title">Log a Focus Session</h2>

      <p className="section-subtitle">
        Record today's productivity and keep building consistency.
      </p>

      <form onSubmit={submit}>
        <input
          placeholder="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          placeholder="Category (Study, Coding...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          placeholder="How did you feel?"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <button type="submit">🚀 Save Session</button>
      </form>
    </>
  );
}