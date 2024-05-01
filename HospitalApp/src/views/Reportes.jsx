//Import Link para Rutear
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clienteAxios from '/src/config/axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { useDebounce } from '@uidotdev/usehooks';

//Import FileSaver para descargar archivos
import FileSaver from 'file-saver';

//Styles
import '/src/styles/Reportes.css';

const AppStatus = {
  loading: 'loading',
  loaded: 'loaded',
}

const debounce_time = 500;

export default function Reportes() {
  const [appStatus, setAppStatus] = useState([]); //Variable para el estado de la aplicación
  var [responsables, setResponsables] = useState([]);
  var [ubicaciones, setUbicaciones] = useState([]);
  var [productos, setProductos] = useState([]);
  var [SearchID, setSearchID] = useState('');
  var excelArray = [];
  var Res_Product_Array = [];
  var Area_Product_Array = [];

  const Navegacion = useNavigate() //Variable para usar la navegación
  const debounceSearchID = useDebounce(SearchID, debounce_time);

 //Función para verificar si el usuario está autenticado
  function islogged() {
    const token = localStorage.getItem('AUTH TOKEN')
    if (token === null) {
      Navegacion('/auth')
    }
  }

  //Obtener Producto por ID
  const getProductByIDReport = async (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      const respuesta = await clienteAxios.get(`/api/objects/codes/${SearchID}`);
      const NewProducto = respuesta.data[0];

      // Verificar si el producto ya está en el array
      const productoYaExiste = productos.some(producto => producto._id === NewProducto._id);

      //Agrega el producto al array de productos
      if (!productoYaExiste) {
        setProductos(prevProductos => [...prevProductos, NewProducto]);
      }else {
        toast.error('El producto ya está en la tabla');
      }

      setSearchID('');
    }
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
    islogged();
    ObtenerResponsables();
    ObtenerAreas();
  },[])

  //Función para cambiar el responsable
  const CambiarResponsable = async () => {

    const responsable = SelectResponsable.value;

    //Llenar el array con los códigos de los productos
    for (let i = 0; i < productos.length; i++) {
      var Product = productos[i].asignado + '-' + productos[i].cve_cabms + '-' + productos[i].consecutivo;
      Res_Product_Array.push(Product);
    }

    //Crear un objeto con los códigos y el responsable
    const CambioResp = {
      responsable: responsable,
      codes: Res_Product_Array
    }

    try {
      await clienteAxios.post(`/api/objects/responsable/update/codes`, CambioResp);
      toast.success('Responsable Modificado');
    } catch (error) {
      console.log(error);
    }
    
  }

  //Función para cambiar el área
  const CambiarArea = async() => {
    
    const area = SelectArea.value;

    //Llenar el array con los códigos de los productos
    for (let i = 0; i < productos.length; i++) {
      var Product = productos[i].asignado + '-' + productos[i].cve_cabms + '-' + productos[i].consecutivo;
      Area_Product_Array.push(Product);
    }

    //Crear un objeto con los códigos y el área
    const CambioArea = {
      ubicacion: area,
      codes: Area_Product_Array
    }

    console.log(CambioArea);

    try {
      await clienteAxios.post(`/api/objects/ubicaciones`, CambioArea);
      toast.success('Área Modificada');
    } catch (error) {
      console.log(error);
    }
    

  }

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

    //Función para cambiar responsable
    CambiarResponsable();
    //Función para cambiar area
    CambiarArea();
  }

  //Función eliminar producto
  function deleteProduct(id) {
    const newProducts = productos.filter(producto => producto._id !== id);
    setProductos(newProducts);
  }

  return (
    <div className='Container_Reports'>
      <Toaster position='top-left' richColors expand={true} toastOptions={{
        style: {
          fontSize: '22px',
          width: 'max-content',
          position: 'absolute',
        }
      }}/>
      <div>
        <Link to="/"><button id='btnRegresarRep'>Regresar</button></Link>
      </div>
      <div>
        <input type="search" name="SearchID" id='SearchID' placeholder='Ingresa Código de Barras' value={SearchID} onChange={(e) => setSearchID(e.target.value)} onKeyPress={getProductByIDReport}/>
        <button onClick={getProductByIDReport} id='btnEnter'>Enter</button>
        <select name="Responsable" className='Selector' id="SelectResponsable">
          {responsables.map((responsable) => (
            <option key={responsable._id} value={responsable._id}>{responsable}</option>
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
              <th data-titulo='Acciones'>Acciones</th>
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
                <td data-titulo='Acciones' id='tdAcciones'><button onClick={()=> deleteProduct(producto._id)} id='ReportsDelete'>Eliminar</button></td>
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
