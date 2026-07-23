export default function Stats({ sessions }) {

    const totalMinutes = sessions.reduce(
        (sum, session) => sum + Number(session.duration),
        0
    );

    const average =
        sessions.length > 0
            ? Math.round(totalMinutes / sessions.length)
            : 0;

    return (

        <div className="stats">

            <div className="stat-card">

                <span className="icon">📚</span>

                <h2>{sessions.length}</h2>

                <p>Focus Sessions</p>

            </div>

            <div className="stat-card">

                <span className="icon">⏱</span>

                <h2>{totalMinutes}</h2>

                <p>Total Minutes</p>

            </div>

            <div className="stat-card">

                <span className="icon">📈</span>

                <h2>{average}</h2>

                <p>Avg / Session</p>

            </div>

        </div>

    );

}