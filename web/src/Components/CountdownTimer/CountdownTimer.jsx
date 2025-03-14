import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [active, setActive] = useState(true);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");

  useEffect(() => {
    const countdown = setInterval(() => {
      // Calculate the time remaining
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        clearInterval(countdown);
        // setTimeRemaining("EXPIRED");
        setActive(false);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setDays(days);
        setHours(hours);
        setMins(minutes);
        setSecs(seconds);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        gap: "10px",
        justifyContent: "center",
        alignItems:"center",
      }}
    >
      {active && (
        <React.Fragment>
          <div className="timer-box">
            <span className="num">{days} </span>
            <span className="text">Days</span>
          </div>
          <div className="timer-box">
            <span className="num">{hours} </span>
            <span className="text">Hours</span>
          </div>
          <div className="timer-box">
            <span className="num">{mins} </span>
            <span className="text">Mins</span>
          </div>
          <div className="timer-box">
            <span className="num">{secs} </span>
            <span className="text">Secs</span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CountdownTimer;
