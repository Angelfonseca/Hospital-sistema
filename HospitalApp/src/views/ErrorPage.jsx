import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#039497',
            textAlign: 'center',
        }
    }>
      <h1>¡Oops!</h1>
      <p>Ocurrio un error inesperado. ¡Intenta escanear otro código!</p>
        <Link to="/reportes">
            <button style={
                {
                    fontSize: '20px',
                    padding: '10px',
                    marginTop: '20px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }
            }
            >Regresar</button>
        </Link>
    </div>
  );
}