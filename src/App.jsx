import React, { useState, useEffect } from "react";

function App() {
  // Define the target date (August 10th of the current year)
  const targetDate = new Date();
  targetDate.setMonth(7); // August is month 7 (0-indexed)
  targetDate.setDate(8);
  targetDate.setHours(0, 0, 0, 0); // Set to midnight for a full day countdown

  // If the target date has already passed this year, set it for next year
  if (targetDate.getTime() < new Date().getTime()) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Set up an interval to update the timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }
    return timeLeft;
  }

  const timerComponents = [];

  const labels = {
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
  };

  Object.keys(timeLeft).forEach((interval) => {
    if (interval === "expired") return;

    if (timeLeft[interval] >= 0) {
      timerComponents.push(
        <div
          key={interval}
          className="flex flex-col items-center mx-4 p-4  rounded-lg"
        >
          <span className="text-white text-6xl font-extrabold">
            {timeLeft[interval]}
          </span>
          <span className="text-gray-400 text- mt-2">{labels[interval]}</span>
        </div>
      );
    }
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 font-inter">
      <h1 className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
        Quanto manca
      </h1>
      {timeLeft.expired ? (
        <span className="text-green-400 text-5xl font-semibold">
          Il tempo è scaduto!
        </span>
      ) : (
        <div className="flex flex-wrap justify-center">
          {timerComponents.length ? (
            timerComponents
          ) : (
            <span className="text-white text-5xl font-semibold">
              Caricamento timer...
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
