function updateClock() {
  const now = new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const hours = String(utcNow.getUTCHours()).padStart(2, "0");
  const minutes = String(utcNow.getUTCMinutes()).padStart(2, "0");
  const seconds = String(utcNow.getUTCSeconds()).padStart(2, "0");

  const clockElement = document.getElementById("clock");
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;

  // Apply the tick animation manually on every second update
  clockElement.classList.remove("tick-animation");
  void clockElement.offsetWidth; // Trigger reflow to restart the animation
  clockElement.classList.add("tick-animation");
}

function getDailyWord() {
  const startDate = new Date("2024-01-01T00:00:00Z"); // Change this to your start date
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const wordIndex = daysSinceStart % words.length;
  document.getElementById("word").textContent = words[wordIndex];
}

function start() {
  updateClock();
  getDailyWord();
  setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", start);
