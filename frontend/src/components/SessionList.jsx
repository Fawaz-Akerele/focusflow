export default function SessionList({ sessions }) {

    return (

        <>

            <h2 className="section-title">
                Recent Sessions
            </h2>

            <p className="section-subtitle">
                Your latest productivity records.
            </p>

            {sessions.length === 0 ? (

                <div className="empty-card">

                    <h3>🚀 No sessions yet</h3>

                    <p>

                        Add your first focus session to begin
                        tracking your productivity.

                    </p>

                </div>

            ) : (

                sessions.map((session) => (

                    <div
                        key={session.id}
                        className="card"
                    >

                        <div className="card-header">

                            <h3>
                                📘 {session.task}
                            </h3>

                            <span>
                                {session.duration} mins
                            </span>

                        </div>

                        <p>
                            📂 Category: {session.category}
                        </p>

                        <p>
                            😊 Mood: {session.mood}
                        </p>

                    </div>

                ))

            )}

        </>

    );

}