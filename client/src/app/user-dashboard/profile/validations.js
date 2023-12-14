export const validateName = (name) => {
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "El nombre solo debe contener letras";
  }
  return "";
};

export const validatePassword = (password) => {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/.test(
      password
    )
  ) {
    return "La contraseña no cumple con los requisitos (6-15 caracteres, una mayúscula, una minúscula, un número y un carácter especial)";
  }
  return "";
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return "";
};
