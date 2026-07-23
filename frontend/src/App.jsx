import "./App.css";
import { useEffect, useState } from "react";
import api from "./services/api";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import Stats from "./components/Stats";

function App() {
  const [sessions, setSessions] = useState([]);

  const loadSessions = async () => {
    try {
      const res = await api.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <>
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">✦ FocusFlow</div>

        <ul>
          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#dashboard">Dashboard</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>
        </ul>

        <a href="#dashboard" className="open-btn">
          Open App
        </a>
      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            FOCUS • TRACK • GROW
          </span>

          <h1>
            Your Focus.
            <br />
            Your Future.
          </h1>

          <p>
            FocusFlow helps students, developers and
            professionals track productive work sessions,
            measure progress and stay consistent every day.
          </p>

          <a
            href="#dashboard"
            className="hero-button"
          >
            Start Tracking →
          </a>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <h3>Today's Goal</h3>

            <h2>Deep Work</h2>

            <p>
              Build consistency one session at a time.
            </p>

          </div>

        </div>

      </section>

     {/* FEATURES */}

<section id="features" className="features">

    <div className="feature-card">

        <div className="feature-icon">⚡</div>

        <h3>Track Sessions</h3>

        <p>
            Record every productive work session
            and build consistency over time.
        </p>

    </div>

    <div className="feature-card">

        <div className="feature-icon">📊</div>

        <h3>Measure Progress</h3>

        <p>
            Monitor your focus minutes and
            productivity statistics instantly.
        </p>

    </div>

    <div className="feature-card">

        <div className="feature-icon">🔥</div>

        <h3>Stay Consistent</h3>

        <p>
            Create better work habits by
            tracking your daily progress.
        </p>

    </div>

</section>

      {/* DASHBOARD */}

      <section
        id="dashboard"
        className="dashboard"
      >

        <div className="dashboard-heading">

        <h2>Your Productivity Dashboard</h2>

        <p>
            Everything you need to track your focus journey.
        </p>

      </div>

        <Stats sessions={sessions} />

        <SessionForm reload={loadSessions} />

        <SessionList sessions={sessions} />

      </section>

      <footer id="about">

        <h3>FocusFlow</h3>

        <p>
          Built with React, Express and PostgreSQL.
        </p>

      </footer>

    </>
  );
}

export default App;