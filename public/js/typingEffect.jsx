export default function runTypingEffect() {
    const codeOutput = document.getElementById('code-output');
    const buttons = document.querySelectorAll('.code-editor-buttons button');
  
    function scrollToBottom(element) {
      element.scrollTop = element.scrollHeight;
    }
  
    function disableButtons() {
      buttons.forEach(button => button.disabled = true);
    }
  
    function enableButtons() {
      buttons.forEach(button => button.disabled = false);
    }
  
    function typeWriter(text, i = 0) {
      if (i < text.length) {
        codeOutput.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i), 50); // Adjust the typing speed here
        scrollToBottom(codeOutput); // Scroll to bottom after adding content
      } else {
        enableButtons(); // Re-enable buttons after typing is complete
      }
    }
    

    window.writeWelcome = () => {
        disableButtons();
        codeOutput.innerHTML = '';
        typeWriter("Welcome to the portfolio of Vinny Vegas! Im happy that you made it!");
      };

    window.writeAboutMe = () => {
      disableButtons(); // Disable buttons when typing starts
      codeOutput.innerHTML = '';
      typeWriter("Hi, I'm Vinny Vegas. I am 31 years old...");
    };
  
    window.writeHobbies = () => {
      disableButtons();
      codeOutput.innerHTML = '';
      typeWriter("I enjoy Brazilian Jiu Jitsu, Muay Thai, Gaming...");
    };
  
    window.writeWhyCode = () => {
      disableButtons();
      codeOutput.innerHTML = '';
      typeWriter("Coding is fascinating because...");
    };
  
      
        // Call the default message function
        writeWelcome();
      }
      
    function typeWriter() {
      if (i < codeText.length) {
        codeOutput.innerHTML += codeText.charAt(i);
        i++;
        setTimeout(typeWriter, 30); // Adjust the typing speed here
        scrollToBottom(codeOutput);
      }
    }

  