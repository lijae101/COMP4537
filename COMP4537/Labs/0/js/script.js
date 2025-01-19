/* 
    Open AI ChatGPT was used to assist in the scrambleButtons method and the startMemoryGame method.
*/

// Get the label element by its ID
const labelElement = document.getElementById("inputLabel");
labelElement.textContent = userprompt;

// Button class to represent individual buttons
class Button {
    constructor(id) {
        this.id = id;
        this.element = this.createButton();
    }

    //Method to create a button
    createButton() {
        const button = document.createElement("button");
        button.id = this.id;
        button.textContent = this.id;
        button.style.height = "5em";
        button.style.width = "10em";
        button.style.backgroundColor = this.randomColor();
        button.style.margin = "0.5em";
        return button;
    }

    //Method to generate a random color
    randomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    //Method to set the position of the button
    setPosition(x, y) {
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
    }

    //Method to set the position of the button to absolute
    setToAbsolute() {
        this.element.style.position = "absolute";
    }
}

// ButtonManager class to manage the buttons
class ButtonManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.buttons = [];
    }

    //Method to create n buttons
    createButtons(n) {
        // Clear existing buttons
        this.container.innerHTML = "";

        // Create and add new buttons
        for (let i = 1; i <= n; i++) {
            const button = new Button(i);
            this.buttons.push(button);
            this.container.appendChild(button.element);
        }

    }

    //Method to scramble the buttons randomly
    scrambleButtons(n, callback){
        let scrambleCount = 0;
        const scrambleInterval = setInterval(() => {
            this.buttons.forEach(button => {
                button.setToAbsolute();

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const buttonWidth = button.element.offsetWidth;
                const buttonHeight = button.element.offsetHeight;
                const maxX = windowWidth - buttonWidth; 
                const maxY = windowHeight - buttonHeight;

                const x = Math.random() * (maxX); 
                const y = Math.random() * (maxY);
                button.setPosition(x, y);
                });

            scrambleCount++;
            if (scrambleCount >= n) {
                clearInterval(scrambleInterval);
                callback();
            }
        }, 2000);
    }

    //Method to hide the numbers once shuffled
    hideNumbers() {
        this.buttons.forEach(button => {
            button.element.textContent = "";
        });
    }

    //Method to reveal the numbers after game ends
    revealNumbers() {
        this.buttons.forEach(button => {
            button.element.textContent = button.id;
        });
    }
}
// Game class to manage the game flow
class Game {
    constructor() {
        this.buttonManager = new ButtonManager("buttonsContainer");
        this.inputField = document.getElementById("buttonCreation");
        this.expected = 1;
        this.startGame();
    }

    //Method to reset the game
    resetGame() {
        this.expected = 1;
        const msg = document.getElementById("message");
        msg.innerHTML = "";
    
    }

    //Method to validate the input (3-7)
    validateInput(n) {
        if (isNaN(n) || n < 3 || n > 7) {
            const msg = document.getElementById("message");
            msg.innerHTML = inputValidation;
            return false;
        } else {
            return true;
        }
    }

    //Method to start the game
    startGame() {
        this.resetGame();
        const n = parseInt(this.inputField.value.trim());
        if (!this.validateInput(n)) {
            return;
        }
        this.buttonManager.createButtons(n);
        setTimeout(() => {
            this.scrambleButtons(n);
         }, n * 1000);
    }

    //Method to scramble the buttons
    scrambleButtons(n) {
        this.buttonManager.scrambleButtons(n, () => {
            this.startMemoryGame();
        });
    }

    //Method to start the memory part of the game
    startMemoryGame() {
        this.buttonManager.hideNumbers();
        const msg = document.getElementById("message");
        let expected = this.expected;
        this.buttonManager.buttons.forEach(button => {
            button.element.addEventListener("click", () => {
                if (parseInt(button.id) === expected) {
                    button.element.textContent = button.id;
                    expected++;

                    if(expected > this.buttonManager.buttons.length) {
                        msg.innerHTML = congratulations;}
                } else {
                    msg.innerHTML = wrong;
                    this.buttonManager.revealNumbers();
                }
            });
            
    });
}
}

// Create a new game when the "Go!" button is clicked
document.getElementById("goButton").addEventListener("click", () => {
    new Game();
});