import {Link} from 'react-router-dom';

//Images
import AddIcon from '/src/assets/Add_Icon.png';

//Styles
import '/src/styles/Añadir.css';

import clienteAxios from '/src/config/axios';
import { useState } from 'react';

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
  // const [descripcion, setDescripcion] = useState('');
  const [recursos, setRecurso] = useState('');
  const [responsable, setResponsable] = useState('');
  const [ubicacion, setArea] = useState('');
  // const [consumible, setConsumible] = useState('');
  // const [activo, setActivo] = useState('');

  var descripcion = 'Descripcion del bien';
  var consumible = true;
  var activo = true;


  const store = async (e) => {
    e.preventDefault();
    if(asignado === '' || cve_cabms === '' || consecutivo === '' || descrip_bm === '' || costo_bien === '' || marca === '' || modelo === '' || serie === '' || motor === '' || recursos === '' || responsable === '' || ubicacion === ''){
      alert('Todos los campos son obligatorios');
      return;
    }
    await clienteAxios.post('/api/objects/', {asignado: asignado, cve_cabms:cve_cabms, consecutivo:consecutivo, descrip_bm:descrip_bm, costo_bien:costo_bien, marca:marca, modelo:modelo, serie:serie, motor:motor, descripcion:descripcion, recursos:recursos, responsable:responsable, ubicacion:ubicacion, consumible:consumible, activo:activo});
    alert('Producto añadido correctamente');
    // try {
    //   e.preventDefault();
    //   const response = await clienteAxios.post('/api/objects/', {asignado: asignado, cve_cabms:cve_cabms, consecutivo:consecutivo, descrip_bm:descrip_bm, costo_bien:costo_bien, marca:marca, modelo:modelo, serie:serie, motor:motor, descripcion:descripcion, recursos:recursos, responsable:responsable, ubicacion:ubicacion, consumible:consumible, activo:activo});
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className='ContainerFull_Add'>
      <div>
        <Link to="/"><button id='BTN_AddRegresar'>Regresar</button></Link>
      </div>
      <form className='Con_Form_Add' onSubmit={store}>
        <div className='Con_Search_Add'>
          <div>
            <img src={AddIcon} alt="Add Icon" />
            <h2 id='NoMargin'>Añadir un Producto</h2>
          </div>
        </div>

        <div className='Con_Inputs_Add'>

          <div>
            <div>
              <p id='Add_Font18'>Asignado:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Asignado de HPGA' value={asignado} onChange={(e)=>setAsignado(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Clave Cabms (Nombre)' value={cve_cabms} onChange={(e)=>setClave(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Cosecutivo:</p>
              <input type='number' id='Inputs_Add_Pro' placeholder='Consecutivo (Apellido)' value={consecutivo} onChange={(e)=>setConsecutivo(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_AddDesc_Pro" placeholder='Descripción detallada del producto' value={descrip_bm} onChange={(e)=>setDescripcionBm(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Costo:</p>
              <input type="number" id='Inputs_Add_Pro' placeholder='Valor del bien' value={costo_bien} onChange={(e)=>setCosto(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Marca:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Marca' value={marca} onChange={(e)=>setMarca(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Modelo' value={modelo} onChange={(e)=>setModelo(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Serie:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Serie' value={serie} onChange={(e)=>setSerie(e.target.value)}/>
            </div>
          </div>


          <div>
            <div>
              <p id='Add_Font18'>Motor:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Motor' value={motor} onChange={(e)=>setMotor(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Recurso' value={recursos} onChange={(e)=>setRecurso(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Responsable' value={responsable} onChange={(e)=>setResponsable(e.target.value)}/>
            </div>
          </div>

          <div>
            <p id='Add_Font18'>Área o Ubicación</p>
            <input type="text" name="" id="Inputs_Add_Pro"  placeholder='Área-Ubicación del bien' value={ubicacion} onChange={(e)=>setArea(e.target.value)}/>
          </div>
          
        </div>

        <div className='Con_BTNAdd'>
            <button type='submit' id='BTNAdd_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
