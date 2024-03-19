import {Link} from 'react-router-dom';

//Images
import AddIcon from '/src/assets/Add_Icon.png';

//Styles
import '/src/styles/Añadir.css';

import ClienteAxios from '/src/config/axios';
import { useState } from 'react';

export default function Añadir() {

  //Variables de producto
  const [Asignado, setAsignado] = useState('');
  const [Clave, setClave] = useState('');
  const [Consecutivo, setConsecutivo] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Costo, setCosto] = useState('');
  const [Marca, setMarca] = useState('');
  const [Modelo, setModelo] = useState('');
  const [Serie, setSerie] = useState('');
  const [Motor, setMotor] = useState('');
  const [Recurso, setRecurso] = useState('');
  const [Responsable, setResponsable] = useState('');
  const [Area, setArea] = useState('');

  const store = async (e) => {
    e.preventDefault();
    if(Asignado === '' || Clave === '' || Consecutivo === '' || Descripcion === '' || Costo === '' || Marca === '' || Modelo === '' || Serie === '' || Motor === '' || Recurso === '' || Responsable === '' || Area === ''){
      alert('Todos los campos son obligatorios');
      return;
    }

    const product = {
      Asignado,
      Clave,
      Consecutivo,
      Descripcion,
      Costo,
      Marca,
      Modelo,
      Serie,
      Motor,
      Recurso,
      Responsable,
      Area
    }

    try {
      const response = await ClienteAxios.post('/api/objects/', product);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
              <input type="text" id='Inputs_Add_Pro' placeholder='Asignado de HPGA' value={Asignado} onChange={(e)=>setAsignado(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Clave Cabms (Nombre)' value={Clave} onChange={(e)=>setClave(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Cosecutivo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Consecutivo (Apellido)' value={Consecutivo} onChange={(e)=>setConsecutivo(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_AddDesc_Pro" placeholder='Descripción detallada del producto' value={Descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Costo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Valor del bien' value={Costo} onChange={(e)=>setCosto(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Marca:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Marca' value={Marca} onChange={(e)=>setMarca(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Modelo' value={Modelo} onChange={(e)=>setModelo(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Serie:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Serie' value={Serie} onChange={(e)=>setSerie(e.target.value)}/>
            </div>
          </div>


          <div>
            <div>
              <p id='Add_Font18'>Motor:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Motor' value={Motor} onChange={(e)=>setMotor(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Recurso' value={Recurso} onChange={(e)=>setRecurso(e.target.value)}/>
            </div>
            <div>
              <p id='Add_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Responsable' value={Responsable} onChange={(e)=>setResponsable(e.target.value)}/>
            </div>
          </div>

          <div>
            <p id='Add_Font18'>Área o Ubicación</p>
            <input type="text" name="" id="Inputs_Add_Pro"  placeholder='Área-Ubicación del bien' value={Area} onChange={(e)=>setArea(e.target.value)}/>
          </div>
          
        </div>

        <div className='Con_BTNAdd'>
            <button type='submit' id='BTNAdd_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
