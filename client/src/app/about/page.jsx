import Link from "next/link";
import Nav from "../../components/nav/Nav";
import { RiReplyLine } from "react-icons/ri";

export default function About() {
  return (
    <>
      <Nav />

      <div className=" mx-4 my-8 text-artistfont md:mx-auto md:max-w-2xl md:px-4">
        <h1 className="text-5xl font-rocksalt text-center mb-10 ">
          Sobre Connect<span className="text-primary">Ink</span>
        </h1>
        <p className="text-lg mb-4  ">
          <p className="font-serif">
            ConnectInk es más que una aplicación; es una comunidad creada por un
            grupo de estudiantes de Henry con una visión única. Nuestra
            plataforma nace del deseo de facilitar la conexión entre amantes del
            arte del tatuaje. Fundada como proyecto final en Henry, ConnectInk
            es la puerta de entrada a un mundo de expresión artística en la
            piel.
          </p>
        </p>
        <br />
        <br />
        <p className="font-bold text-2xl mb-4 font-rocksalt text-primary">
          ¿Quiénes somos?
        </p>
        <p className="font-serif">
          {" "}
          Somos un equipo apasionado que cree en la diversidad y la creatividad.
          En ConnectInk, entendemos que cada tatuaje cuenta una historia única,
          y nuestro objetivo es unir a artistas y clientes de todo el mundo.
          Desde nuestras raíces hasta los rincones más remotos, ConnectInk se
          esfuerza por construir una comunidad global de amantes del tatuaje.
        </p>
        <br />
        <br />
        <p className="font-bold text-2xl mb-4 font-rocksalt text-primary">
          Nuestra Misión
        </p>
        <p className="font-serif">
          ConnectInk tiene su base en la idea de que cada tatuaje es una obra
          maestra en sí misma. Queremos proporcionar a los artistas una
          plataforma donde puedan mostrar su talento y a los entusiastas del
          tatuaje un espacio donde puedan descubrir artistas excepcionales.
          Creemos en la autenticidad, la calidad y la conexión genuina entre
          artistas y clientes
        </p>
        <br />
        <br />
        <p className=" font-bold text-2xl mb-4 font-rocksalt text-primary">
          ¿Por qué ConnectInk ?
        </p>
        <p className="font-serif">
          Desde las aulas de Henry, nos embarcamos en este viaje para ofrecerte
          más que una aplicación; queremos brindarte una experiencia única.
          Imagina encontrar el artista perfecto que llevará a la realidad tu
          visión de arte corporal. En ConnectInk, no solo buscamos satisfacer
          tus expectativas, sino superarlas.
        </p>
        <br />
        <br />
        <p className=" font-bold text-2xl mb-4 font-rocksalt text-primary">
          Únete a la Comunidad ConnectInk
        </p>
        <p className="font-serif">
          Ya sea que estés buscando tu próximo tatuaje o que desees mostrar tu
          portafolio como artista, ConnectInk es el lugar donde la creatividad
          encuentra su hogar. Únete a nosotros y forma parte de una comunidad
          vibrante que celebra la diversidad, la creatividad y la pasión por el
          arte del tatuaje. ¡Esperamos que ConnectInk te lleve más allá de tu
          imaginación!
        </p>
        <br />
        <br />
        <div className="mx-2 my-4 text-artistfont md:mx-auto md:max-w-2xl md:px-2 text-center">
          <p className="font-bold text-2xl mb-4 font-rocksalt text-primary">
            Integrantes
          </p>

          <ul className="flex flex-wrap list-none p-0 justify-center">
            <li className="mr-8 mb-6 text-xl ">
              <a
                href="https://www.linkedin.com/in/santiagocasalis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Santiago Casalis
              </a>
            </li>
            <li className="mr-8 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/constanza-weiner/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Constanza Maria Weiner
              </a>
            </li>
            <li className="mr-6 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/ludmila-grisel-viale/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Ludmila Grisel Viale
              </a>
            </li>{" "}
            <li className="mr-8 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/pedro-gochman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Pedro Gochman
              </a>
            </li>{" "}
            <li className="mr-8 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/facundofernandez1991/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Facundo Fernandez
              </a>
            </li>{" "}
            <li className="mr-6 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/jareddelgado454/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Jared Delgado Tejada
              </a>
            </li>{" "}
            <li className="mr-8 mb-6 text-xl">
              <a
                href="https://www.linkedin.com/in/alejo-guzm%C3%A1n-811988288/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Alejo Guzmán
              </a>
            </li>
            <li className="mr-8 mb-6 text-xl">
              <a
                href="http://linkedin.com/in/facundo-padilla-60371b26a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                Facundo Padilla
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-4 mx-auto mb-10 max-w-screen-lg  flex items-center">
          <Link
            href="/"
            className="flex mx-auto items-center gap-x-2 hover:hover:text-primary  rounded-lg p-4 text-lg"
          >
            <RiReplyLine className=" " />
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
