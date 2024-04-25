import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR, { mutate } from "swr";

export const useAuth = ({ middleware, url }) => {
    //Variable para usar la navegación
    const Navegacion = useNavigate()

    //Obtener Token del localstorage
    const token = localStorage.getItem('AUTH TOKEN')

    //Login 
    const login = async (datos) => {
        try {
            const { data } = await clienteAxios.post('/api/users/auth/login', datos)
            localStorage.setItem('AUTH TOKEN', data.token)
            await mutate()
            Navegacion('/')
        } catch (error) {
            console.log(error)
        }
    }

    //Cerrar sesión
    const logout = async () => {
        localStorage.removeItem('AUTH TOKEN')
        Navegacion('/auth')
    }

    //Validar si el usuario está autenticado
    // useEffect(() => {
    //     if (middleware === 'guest' && url && token !== null) {
    //         Navegacion(url)
    //         console.log('Token encontrado')
    //     }
    //     if (token === null) {
    //         Navegacion('/auth')
    //         console.log('No estás autenticado')
    //     }
    // })

    //Retornar valores
    return {
        login,
        logout
    }
}

export default useAuth;