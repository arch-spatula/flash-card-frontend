const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkEmail(email: string) {
  return emailRegex.test(email);
}
