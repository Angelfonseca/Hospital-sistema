// Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

// Images
import Doctor from '/src/assets/Doctors.svg'
import Aguas from '/src/assets/Aguas.png'

// Styles
import '/src/styles/Login.css'

export default function Login() {
  return (
    <div className='Con_Login'>
      <div>
        <img src={Aguas} alt="Aguas Logo" />
        <img src={Doctor} alt="Doctor Logo" id='DoctorSVG'/>
      </div>
      <div>
        <div className="Form_Login">
            <h1>Bienvenido!</h1>
            <p id='PDatos'>¡Ingresa los datos para poder iniciar sesión correctamente!</p>
            <input type="email" name="" id="LoginInput" placeholder="Usuario"/>
            <input type="password" name="" id="LoginInput" placeholder="Contraseña"/>
            <input type="submit" value="Iniciar Sesión" id='BtnLogin'/>
        </div>
      </div>
    </div>
  )
}
