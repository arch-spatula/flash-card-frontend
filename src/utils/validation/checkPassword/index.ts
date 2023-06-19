const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]*$/;

export function checkPassword(password: string) {
  return passwordRegex.test(password);
}
