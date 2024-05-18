function StudentValidation(name, email, group){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (name === ""){
        error.name = "Name field should not be empty"
    }
    else {
        error.name = ""
    }

    if (email === ""){
        error.email = "Email field should not be empty"
    }
    else if (!email_pattern.test(email)){ 
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }

    if (group === ""){
        error.group = "Group field should not be empty"
    }
    else if (group < 100 || group > 999){ 
        error.group = "Group should be between 100 and 999"
    }
    else {
        error.group = ""
    }

    return error;
}

export default StudentValidation;