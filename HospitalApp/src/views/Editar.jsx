import { Link } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import clienteAxios from '/src/config/axios';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';

//Images
import EditIcon from '/src/assets/Edit_Icon.png';

//Styles
import '/src/styles/Editar.css';



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
  const [recursos, setRecurso] = useState('');
  const [responsable, setResponsable] = useState('');
  const [ubicacion, setArea] = useState('');
  var [consumible, setConsumible] = useState(false);

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

  //Obtener producto por ID
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
    setConsumible(respuesta.data[0].consumible)

    //Validar si el producto está activo
    if (respuesta.data[0].activo === false) {
      toast.error('El producto ésta desactivado');
      setSearch('');
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
    }

    //Validar si el producto es consumible
    if (respuesta.data[0].consumible === true) {
      setConsumible(true);
      CB_Consumible.checked = true;
    }
  }

  //Actualizar producto
  const update = async (e) => {
    e.preventDefault();

    if (CB_Consumible.checked === true) {
      consumible = true;
    }
    if (CB_Consumible.checked === false) {
      consumible = false;
    }

    await clienteAxios.put(`/api/objects/crud/${Search}`, {
      asignado: asignado,
      cve_cabms: cve_cabms,
      consecutivo: consecutivo,
      descrip_bm: descrip_bm,
      costo_bien: costo_bien,
      marca: marca,
      modelo: modelo,
      serie: serie,
      motor: motor,
      recursos: recursos,
      responsable: responsable,
      ubicacion: ubicacion,
      consumible: consumible
    })
    //Alerta de producto actualizado
    toast.success('Producto actualizado correctamente');

    //Limpiar campos
    setSearch('');
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
    CB_Consumible.checked = false;
  }

  const deleteProduct = async (e) => {
    e.preventDefault();
    await clienteAxios.put(`/api/objects/crud/${Search}`, {
      activo: false
    })
    toast.success('Producto eliminado correctamente');

    //Limpiar campos
    setSearch('');
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
  }

  return (
    <div className='ContainerFull_Edit'>
      <Toaster className='EditToast' position='top-left' expand={true} richColors toastOptions={{
        style: {
          fontSize: '22px',
          width: 'max-content',
          className: 'EditToast'
        }
      }}/>
      <div>
        <Link to="/"><button id='BTN_EditRegresar'>Regresar</button></Link>
      </div>
      <form className='Con_Form' onSubmit={update}>
        <div className='Con_Search'>
          <div>
            <img src={EditIcon} alt="Edit Icon" id='EditIcon' />
            <h2 id='NoMargin'>Editar un Producto</h2>
          </div>
          <div>
            <p id='txtCode'>Código:</p>
            <input type="search" name="Search" id="Input_EditSearch_Pro" placeholder='Escane el código del producto que deseas editar' value={Search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={getProductByID} id='BTN_Buscar'>Buscar</button>
          </div>
        </div>

        <div className='Con_Inputs'>

          <div>
            <div>
              <p id='Edit_Font18'>Asignado:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Asignado de HPGA' value={asignado} onChange={(e) => setAsignado(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Clave Cabms (Nombre)' value={cve_cabms} onChange={(e) => setClave(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Cosecutivo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Consecutivo (Apellido)' value={consecutivo} onChange={(e) => setConsecutivo(e.target.value)} />
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_EditDesc_Pro" placeholder='Descripción detallada del producto' value={descrip_bm} onChange={(e) => setDescripcionBm(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Costo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Valor del bien' value={costo_bien} onChange={(e) => setCosto(e.target.value)} />
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Marca:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Marca' value={marca} onChange={(e) => setMarca(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Modelo' value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Serie:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Serie' value={serie} onChange={(e) => setSerie(e.target.value)} />
            </div>
          </div>


          <div>
            <div>
              <p id='Edit_Font18'>Motor:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Motor' value={motor} onChange={(e) => setMotor(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Recurso' value={recursos} onChange={(e) => setRecurso(e.target.value)} />
            </div>
            <div>
              <p id='Edit_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Responsable' value={responsable} onChange={(e) => setResponsable(e.target.value)} />
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Área o Ubicación</p>
              <input type="text" id="Inputs_Edit_Pro" placeholder='Área-Ubicación del bien' value={ubicacion} onChange={(e) => setArea(e.target.value)} />
            </div>
            <div className='Con_Check'>
              <label htmlFor="CB_Consumible">¿Es un consumible?</label>
              <input type="checkbox" id="CB_Consumible" value={consumible} onChange={(e) => setConsumible(e.target.value)} />
            </div>
          </div>

        </div>

        <div className='Con_BTNEdit'>
          <button onClick={deleteProduct} id='BTNDelete_Pro'>Eliminar</button>
          <button type='submit' id='BTNEdit_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
