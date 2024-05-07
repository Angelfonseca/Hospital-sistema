import '/src/styles/Responsable.css'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '/src/config/axios';

export default function Reponsable() {
  var [responsables, setResponsables] = useState([]);

  //Obtener Responsables
  const ObtenerResponsables = async () => {
    var respuesta = await clienteAxios.get(`/api/objects/responsables`)
    setResponsables(respuesta.data)
  }

  useEffect(() => {
    ObtenerResponsables()
  }, [])

  const GenerarExcelResponsable = async (e) => {
    e.preventDefault();
    try {
      var respons = SelectorResponable_Excel.value
      //Petición para enviar los codigos y obtener el archivo Excel
      const respuesta = await clienteAxios.get(`/api/objects/responsable/${respons}`, { responseType: 'blob' });

      //Descargar archivo Excel
      const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `${respons}_Reporte.xlsx`);

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
