//Images
import add from "/src/assets/add.png"
import edit from "/src/assets/edit.png"
import inventory from "/src/assets/inventory.png"
import { useAuth } from '../Hook/UseAuth'

// Styles
import "/src/styles/Inicio.css"

//Link 
import {Link} from 'react-router-dom'

export default function Inicio() {

  //Funcion para cerrar sesión
  const { logout } = useAuth({
    middleware: 'auth',
    url: '/auth',
  });


  return (
    <div className="ContainerFull_Inicio">
      <div>
        <button id="BtnSalir" onClick={logout}>Salir</button>
      </div>
      <div className="Con_Inicio">
        <div>
          <Link to={"/reportes"}>
            <img src={inventory} alt="Imagen Inventario" id="InicioImg"/>
            <p>Reportes</p>
          </Link>
        </div>
        <div>
          <Link to={"/editar"}>
            <img src={edit} alt="Imagen Editar" id="InicioImg"/>
            <p>Editar</p>
          </Link>
        </div>
        <div>
          <Link to={"/añadir"}>
            <img src={add} alt="Imagen Añadir" id="InicioImg"/>
            <p>Añadir</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
