import {Link} from 'react-router-dom';
import * as React from 'react';

//Images
import EditIcon from '/src/assets/Edit_Icon.png';

//Styles
import '/src/styles/Editar.css';

import { useState } from 'react';
import clienteAxios from '/src/config/axios';

export default function Editar() {
  const [Search, setSearch] = useState('');
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


  const getProductByID = async (e) => {
    e.preventDefault();
    const respuesta = await clienteAxios.get(`/api/objects/codes/${Search}`)
    setAsignado(respuesta.data[0].asignado)
    setClave(respuesta.data[0].cve_cabms)
    setConsecutivo(respuesta.data[0].consecutivo)
    setDescripcionBm(respuesta.data[0].descrip_bm)
    setCosto(respuesta.data[0].costo_bien)
    setMarca(respuesta.data[0].marca)
    setModelo(respuesta.data[0].modelo)
    setSerie(respuesta.data[0].serie)
    setMotor(respuesta.data[0].motor)
    setRecurso(respuesta.data[0].recursos)
    setResponsable(respuesta.data[0].responsable)
    setArea(respuesta.data[0].ubicacion)
 }

  return (
    <div className='ContainerFull_Edit'>
      <div>
        <Link to="/"><button id='BTN_EditRegresar'>Regresar</button></Link>
      </div>
      <form className='Con_Form'>
        <div className='Con_Search'>
          <div>
            <img src={EditIcon} alt="Edit Icon" />
            <h2 id='NoMargin'>Editar Producto</h2>
          </div>
          <div>
            <p id='NoMargin'>Código:</p>
            <input type="search" name="Search" id="Input_EditSearch_Pro" placeholder='Escane el código del producto que deseas editar' value={Search} onChange={(e)=>setSearch(e.target.value)}/>
            <button onClick={getProductByID} >Buscar</button>
          </div>
        </div>

        <div className='Con_Inputs'>

          <div>
            <div>
              <p id='Edit_Font18'>Asignado:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Asignado de HPGA' value={asignado} onChange={(e)=>setAsignado(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Clave Cabms (Nombre)' value={cve_cabms} onChange={(e)=>setClave(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Cosecutivo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Consecutivo (Apellido)' value={consecutivo} onChange={(e)=>setConsecutivo(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_EditDesc_Pro" placeholder='Descripción detallada del producto' value={descrip_bm} onChange={(e)=>setDescripcionBm(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Costo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Valor del bien' value={costo_bien} onChange={(e)=>setCosto(e.target.value)}/>
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Marca:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Marca' value={marca} onChange={(e)=>setMarca(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Modelo' value={modelo} onChange={(e)=>setModelo(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Serie:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Serie' value={serie} onChange={(e)=>setSerie(e.target.value)}/>
            </div>
          </div>


          <div>
            <div>
              <p id='Edit_Font18'>Motor:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Motor' value={motor} onChange={(e)=>setMotor(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Recurso' value={recursos} onChange={(e)=>setRecurso(e.target.value)}/>
            </div>
            <div>
              <p id='Edit_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Responsable' value={responsable} onChange={(e)=>setResponsable(e.target.value)}/>
            </div>
          </div>

          <div>
            <p id='Edit_Font18'>Área o Ubicación</p>
            <input type="text" name="" id="Inputs_Edit_Pro"  placeholder='Área-Ubicación del bien' value={ubicacion} onChange={(e)=>setArea(e.target.value)}/>
          </div>
          
        </div>

        <div className='Con_BTNEdit'>
            <button type='submit' id='BTNDelete_Pro'>Eliminar</button>
            <button type='submit' id='BTNEdit_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
