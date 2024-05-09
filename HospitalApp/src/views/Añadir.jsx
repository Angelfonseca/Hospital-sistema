import {Link} from 'react-router-dom';
import clienteAxios from '/src/config/axios';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';

//Images
import AddIcon from '/src/assets/Add_Icon.png';

//Styles
import '/src/styles/Añadir.css';

export default function Añadir() {

  //Variables de producto
  const [asignado, setAsignado] = useState('');
  const [cve_cabms, setClave] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  const [descrip_bm, setDescripcionBm] = useState('');
  const [costo_bien, setCosto] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serie, setSerie] = useState('');
  const [motor, setMotor] = useState('');
  const [recursos, setRecurso] = useState('');
  const [responsable, setResponsable] = useState('');
  const [ubicacion, setArea] = useState('');
  var [consumible, setConsumible] = useState(false);
  var descripcion = 'Descripcion del bien';
  var activo = true;

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

  const store = async (e) => {

    if(CB_ConsumibleAdd.checked === true){
      consumible = true;
    }
    if(CB_ConsumibleAdd.checked === false){
      consumible = false;
    }

    e.preventDefault();
    
    try {
      e.preventDefault();
      await clienteAxios.post('/api/objects/crud/', {asignado: asignado, cve_cabms:cve_cabms, consecutivo:consecutivo, descrip_bm:descrip_bm, costo_bien:costo_bien, marca:marca, modelo:modelo, serie:serie, motor:motor, descripcion:descripcion, recursos:recursos, responsable:responsable, ubicacion:ubicacion, consumible:consumible, activo:activo});
      toast.success('Producto añadido correctamente');

      //Limpiar campos
      setAsignado('');
      setClave('');
      setConsecutivo('');
      setDescripcionBm('');
      setCosto('');
      setMarca('');
      setModelo('');
      setSerie('');
      setMotor('');
      setRecurso('');
      setResponsable('');
      setArea('');
      setConsumible(false);

    } catch (error) {
      toast.error('Error al añadir el producto');
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className='ContainerFull_Add'>
      <Toaster position='top-left' richColors expand={true} toastOptions={{
        style: {
          fontSize: '22px',
          width: 'max-content',
          position: 'absolute',
        }
      }}/>
      <div>
        <Link to="/"><button id='BTN_AddRegresar'>Regresar</button></Link>
      </div>
      <form className='Con_Form_Add' onSubmit={store}>
        <div className='Con_Search_Add'>
          <div>
            <img src={AddIcon} alt="Add Icon" id='Con_AddIcon'/>
            <h2 id='NoMargin'>Añadir un Producto</h2>
          </div>
        </div>

        <div className='Con_Inputs_Add'>

          <div>
            <div>
              <p id='Add_Font18'>Asignado:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Asignado de HPGA' value={asignado} onChange={(e)=>setAsignado(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Clave Cabms (Nombre)' value={cve_cabms} onChange={(e)=>setClave(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Cosecutivo:</p>
              <input type='number' id='Inputs_Add_Pro' placeholder='Consecutivo (Apellido)' value={consecutivo} onChange={(e)=>setConsecutivo(e.target.value)} required/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_AddDesc_Pro" placeholder='Descripción detallada del producto' value={descrip_bm} onChange={(e)=>setDescripcionBm(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Costo:</p>
              <input type="number" id='Inputs_Add_Pro' placeholder='Valor del bien' value={costo_bien} onChange={(e)=>setCosto(e.target.value)} required/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Marca:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Marca' value={marca} onChange={(e)=>setMarca(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Modelo' value={modelo} onChange={(e)=>setModelo(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Serie:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Serie' value={serie} onChange={(e)=>setSerie(e.target.value)} required/>
            </div>
          </div>


          <div>
            <div>
              <p id='Add_Font18'>Motor:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Motor' value={motor} onChange={(e)=>setMotor(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Recurso' value={recursos} onChange={(e)=>setRecurso(e.target.value)} required/>
            </div>
            <div>
              <p id='Add_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Responsable' value={responsable} onChange={(e)=>setResponsable(e.target.value)} required/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Área o Ubicación</p>
              <input type="text" name="" id="Inputs_Add_Pro"  placeholder='Área-Ubicación del bien' value={ubicacion} onChange={(e)=>setArea(e.target.value)} required/>
            </div>
            <div className='Con_CheckBoxAdd'>
              <label htmlFor="CB_ConsumibleAdd">¿Es un consumible?</label>
              <input type="checkbox" id="CB_ConsumibleAdd" value={consumible} onChange={(e) => setConsumible(e.target.value)}/>
            </div>
          </div>
          
        </div>

        <div className='Con_BTNAdd'>
            <button type='submit' id='BTNAdd_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
