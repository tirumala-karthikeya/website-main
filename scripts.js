document.addEventListener("DOMContentLoaded", () => {
    // ==============================
    // Dynamic Header Rotating Text
    // ==============================
    
    // Array of words to rotate through
    const words = ["Healthcare", "Finance", "Technology", "Innovation", "Medicine"];
    let currentWordIndex = 0;
    const rotatingWord = document.getElementById("rotatingWord");
    
    // Set initial text and animate it in
    rotatingWord.textContent = words[currentWordIndex];
    rotatingWord.classList.add("slide-in");
    
    function changeWord() {
      // Slide the current word out upward
      rotatingWord.classList.add("slide-out");
    
      // Wait for slide-out animation to finish before changing text
      rotatingWord.addEventListener("animationend", function handleSlideOut() {
        // Remove the slide-out class
        rotatingWord.classList.remove("slide-out");
    
        // Update word index and text
        currentWordIndex = (currentWordIndex + 1) % words.length;
        rotatingWord.textContent = words[currentWordIndex];
    
        // Animate new word sliding in from below
        rotatingWord.classList.add("slide-in");
    
        // Remove slide-in class once animation completes so it's ready for the next cycle
        rotatingWord.addEventListener("animationend", function handleSlideIn() {
          rotatingWord.classList.remove("slide-in");
        }, { once: true });
    
        // Remove this slide-out event listener so it doesn't trigger repeatedly
        rotatingWord.removeEventListener("animationend", handleSlideOut);
      }, { once: true });
    }
    
    // Change word every 3 seconds
    setInterval(changeWord, 3000);});
