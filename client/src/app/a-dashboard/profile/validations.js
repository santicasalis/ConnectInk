export function validateInput(formData) {
  let errors = {};

  if (formData.shopName.length === 0) {
    errors.shopName = "El nombre del Estudio es requerido";
  }

  if (formData.fullName.length < 4) {
    errors.fullName = "El nombre completo debe tener más de 4 caracteres";
  }

  if (!/^[a-zA-Z\s]+$/u.test(formData.fullName)) {
    errors.fullName = "El nombre completo sólo puede tener letras";
  }

  if (!/^[\d]+$/.test(formData.phone)) {
    errors.phone = "El formato de teléfono es inválido";
  }

  if (formData.instagram.length >= 1) {
    if (
      !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|www\.[^\s/$.?#].[^\s]*\.com$/.test(
        formData.instagram
      )
    ) {
      errors.instagram = "Debe ingresar  un enlace válido";
    }
  }

  if (formData.address.length === 0) {
    errors.address = "La dirección es requerida";
  }
  if (formData.location.length === 0) {
    errors.location = "La localidad es requerida";
  }

  return errors;
}
