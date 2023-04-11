module.exports = function loginValidate(req) {
    const { email, password } = req;
  
    // CHECK IF EMAIL IS PRESENT AND IN A VALID FORMAT
    if (!email || !email.includes("@")) {
      return {
        error: true,
        status: 400,
        message: "Invalid email" 
    };
    }
  
    // CHECK IF PASSWORD IS AT LEAST 8 CHARACTERS
    else if (!password || password.length < 8) {
      return {
        error: true,
        status: 400,
        message: "Invalid password" 
    };
    }
    return {
        error: false,
        status: 200,
        message: "Valid credentials"
    }
  }
