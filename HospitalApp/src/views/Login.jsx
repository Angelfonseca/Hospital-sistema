// Images
import Doctor from '/src/assets/Doctors.svg'
import Aguas from '/src/assets/Aguas.png'

// Styles
import '/src/styles/Login.css'

import { useAuth } from '../Hook/UseAuth'
import { createRef } from 'react'
import { useState } from 'react'

export default function Login() {
  const [Usuario, setUsuario] = useState('')
  const [Contra, setContra] = useState('')

  const userRef = createRef();
  const passRef = createRef();

  //Funcion para iniciar sesión
  const { login } = useAuth({
    middleware: 'guest',
    url: '/',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      username: Usuario.valueOf(Usuario),
      password: Contra.valueOf(Contra)
    }
    console.log(datos)
    login(datos)
  }

  return (
    <div className='Conteiner_Login'>
      <div className='Con_Login'>
        <div>
          <img src={Aguas} alt="Aguas Logo" />
          <img src={Doctor} alt="Doctor Logo" id='DoctorSVG' />
        </div>
        <div>
          <form className="Form_Login" onSubmit={handleSubmit}>
            <h1>Bienvenido!</h1>
            <p id='PDatos'>¡Ingresa los datos para poder iniciar sesión correctamente!</p>
            <input value={Usuario} onChange={(e) => setUsuario(e.target.value)} name="username" id="LoginInput" placeholder="Usuario" ref={userRef} />
            <input value={Contra} onChange={(e) => setContra(e.target.value)} name="password" id="LoginInput" placeholder="Contraseña" ref={passRef} type="password" />
            <input type="submit" value="Iniciar Sesión" id='BtnLogin' />
          </form>
        </div>
      </div>
    </div>

  )
}
