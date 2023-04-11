module.exports = function loginValidate(req) {
    const { email, password } = req;
  
    // Check if email is present and in a valid format
    if (!email || !email.includes("@")) {
      return {
        error: true,
        status: 400,
        message: "Invalid email" 
    };
    }
  
    // Check if password is present and at least 8 characters long
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
