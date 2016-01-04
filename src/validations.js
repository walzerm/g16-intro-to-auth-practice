var validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var isEmpty = function(string) {
    return string.length === 0;
}

var emailValidator = function(email) {
    var errorMessage = "";
    if(!validateEmail(email)){
        errorMessage = 'Dear Idiot: Do you not have hands? Can you not type? That email is invalid.';
    }
    if (isEmpty(email)) {
        errorMessage = 'Did the cat eat your tongue? Please follow email direction this time.';
    }
    return errorMessage;
}

var passwordValidator = function(password, confirmPassword) {
    var errorMessage = "";
    if (!isEmpty(password)) {
        if (password !== confirmPassword) {
            errorMessage = 'They dont match. Like your socks. And your soul.'
        }
    }
    else{
        errorMessage = 'Did the cat eat your tongue? Please follow password direction this time.';
    }

    return errorMessage;
}

var ErrorGenerator = function(user){
    var errors = [];
    errors.push(emailValidator(user.email));
    errors.push(passwordValidator(user.password, user.confirmPassword));
    return errors;
}

module.exports = {error: ErrorGenerator};
