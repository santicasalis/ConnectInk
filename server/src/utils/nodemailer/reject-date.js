const rejectDate = (name, date) => {
    return `
    <h1>Tu reserva no se pudo completar</h1>
    <h2>Tu turno con ${name} no fue procesado</h2>
    <h3>La fecha del turno era el ${date}</h3>
    <h3>Si quieres este turno, intenta reservarlo de vuelta volviendo a entrar a la pagina de reservas</h3>
    <h5>Ante cualquier duda comunicarse a connectinkproject@gmail.com</h5>
    `
}

module.exports = rejectDate