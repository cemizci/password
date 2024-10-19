const lengthSlider = document.querySelector(".pass-length input");
options = document.querySelectorAll(".option input");
copyIcon = document.querySelector(".input-box span");
passwordInput = document.querySelector(".input-box input");
passwordIndicator = document.querySelector(".pass-indicator");
generateBtn = document.querySelector(".generate-btn");


const characters = {
    lowercase: "abcçdefgğhıijklmnoöprsştuüvwxyz",
    uppercase: "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVXWYZ",
    numbers: "0123456789",
    symbols: "/*-+<>!'^%&()=?_|{½$#£>.:æß€é"

}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => { // looping through each option's checkbox
        if(option.checked){ // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                //adding particular key value from character object to staticPassword
            staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword += `${staticPassword}`;
            }else { // else pass true value to excluedeDuplicate
                excludeDuplicate = true;
            }

        }
    });

    for (let i = 0; i < passLength; i++) {
        //getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            //if randomPassword doesn't contains the current random character or randomChar is equal
            //to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }else { //else add random character to randomPassword
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
}


const updatePassIndicator = () => {
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}


const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value ;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const myImage = new Image(20,20);
myImage.src ='check.png';
//document.body.appendChild(myImage);

const twoImg = new Image(20,20);
twoImg.src ='copy.png';

// var getElement=document.querySelector('#username');
// function show() {
//     getElement.style.display="block"
// }

// function hide () {
//     getElement.style.display="none";
// }

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);

    copyIcon.appendChild(myImage);
    
    setTimeout(() => {
        copyIcon.removeChild(myImage)
    }, 2000);
}



copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input" , updateSlider);
generateBtn.addEventListener("click" , generatePassword);