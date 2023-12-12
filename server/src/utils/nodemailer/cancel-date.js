const cancelArtist = (name, date, price) => {
    return `
    <h1>Tu reserva fue cancelada</h1>
    <h2>Tu turno con ${name} fue cancelado</h2>
    <h3>La fecha del turno era el ${date}, y el precio de seña fue ${price}</h3>
    <h5>Ante cualquier duda comunicarse a connectinkproject@gmail.com</h5>
    `
}

module.exports = cancelArtist