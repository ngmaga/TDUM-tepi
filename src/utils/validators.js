export function isValidEmail(email) {
    const trimmedEmail = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  }
  
  export function isStrongPassword(password) {
    return password.length >= 6;
  }