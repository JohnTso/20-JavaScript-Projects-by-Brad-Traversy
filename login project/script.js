const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2  = document.getElementById("password2");


function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    
}

function checkEmail(input){
    const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(input.value.trim()).search (filter) != -1){
        showSuccess(input);
    } else{
        showError(input, "Email is not valid");
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if (input.value.trim() === ""){
            console.log(input.id);
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    });

}

function checkLength(input, min , max){
    if (input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordMatch(input, input2){
    if (input.value !== input2.value){
        showError(input2, "Passwords do not match");
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener("submit", function(e){
    e.preventDefault();


    checkRequired([username, email, password, password2]);

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2)

    // if (username.value === ""){
    //     showError(username, "Username is required");
    // } else{
    //     showSuccess(username);
    // }

    // if (email.value === ""){
    //     showError(email, "Email is required");
    // } else if (!isValidEmail(email.value)){
    //     showError(email, "Email is not valid");
    // }
    // else{
    //     showSuccess(email);
    // }

    // if (password.value === ""){
    //     showError(password, "Password is required");
    // } else{
    //     showSuccess(password);
    // }

    // if (password2.value === ""){
    //     showError(password2, "Confirm password is required");
    // } else{
    //     showSuccess(password2);
    // }
});
