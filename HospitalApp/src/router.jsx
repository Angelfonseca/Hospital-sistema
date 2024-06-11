import {createBrowserRouter} from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

//Views
import Login from './views/Login.jsx';
import Inicio from './views/Inicio.jsx';
import Reportes from './views/Reportes.jsx';
import Editar from './views/Editar.jsx';
import Añadir from './views/Añadir.jsx';
import Error from './views/Error.jsx';
import ErrorPage from './views/ErrorPage.jsx';
import Responsable from './views/Reponsable.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { 
                index:true,
                element: <Inicio/> 
            },
             {
                 path: '/reportes',
                 element: <Reportes/>,
                 errorElement: <ErrorPage/>
            },
            {
                path: '/editar',
                element: <Editar/>
            },
            {
                path: '/añadir',
                element: <Añadir/>
            
            },
            {
                path: '/Responsable',
                element: <Responsable/>
            
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { 
                index:true, 
                element: <Login/> 
            },
        ]
    },
    {
        path: '*',
        element: <Error/>
    }
    
])

export default router