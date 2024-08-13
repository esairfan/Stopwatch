let msecInterval, secondInterval, minuteInterval, hourInterval;

let msecond = 0,
  second = 0,
  minute = 0,
  hour = 0,
  lapCount = 0;

const playButton = document.getElementById("play");
const msecElement = document.getElementById("msecond");
const secondElement = document.getElementById("second");
const minuteElement = document.getElementById("minute");
const hourElement = document.getElementById("hour");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laplist = document.getElementById("laps");
const clearButton = document.getElementById("lap-clear-button");

playButton.addEventListener("click", () => {
  if (playButton.textContent === "Play") {
    playButton.textContent = "Pause";
    resetButton.style.display = "block";
    lapButton.style.display = "block";

    msecInterval = setInterval(() => {
      msecond++;
      if (msecond === 60) msecond = 0;
      msecElement.textContent = msecond < 10 ? `: 0${msecond}` : `: ${msecond}`;
    }, 10);

    secondInterval = setInterval(() => {
      second++;
      if (second === 60) second = 0;
      secondElement.textContent =
        second < 10 ? `: 0${second} ` : `: ${second} `;
    }, 1000);

    minuteInterval = setInterval(() => {
      minute++;
      if (minute === 60) minute = 0;
      minuteElement.textContent = minute < 10 ? ` 0${minute} ` : ` ${minute} `;
    }, 60000);

    hourInterval = setInterval(() => {
      hour++;
      hourElement.textContent = hour < 10 ? `0${hour} :` : `${hour} :`;
    }, 3600000);
  } else if (playButton.textContent === "Pause") {
    playButton.textContent = "Play";

    clearInterval(msecInterval);
    clearInterval(secondInterval);
    clearInterval(minuteInterval);
    clearInterval(hourInterval);
  }
});

resetButton.addEventListener("click", () => {
  msecond = 0;
  second = 0;
  minute = 0;
  hour = 0;

  clearInterval(msecInterval);
  clearInterval(secondInterval);
  clearInterval(minuteInterval);
  clearInterval(hourInterval);

  hourElement.textContent = "00 :";
  minuteElement.textContent = "00";
  secondElement.textContent = ": 00";
  msecElement.textContent = ": 00";

  resetButton.style.display = "none";
  lapButton.style.display = "none";
  playButton.textContent = "Play";

  clearLaps();
});

lapButton.addEventListener("click", () => {
  lapCount++;
  let list = document.createElement("li");
  clearButton.style.display = "block";

  let span1 = document.createElement("span");
  span1.textContent = `${lapCount}-`;
  span1.classList.add("number");

  let span2 = document.createElement("span");
  span2.textContent = `${hour < 10 ? "0" + hour : hour} : ${
    minute < 10 ? "0" + minute : minute
  } : ${second < 10 ? "0" + second : second} : ${
    msecond < 10 ? "0" + msecond : msecond
  }`;
  span2.classList.add("time-stamp");

  list.appendChild(span1);
  list.appendChild(span2);
  list.classList.add("lap-items");
  laplist.appendChild(list);
});

function clearLaps() {
    const laplist = document.getElementById("laps");
    clearButton.style.display = "none";
    lapCount = 0;
    
    Array.from(laplist.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'LI') {
        laplist.removeChild(node);
      }
    });
  }

clearButton.addEventListener("click", clearLaps);
