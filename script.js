const typingText = document.querySelector(".typing-text p");
const tryAgainBtn = document.querySelector("button");
const timeTag = document.querySelector(".time b");
const mistakeTag = document.querySelector(".mistake b");
const wpmTag = document.querySelector(".wpm b");
const cpmTag = document.querySelector(".cpm b");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false;

const inputField = document.createElement("textarea");
inputField.style.position = "absolute";
inputField.style.opacity = 0;
document.body.appendChild(inputField);
inputField.focus();

let chars = typingText.innerText.split("");
typingText.innerHTML = "";
chars.forEach(char => {
  typingText.innerHTML += `<span>${char}</span>`;
});
let charSpans = typingText.querySelectorAll("span");

function initTyping() {
  let typedChar = inputField.value.charAt(charIndex);

  if (charIndex < charSpans.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(updateTimer, 1000);
      isTyping = true;
    }

    if (typedChar === charSpans[charIndex].innerText) {
      charSpans[charIndex].classList.add("correct");
    } else {
      charSpans[charIndex].classList.add("incorrect");
      mistakes++;
    }

    charSpans[charIndex].classList.add("active");
    if (charIndex > 0) {
      charSpans[charIndex - 1].classList.remove("active");
    }

    charIndex++;

    // Update stats
    let correctChars = charIndex - mistakes;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = correctChars;
    let wpm = Math.round((correctChars / 5) / ((maxTime - timeLeft) / 60));
    wpmTag.innerText = wpm > 0 ? wpm : 0;
  }

  if (charIndex === charSpans.length || timeLeft === 0) {
    clearInterval(timer);
    inputField.blur();
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  inputField.value = "";
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
  wpmTag.innerText = 0;

  charSpans.forEach(span => {
    span.classList.remove("correct", "incorrect", "active");
  });
  charSpans[0].classList.add("active");
  inputField.focus();
}

inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

window.onload = () => {
  charSpans[0].classList.add("active");
  inputField.focus();
};
