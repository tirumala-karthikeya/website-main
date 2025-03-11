// Words to rotate through
const rotatingWords = [
    "HRMS",
    "Insurance",
    "Hospitality",
    "QSR"
  ];
  
  // Animation timing constants
  const WORD_DURATION = 3000;   // 3 seconds per word
  const FADE_DURATION = 500;    // Fade out/in duration in ms
  
  // Get the DOM element for the rotating word
  const rotatingWordEl = document.getElementById('rotatingWord');
  let currentIndex = 0;
  
  /**
   * Measure the widest word (in pixels) to fix the container width
   * so that text doesn't shift when words change length.
   */
  function measureMaxWidth(words) {
    const measureDiv = document.createElement('div');
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.position = 'absolute';
    measureDiv.style.whiteSpace = 'nowrap';
    document.body.appendChild(measureDiv);
  
    let maxWidth = 0;
    words.forEach(word => {
      measureDiv.textContent = word;
      maxWidth = Math.max(maxWidth, measureDiv.offsetWidth);
    });
  
    document.body.removeChild(measureDiv);
    return maxWidth;
  }
  
  // Fix container width to the widest word to prevent layout shifts
  const maxWidth = measureMaxWidth(rotatingWords);
  rotatingWordEl.style.width = maxWidth + 'px';
  
  /**
   * Helper: Create a new word element with initial opacity 0.
   * We'll fade it in after it is appended.
   */
  function createWordElement(text) {
    const el = document.createElement('span');
    el.textContent = text;
    el.style.opacity = '0';
    el.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
    el.style.display = 'inline-block';
    return el;
  }
  
  // Insert the first word and fade it in
  const firstWord = createWordElement(rotatingWords[0]);
  rotatingWordEl.appendChild(firstWord);
  
  requestAnimationFrame(() => {
    firstWord.style.opacity = '1';
  });
  
  /**
   * Switch words by:
   * 1. Fading out the old word.
   * 2. Removing it.
   * 3. Appending the new word.
   * 4. Fading in the new word.
   */
  function switchWord() {
    const oldWord = rotatingWordEl.firstChild;
  
    // Fade out the old word
    oldWord.style.opacity = '0';
  
    // After fade out completes, remove old word, then load the new one
    setTimeout(() => {
      if (rotatingWordEl.contains(oldWord)) {
        rotatingWordEl.removeChild(oldWord);
      }
  
      // Determine next word
      currentIndex = (currentIndex + 1) % rotatingWords.length;
      const newWord = createWordElement(rotatingWords[currentIndex]);
  
      // Append the new word (initially invisible)
      rotatingWordEl.appendChild(newWord);
  
      // Fade in the new word on the next animation frame
      requestAnimationFrame(() => {
        newWord.style.opacity = '1';
      });
  
    }, FADE_DURATION);
  }
  
  // Rotate words at the specified interval
  setInterval(switchWord, WORD_DURATION);
  