//Import Link para Rutear
import {Link} from 'react-router-dom';
import * as React from 'react';
import { useEffect,useState } from 'react';

//Styles
import '/src/styles/Reportes.css';

import clienteAxios from '/src/config/axios';

export default function Reportes() {
  var [responsables, setResponsables] = useState([]);

  useEffect(() => {
    //Obtener Responsables
    const ObtenerResponsables = async () => {
      var respuesta = await clienteAxios.get(`/api/objects/responsables`)
      setResponsables(respuesta.data)
    }
    ObtenerResponsables() 
  })

  return (
    <div className='Container_Reports'>
      <div>
        <Link to="/"><button id='btnRegresarRep'>Regresar</button></Link>
      </div>
      <div>
        <input type="text" id='SearchID' placeholder='Ingresa Código de Barras'/>
        <select name="" className='Selector' id="SelectResponsable">
          {responsables.map((responsable) => (
            <option value={responsable.id}>{responsable}</option>
          ))}
        </select>
        <select name="" className='Selector' id="SelectArea"></select>
      </div>
      <div>
        <table id='TableProducts'>
          <thead>
            <th>Idetificador</th>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Marca</th>
          </thead>
          <tbody>
            <tr>
              <td>1234567890</td>
              <td>Laptop HP 15pulgadas</td>
              <td>$15000</td>
              <td>HP</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button id='btn_Excel'>Exportar a Excel</button>
      </div>
    </div>
  )
}
