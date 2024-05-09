import '/src/styles/Responsable.css'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '/src/config/axios';
import { useNavigate } from 'react-router-dom';

//Import FileSaver para descargar archivos
import FileSaver from 'file-saver';

export default function Reponsable() {
  var [responsables, setResponsables] = useState([]);

  const Navegacion = useNavigate() //Variable para usar la navegación

  //Función para verificar si el usuario está autenticado
  function islogged() {
    const token = localStorage.getItem('AUTH TOKEN')
    if (token === null) {
      Navegacion('/auth')
    }
  }

  //Obtener Responsables
  const ObtenerResponsables = async () => {
    var respuesta = await clienteAxios.get(`/api/objects/responsables`)
    setResponsables(respuesta.data)
  }

  useEffect(() => {
    islogged();
    ObtenerResponsables()
  }, [])

  const GenerarExcelResponsable = async (e) => {
    e.preventDefault();
    try {

      // Variable DESCARTADA, generaba problemas con la letra "ñ" y acentos
      //var respons = SelectorResponable_Excel.value.replace(/\s/g, "%20").replace(/\s*\([^)]*\)/, '') //Variable Nombre Responsable (Sin Espacios y sin parentesis)

      //Variable Nombre Responsable
      var respons = SelectorResponable_Excel.value

      //Variable para dividir el nombre del responsable y obtener solo el nombre
      let partes = respons.split(" ");
      let NombreResp = partes.slice(0, 3).join(" ");

      var NombreGuion = respons.replace(/\s/g, "_")
      NombreResp = NombreResp.replace(/\s/g, "%20")

      console.log(NombreResp)

      //Petición para enviar los codigos y obtener el archivo Excel
      const respuesta = await clienteAxios.get(`/api/objects/xlsx/${NombreResp}`, { responseType: 'blob' });

      //Descargar archivo Excel
      const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `${NombreGuion}_Reporte.xlsx`);

      toast.success('Excel generado correctamente')
    } catch (error) {
      console.log(error)
      toast.error('Error al generar el Excel') 
    }

  }

  return (
    <div className='ContainerFull_Responsable'>
      <Toaster position='top-left' richColors expand={true} toastOptions={{
        style: {
          fontSize: '22px',
          width: 'max-content',
          position: 'absolute',
        }
      }} />
      <section className='Section_Responsable'>
        <div>
          <Link to="/"><button id='btnRegresarRep'>Regresar</button></Link>
        </div>
        <div className='ConResp_Full' >
          <div className='ConResp_HeaderForm'>
            <label htmlFor="Responable_Excel">Selecciona el responsable que deseas general el excel:</label>
          </div>
          <div className='ConResp_BodyForm'>
            <select name="Responable_Excel" id="SelectorResponable_Excel">
              {responsables.map((responsable) => (
                <option key={responsable._id} value={responsable._id}>{responsable}</option>
              ))}
            </select>
            <button type='submit' id='btnResp_GenerarResp' onClick={GenerarExcelResponsable}>Generar Excel del Responsable</button>
          </div>

        </div>

      </section>
    </div >
  )
}
