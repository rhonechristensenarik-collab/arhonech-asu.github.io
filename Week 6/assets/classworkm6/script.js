
//Timer Functions Source: 
    //https://www.freecodecamp.org/news/javascript-timer-how-to-set-a-timer-function-in-js
    //ChatGPT for clarification and reworking


function addTask() {
    const text = getText();
    if (checkIfEmpty(text)) return;

    const listElement = addToList(text);
    document.getElementById("user-list").appendChild(listElement);

    const timerValue = document.getElementById("timer").value;

    if (isValidTimer(timerValue)) {
        makeTimer(listElement, timerValue);
    }
}

function addToList(text) {
    const list = document.createElement("li");
    list.textContent = text;

    list.onclick = function () {
        deleteElement(list);
    };

    return list;
}


class Timer {
    constructor(setTime) {
        this.interval = 1000;
        this.currentTime = setTime * this.interval;
    }

    tickTime() {
        this.currentTime -= this.interval;
    }

    timerIsOver() {
        return this.currentTime <= 0;
    }

    getCurrentTime() {
        return Math.ceil(this.currentTime / 1000);
    }

    getCurrentTimeInText() {
        return this.getCurrentTime() + "s";
    }
}

function isValidTimer(timerValue) {
    return timerValue != -1;
}

function makeTimer(list, seconds) {
    let currentTime = new Timer(seconds);
    let interval = 1000;

    const timerDisplay = document.createElement("span");
    timerDisplay.style.marginLeft = "10px";

    timerDisplay.onclick = stopTimerPropagation;

    list.appendChild(timerDisplay);

    const timer = setInterval(() => {
        tickTock(currentTime, list, timerDisplay, interval)
    }, interval);
}

function tickTock(timer, list, display, interval)   {
    timer.tickTime();
    display.textContent = timer.getCurrentTimeInText();

    if (timer.timerIsOver())    {
        clearInterval(interval);
        deleteElement(list);
    }
}

function stopTimerPropagation(e)    {
    e.stopPropagation();
}

function deleteElement(list) {
    list.remove();
}

function checkIfEmpty(text) {
    return !text;
}

function getText() {
    const input = document.getElementById("user-input");
    return input.value.trim();
}