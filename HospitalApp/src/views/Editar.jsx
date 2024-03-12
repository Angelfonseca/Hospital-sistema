import {Link} from 'react-router-dom';

//Images
import EditIcon from '/src/assets/Edit_Icon.png';

//Styles
import '/src/styles/Editar.css';

export default function Editar() {
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
            <input type="search" name="" id="Input_EditSearch_Pro" placeholder='Escane el código del producto que deseas editar'/>
          </div>
        </div>

        <div className='Con_Inputs'>

          <div>
            <div>
              <p id='Edit_Font18'>Asignado:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Asignado de HPGA'/>
            </div>
            <div>
              <p id='Edit_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Clave Cabms (Nombre)'/>
            </div>
            <div>
              <p id='Edit_Font18'>Cosecutivo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Consecutivo (Apellido)'/>
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_EditDesc_Pro" placeholder='Descripción detallada del producto'/>
            </div>
            <div>
              <p id='Edit_Font18'>Costo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Valor del bien' />
            </div>
          </div>

          <div>
            <div>
              <p id='Edit_Font18'>Marca:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Marca'/>
            </div>
            <div>
              <p id='Edit_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Modelo'/>
            </div>
            <div>
              <p id='Edit_Font18'>Serie:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Serie'/>
            </div>
          </div>


          <div>
            <div>
              <p id='Edit_Font18'>Motor:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Motor'/>
            </div>
            <div>
              <p id='Edit_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Recurso'/>
            </div>
            <div>
              <p id='Edit_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Edit_Pro' placeholder='Responsable'/>
            </div>
          </div>

          <div>
            <p id='Edit_Font18'>Área o Ubicación</p>
            <input type="text" name="" id="Inputs_Edit_Pro"  placeholder='Área-Ubicación del bien'/>
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
