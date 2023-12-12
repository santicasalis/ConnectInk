const welcomeCustomer = (name) => {
    return `
    <h1>¡${name}, bienvenido/a a nuestra página!</h1>
    <h3>Gracias por registrarte con nosotros</h3>
    <h3>Empieza a explorar la página, para encontrar al artista perfecto para ti!</h3>
    <a href="http://localhost:3000/explore"> Ingresa aquí para empezar tu experiencia ConnectInk!</a>
    `
    }
    
    module.exports = welcomeCustomer