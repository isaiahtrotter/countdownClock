function updateClock() {
  const now = new Date();

  // EST is UTC-5, but we'll handle Daylight Saving Time (EDT is UTC-4)
  const estOffset = now.getTimezoneOffset() === 300 ? -5 : -4; // EST is UTC-5, EDT is UTC-4

  // Calculate the current time in EST
  const estNow = new Date(now.getTime() + estOffset * 60 * 60 * 1000);

  // Calculate the next midnight in EST and subtract 4 hours
  const nextMidnight = new Date(
    estNow.getFullYear(),
    estNow.getMonth(),
    estNow.getDate() + 1,
    0,
    0,
    0
  );

  // Subtract 4 hours from next midnight to adjust the countdown
  const adjustedMidnight = nextMidnight.getTime() - 4 * 60 * 60 * 1000;

  // Calculate time remaining until the adjusted midnight in EST
  const timeRemaining = adjustedMidnight - estNow.getTime();

  const hours = String(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2, "0");

  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

function getDailyWord() {
  const startDate = new Date("2024-08-13T05:00:00Z"); // Start date in UTC corresponding to midnight EST
  const now = new Date();
  const estOffset = now.getTimezoneOffset() === 300 ? -5 : -4; // EST is UTC-5, EDT is UTC-4

  const estNow = new Date(now.getTime() + estOffset * 60 * 60 * 1000);
  const daysSinceStart = Math.floor(
    (estNow.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const wordIndex = daysSinceStart % words.length;
  document.getElementById("word").textContent = words[wordIndex];
}

function start() {
  getDailyWord();
  updateClock();
  setInterval(updateClock, 1000);

  // Check if the time is midnight in EST and update the word if it is
  setInterval(() => {
    const now = new Date();
    const estOffset = now.getTimezoneOffset() === 300 ? -5 : -4;
    const estNow = new Date(now.getTime() + estOffset * 60 * 60 * 1000);
    if (estNow.getHours() === 0 && estNow.getMinutes() === 0 && estNow.getSeconds() === 0) {
      getDailyWord();
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", start);
