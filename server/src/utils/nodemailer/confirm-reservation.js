const confirmReservation = (name, date) => {
    return `
    <h1>Turno confirmado!</h1>
    <h2>Tienes un turno con ${name} el ${date}</h2>
    <h3>Ante cualquier inconveniente, puedes cancelar el turno desde tu perfil</h3>
    `   
}
module.exports = confirmReservation
