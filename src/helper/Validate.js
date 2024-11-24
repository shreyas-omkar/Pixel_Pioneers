import { toast } from "react-hot-toast";

//Validation export

//Email
export async function emailValidate (values) {
    const errors = validateMail({}, values);
    return errors
}

//Password 
export async function passValidate (values) {
    const errors = validatePass({}, values);
    return errors
}

//Register Form
export async function RegisterValidate(values) {
    const errors = validateMail({}, values);
    validatePass(errors, values);
    validateConfPass(errors, values);
    return errors;
}

//Login Form
export async function LoginValidate(values) {
    const errors = validateMail({}, values);
    validatePass(errors, values);
    return errors;
}



//Validation For Email 
 function validateMail(error = {}, values) {
    if (!values.email ) {
        error.email = toast.error("Email Required..!!")
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email..!!")
    }

    return error
 }

 //Validification For Password

 function validatePass(error = {}, values) {

    const specialChars= /[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;

    if (!values.password ) {
        error.password = toast.error("Password Required..!!")
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Wrong Password..!!")
    } else if (values.password.length < 6) {
        error.password = toast.error("Password Must Contain 6 Characters..!!")
    }else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password Must Contain Special Characters..!!")
    }

    return error
 }


//Validation For Confirm Password
 function validateConfPass(error = {}, values) {
    if(values.password !== values.conf_password) {
        error.conf_password = toast.error("Your Passwords Should Match..!!")
    }

    return error
 }