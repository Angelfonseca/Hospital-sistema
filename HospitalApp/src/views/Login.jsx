// Images
import Doctor from "/src/assets/Doctors.svg";
import Aguas from "/src/assets/Aguas.png";

// Styles
import "/src/styles/Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Toaster, toast } from "sonner";

export default function Login() {
  const [Usuario, setUsuario] = useState("");
  const [Contra, setContra] = useState("");

  const Navegacion = useNavigate(); //Variable para usar la navegación

  //Función para verificar si el usuario está autenticado
  function islogged() {
    const token = localStorage.getItem("AUTH TOKEN");
    if (token !== null) {
      Navegacion("/");
    }
  }

  useEffect(() => {
    islogged();
  }, []);

  // Función de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      username: Usuario.valueOf(Usuario),
      password: Contra.valueOf(Contra),
    };

    // Función de login
    try {
      const { data } = await clienteAxios.post("/api/users/auth/login", datos); // Petición a la API
      localStorage.setItem("AUTH TOKEN", data.token); // Guardar token en el local storage
      Navegacion("/"); // Redirigir a la página principal
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="Conteiner_Login">
      <Toaster
        position="top-left"
        richColors
        expand={true}
        toastOptions={{
          style: {
            fontSize: "22px",
            width: "max-content",
          },
        }}
      />
      <div className="Con_Login">
        <div>
          <img
            src={Aguas}
            alt="Aguas Logo"
          />
          <img
            src={Doctor}
            alt="Doctor Logo"
            id="DoctorSVG"
          />
        </div>
        <div>
          <form
            className="Form_Login"
            onSubmit={handleSubmit}
          >
            <h1>Bienvenido!</h1>
            <p id="PDatos">
              ¡Ingresa los datos para poder iniciar sesión correctamente!
            </p>
            <input
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
              name="username"
              id="LoginInput"
              placeholder="Usuario"
            />
            <input
              value={Contra}
              onChange={(e) => setContra(e.target.value)}
              name="password"
              id="LoginInput"
              placeholder="Contraseña"
              type="password"
            />
            <input
              type="submit"
              value="Iniciar Sesión"
              id="BtnLogin"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
