import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR, { mutate } from "swr";

export const useAuth = ({ middleware, url }) => {
    //Variable para usar la navegación
    const Navegacion = useNavigate()

    //Guardar Token en localstorage
    const token = localStorage.getItem('AUTH TOKEN')


    const { data: user, error, mutate } = useSWR('/api/users', () =>
        clienteAxios('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    )

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
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH TOKEN')
            await mutate(undefined)
        } catch (error) {
            console.log(error.response.data.errors)
        }
    }

    //Validar si el usuario está autenticado
    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            Navegacion(url)
        }
        if (middleware === 'auth' && error) {
            Navegacion('/auth')
        }
    }, [user, error])

    //Retornar valores
    return {
        login,
        user,
        error
    }
}

export default useAuth;