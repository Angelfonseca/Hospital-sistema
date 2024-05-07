//Images
import add from "/src/assets/add.png"
import edit from "/src/assets/edit.png"
import inventory from "/src/assets/inventory.png"
import responsable from "/src/assets/Responsable.png"


import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Toaster, toast} from 'sonner'

// Styles
import "/src/styles/Inicio.css"

//Link 
import { Link } from 'react-router-dom'

export default function Inicio() {

  const Navegacion = useNavigate() //Variable para usar la navegación

  //Función para verificar si el usuario está autenticado
  function islogged() {
    const token = localStorage.getItem('AUTH TOKEN')
    if (token === null) {
      Navegacion('/auth')
    }
  }

  useEffect(() => {
    islogged();
  }, [])

  const salir = () => {
    localStorage.removeItem('AUTH TOKEN')
    if(localStorage.getItem('AUTH TOKEN') === null){
      Navegacion('/auth')
      toast.success('Sesión cerrada correctamente')
    }
  }


  return (
    <div className="ContainerFull_Inicio">
      <Toaster position='top-left' expand={true} richColors toastOptions={{
        style: {
          fontSize: '22px',
          width: 'max-content'
        }
      }}/>
      <div>
        <button id="BtnSalir" onClick={salir}>Salir</button>
      </div>
      <div className="Con_Inicio">
        <div className="ConInicio_1">
          <Link to={"/reportes"}>
            <img src={inventory} alt="Imagen Inventario" id="InicioImg" />
            <p>Reportes</p>
          </Link>
        </div>
        <div className="ConInicio_2">
          <Link to={"/editar"}>
            <img src={edit} alt="Imagen Editar" id="InicioImg" />
            <p>Editar</p>
          </Link>
        </div>
        <div className="ConInicio_3">
          <Link to={"/añadir"}>
            <img src={add} alt="Imagen Añadir" id="InicioImg" />
            <p>Añadir</p>
          </Link>
        </div>
        <div className="ConInicio_4">
          <Link to={"/responsable"}>
            <img src={responsable} alt="Imagen Responsable" id="InicioImg" />
            <p>Responsable</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
