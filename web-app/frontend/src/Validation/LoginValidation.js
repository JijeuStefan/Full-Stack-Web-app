function LoginValidation(email, password){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if (email === ""){
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(email)){ 
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }

    if (password === ""){
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(password)){ 
        error.password = "Password didn't match"
    }
    else {
        error.password = ""
    }

    return error;
}

export default LoginValidation;