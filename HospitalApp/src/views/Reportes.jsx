//Import Link para Rutear
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import clienteAxios from '/src/config/axios';

//Import FileSaver para descargar archivos
import FileSaver from 'file-saver';

//Styles
import '/src/styles/Reportes.css';

export default function Reportes() {
  var [responsables, setResponsables] = useState([]);
  var [ubicaciones, setUbicaciones] = useState([]);
  var [productos, setProductos] = useState([]);
  var [SearchID, setSearchID] = useState('');
  var excelArray = [];
  //Obtener Producto por ID
  const getProductByID = async (e) => {
    e.preventDefault();
    const respuesta = await clienteAxios.get(`/api/objects/codes/${SearchID}`);
    const NewProducto = respuesta.data[0];

    // Verificar si el producto ya está en el array
    const productoYaExiste = productos.some(producto => producto._id === NewProducto._id);

    //Agrega el producto al array de productos
    if (!productoYaExiste) {
      setProductos(prevProductos => [...prevProductos, NewProducto]);
    }else {
      console.log('El producto ya está en el array');
    }

    setSearchID('');

    // setProductos(prevProductos => [...prevProductos, respuesta.data[0]]); 
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
  //Ejecutar funciones al cargar la página
  useEffect(() => {
    ObtenerResponsables()
    ObtenerAreas()
  },[])

  //Generar Excel
  const GenerarExcel = async (e) => {
    e.preventDefault();
    //Vacia el array con los códigos de los productos
    excelArray = [];
    
    //Llenar el array con los códigos de los productos
    for (let i = 0; i < productos.length; i++) {
      var Product = productos[i].asignado + '-' + productos[i].cve_cabms + '-' + productos[i].consecutivo;
      excelArray.push(Product);
    }
    //Crear un objeto con los códigos
    var codes = {
      codes: excelArray
    }
    //Petición para enviar los codigos y obtener el archivo Excel
    const respuesta = await clienteAxios.post(`/api/objects/xlsx`, codes, { responseType: 'blob' });

    //Descargar archivo Excel
    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Reporte.xlsx');

    //Limpiar la tabla de productos
    setProductos([]);

    console.log(SelectArea.value)
    console.log(SelectResponsable.value)
  }


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
            <tr>
              <th data-titulo='Idetificador'>Idetificador</th>
              <th data-titulo='Descripción'>Descripción</th>
              <th data-titulo='Costo'>Costo</th>
              <th data-titulo='Marca'>Marca</th>
              <th data-titulo='Recurso'>Recurso</th>
              <th data-titulo='Resposable'>Resposable Actual</th>
              <th data-titulo='Ubicación'>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td data-titulo='Idetificador'>{producto.asignado}-{producto.cve_cabms}-{producto.consecutivo}</td>
                <td data-titulo='Descripción'>{producto.descrip_bm}</td>
                <td data-titulo='Costo'>{producto.costo_bien}</td>
                <td data-titulo='Marca'>{producto.marca}</td>
                <td data-titulo='Recurso'>{producto.recursos}</td>
                <td data-titulo='Resposable'>{producto.responsable}</td>
                <td data-titulo='Ubicación'>{producto.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button id='btn_Excel' onClick={GenerarExcel}>Exportar a Excel</button>
      </div>
    </div>
  )
}
