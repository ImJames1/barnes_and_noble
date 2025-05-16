"use strict";

// Switch Page to Night Mode
function changeTheme(){
    let html = document.querySelector("html");
    html.classList.toggle("darkMode");

    document.getElementById("themeChangeImg").classList.toggle("show");
    document.getElementById("themeChangeImg").classList.toggle("hide");

    document.getElementById("themeChangeImg2").classList.toggle("show");
    document.getElementById("themeChangeImg2").classList.toggle("hide");
}

// Change Theme Event Handlers
document.getElementById("themeChangeImg").addEventListener("click", changeTheme);
document.getElementById("themeChangeImg2").addEventListener("click", changeTheme);


//Array of Buttons
let allSwitchButtons = Array.from(document.getElementsByClassName("switchButton"));

//Switch Between Products When Button Clicked
allSwitchButtons.forEach(function(button){
    button.addEventListener("click", function(){
        for(let i = 1; i < allSwitchButtons.length + 1; i++){
          console.log("btn" + i);
            if(button.id == "btn" + i){
                document.getElementById("product" + i).classList.add("show");
                document.getElementById("product" + i).classList.remove("hide");
            }
            else{
                document.getElementById("product"+i).classList.remove("show");
                document.getElementById("product" + i).classList.add("hide");
            }
        }
    });
}); 
 
// Guessing Game
// Random Number Generator
function generateRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Check and Output User Guess
function checkUserGuess(event){
    event.preventDefault();
    let userGuess = parseInt(document.getElementById("userGuess").value);
    let generateNum = generateRandomNumber(1, 10);
    let result = document.getElementById("gameResult");
    if(userGuess >= 1 && userGuess <= 10){
        if(userGuess === generateNum){
            result.textContent = "Hooray, you win! You guessed correctly!";
        }
        else{
            result.textContent = "Oops wrong guess. Try again!";
        }
    document.querySelector("#userNumOutput span").textContent = `${userGuess}`;
    document.querySelector("#winningNumOutput span").textContent = `${generateNum}`;
    }else{
        result.textContent = "Please enter a number between 1 and 10";
    }
}

// Game Event Handler
document.getElementById("gameSubmitButton").addEventListener("click", checkUserGuess);


//Check Form
//Validate Phone Number
function validatePhone(){
    let checkPhone = document.getElementById("phoneNumber").value;
    let phoneError = document.getElementById("phoneError");
    let phoneReg = /\d\d\d\d\d\d\d\d\d\d/;

    if(!(phoneReg.test(checkPhone))){ 
        phoneError.textContent = "Please enter valid 10 digit phone number with no special characters";
        return false;
    }
    else{
        phoneError.textContent = "";
        return true;
    }
}
//Validate Email
function validateEmail(){
    
    let checkEmail = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    let emailReg = /^\S+@\S+\.\S+$/;

    if(!(emailReg.test(checkEmail))){
        emailError.textContent = "Please enter valid email address";
        console.log(emailError.textContent);
        return false;
    }
    else{
        emailError.textContent = "";
        return true;
    }
}

//Check Form Input
function checkForm(event){
    event.preventDefault();
    let form = document.getElementById("customerForm");
    let isValidArray = [];
    let isNotRequiredValid = true;

    // Reset Output of User Information
    document.getElementById("formValid").classList.remove("show");
    document.getElementById("formValid").classList.add("hide");

    document.getElementById("formInfo").textContent = "";
    
  
    //Validate First Name
    let checkFirstName =  document.getElementById("fName").value;
    let fNameError = document.getElementById("fNameError");

    if(checkFirstName === ""){
        fNameError.textContent = "Please enter first name";
        isValidArray.push(false);
    }
    else{
        fNameError.textContent = "";
    }

    //Validate Last Name
    let checkLastName =  document.getElementById("lName").value;
    let lNameError = document.getElementById("lNameError");

    if(checkLastName === ""){
        lNameError.textContent = "Please enter last name";
        isValidArray.push(false);
    }
    else{
        lNameError.textContent = "";
    }

    //Check which Radio Button is Checked and Handle Each Case
    let radioEmail = document.getElementById("prefEmail");
    let radioPhone = document.getElementById("prefPhone");
    let radioError = document.getElementById("radioError");
    if(!(radioEmail.checked || radioPhone.checked)){
        radioError.textContent = "Please check your preferred contact method";
        isValidArray.push(false);
    }
    else{
        radioError.textContent = "";
        if(radioPhone.checked){
            isValidArray.push(validatePhone());
           
            if(document.getElementById("email").value != ""){
                isNotRequiredValid = validateEmail();
            }
            else{
                document.getElementById("emailError").textContent = "";
            }
        }
        else if(radioEmail.checked){
            isValidArray.push(validateEmail());
            if(document.getElementById("phoneNumber").value != ""){
                isNotRequiredValid = validatePhone();
            }
            else{
                document.getElementById("phoneError").textContent = "";
            }    
        }
    }

    //Validate Comments
    let checkComments = document.getElementById("comments").value;
    let commentsError = document.getElementById("commentsError");

    if(checkComments === ""){
        commentsError.textContent = "Please enter a comment";
        isValidArray.push(false);
    }
    else{
        commentsError.textContent = "";
    }

    // Check all Input is Valid
    if(!(isValidArray.includes(false)) && isNotRequiredValid){
        let customers = {
            firstName: checkFirstName,
            lastName: checkLastName,
            phoneNumber: document.getElementById("phoneNumber").value,
            email: document.getElementById("email").value
        };
        // Show Thank You and Inputted Information to User
        document.getElementById("formValid").classList.remove("hide");
        document.getElementById("formValid").classList.add("show");
        
        //Create Newline to Separate User Data
        document.getElementById("formInfo").style.whiteSpace = "pre-line";
        for(let key in customers){
            document.getElementById("formInfo").textContent += "\n" + key + ": " + customers[key];
        }
        // Reset Form
        form.reset();
    }
}

// Form Handler
document.getElementById("customerForm").addEventListener("submit", checkForm);




