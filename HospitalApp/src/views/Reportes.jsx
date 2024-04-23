//Import Link para Rutear
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';

//Styles
import '/src/styles/Reportes.css';

import clienteAxios from '/src/config/axios';

export default function Reportes() {
  var [responsables, setResponsables] = useState([]);
  var [ubicaciones, setUbicaciones] = useState([]);
  var [productos, setProductos] = useState([]);
  var [SearchID, setSearchID] = useState('');

  const getProductByID = async (e) => {
    e.preventDefault();
    const respuesta = await clienteAxios.get(`/api/objects/codes/${SearchID}`);
    setProductos(prevProductos => [...prevProductos, respuesta.data[0]]);
    console.log(productos)
  }

  //Obtener Responsables
  const ObtenerResponsables = async () => {
    var respuesta = await clienteAxios.get(`/api/objects/responsables`)
    setResponsables(respuesta.data)
  }
  //Obtener Areas
  const ObtenerAreas = async () => {
    var respuesta = await clienteAxios.get(`/api/objects/ubicaciones`)
    setUbicaciones(respuesta.data)
  }

  useEffect(() => {
    ObtenerResponsables()
    ObtenerAreas()
  })

  return (
    <div className='Container_Reports'>
      <div>
        <Link to="/"><button id='btnRegresarRep'>Regresar</button></Link>
      </div>
      <div>
        <input type="text" id='SearchID' placeholder='Ingresa Código de Barras' value={SearchID} onChange={(e) => setSearchID(e.target.value)} />
        <button onClick={getProductByID} id='btnEnter'>Enter</button>
        <select name="Responsable" className='Selector' id="SelectResponsable">
          {responsables.map((responsable) => (
            <option value={responsable.id}>{responsable}</option>
          ))}
        </select>
        <select name="Ubicacion" className='Selector' id="SelectArea">
          {ubicaciones.map((Ubicacion) => (
            <option value={Ubicacion.id}>{Ubicacion}</option>
          ))}
        </select>
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
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.asignado}-{producto.cve_cabms}-{producto.consecutivo}</td>
                <td>{producto.descrip_bm}</td>
                <td>{producto.costo_bien}</td>
                <td>{producto.marca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button id='btn_Excel'>Exportar a Excel</button>
      </div>
    </div>
  )
}
