// Get Document Object Model (DOM) elements
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-key");
const charCount = document.getElementById("char-count");
const processButton = document.getElementById("process-button");
const action = document.getElementById("action");

// Get the file input element
const fileUpload = document.getElementById("file-upload");

// Update character count whenever input text changes
inputText.addEventListener("input", function () {
    charCount.textContent = inputText.value.length;
});


// Process input text (encrypt or decrypt) when Process button is clicked
processButton.addEventListener("click", function () {
    if (action.value === "encrypt") {
        encrypt();
    } else {
        decrypt();
    }
});

// Update input text placeholder when action (encrypt/decrypt) is changed
action.addEventListener("change", function () {
    if (action.value === "encrypt") {
        inputText.placeholder = "Enter text to encrypt...";
    } else {
        inputText.placeholder = "Enter text to decrypt...";
    }
});

// Caesar Cipher encryption function
function encrypt() {
    const shift = parseInt(shiftKey.value);
    const input = inputText.value;
    let output = "";

    // Iterate through each character in the input string
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);

        // Handle uppercase letters
        if (charCode >= 65 && charCode <= 90) {
            output += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        }
        // Handle lowercase letters
        else if (charCode >= 97 && charCode <= 122) {
            output += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        }
        // Handle other characters (leave them unchanged)
        else {
            output += input.charAt(i);
        }
    }

    // Set the encrypted text as the output text
    outputText.value = output;
}

// Caesar Cipher decryption function
function decrypt() {
    const shift = parseInt(shiftKey.value);
    const input = inputText.value;
    let output = "";

    // Iterate through each character in the input string
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);

        // Handle uppercase letters
        if (charCode >= 65 && charCode <= 90) {
            output += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
        }
        // Handle lowercase letters
        else if (charCode >= 97 && charCode <= 122) {
            output += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
        }
        // Handle other characters (leave them unchanged)
        else {
            output += input.charAt(i);
        }
    }

    // Set the decrypted text as the output text
    outputText.value = output;
}

// Handle file upload
fileUpload.addEventListener("change", function () {
    if (fileUpload.files.length === 0) {
        return;
    }

    const file = fileUpload.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        inputText.value = e.target.result;
        charCount.textContent = inputText.value.length;
        if (action.value === "encrypt") {
            encrypt();
        } else {
            decrypt();
        }
    };    

    reader.readAsText(file);
});

// Populate the shift key dropdown with options from 2 to 25
for (let i = 2; i <= 25; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    shiftKey.add(option);
}
