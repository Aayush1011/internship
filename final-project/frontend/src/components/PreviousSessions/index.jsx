import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionHook from "../../hooks/useSessionHook";

const PreviousSessions = () => {
  const { getAllUserSessions } = useSessionHook();
  const [allUserSessions, setAllUserSessions] = useState({});
  const navigateToSession = useNavigate();

  useEffect(() => {
    getAllUserSessions().then((result) => {
      setAllUserSessions(result.data);
    });
  }, []);

  const goToSession = (
    sessionId,
    sessionName,
    sessionDescription,
    sessionStatus
  ) => {
    if (sessionStatus === "active") {
      localStorage.setItem(
        "sessionDetails",
        JSON.stringify({
          name: sessionName,
          description: sessionDescription,
          sessionId,
        })
      );
      navigateToSession(`/session/${sessionId}`);
    }
  };

  const tableHeadings = ["name", "status", "count"].map((heading) => (
    <th className="sessions-table__title">{heading}</th>
  ));

  const userDataRows = (
    sessionName,
    sessionStatus,
    sessionCount,
    sessionId,
    sessionDescription
  ) => (
    <tr
      className="sessions-table__row"
      onClick={() =>
        goToSession(sessionId, sessionName, sessionDescription, sessionStatus)
      }
    >
      <td className="sessions-table__data">{sessionName}</td>
      <td className="sessions-table__data">{sessionStatus}</td>
      <td className="sessions-table__data">{sessionCount}</td>
    </tr>
  );

  return (
    <div className="sessions">
      <h1 className="sessions-title">Sessions</h1>
      {allUserSessions.message === "success" ? (
        <div>
          <table className="sessions-table">
            <thead>
              <tr className="sessions-table_title">{tableHeadings}</tr>
            </thead>
            <tbody>
              {allUserSessions.rows.map((row) =>
                userDataRows(
                  row.name,
                  row.status,
                  row.count,
                  row.id,
                  row.description
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="sessions-rejection_container">
          <h2 className="sessions-rejection_text">No sessions found</h2>
        </div>
      )}
    </div>
  );
};

export default PreviousSessions;
