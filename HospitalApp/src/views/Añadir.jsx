import {Link} from 'react-router-dom';

//Images
import AddIcon from '/src/assets/Add_Icon.png';

//Styles
import '/src/styles/Añadir.css';

export default function Añadir() {
  return (
    <div className='ContainerFull_Add'>
      <div>
        <Link to="/"><button id='BTN_AddRegresar'>Regresar</button></Link>
      </div>
      <form className='Con_Form_Add'>
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
              <input type="text" id='Inputs_Add_Pro' placeholder='Asignado de HPGA'/>
            </div>
            <div>
              <p id='Add_Font18'>Clave Cabms:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Clave Cabms (Nombre)'/>
            </div>
            <div>
              <p id='Add_Font18'>Cosecutivo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Consecutivo (Apellido)'/>
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Descripción:</p>
              <input type="text" name="" id="Input_AddDesc_Pro" placeholder='Descripción detallada del producto'/>
            </div>
            <div>
              <p id='Add_Font18'>Costo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Valor del bien' />
            </div>
          </div>

          <div>
            <div>
              <p id='Add_Font18'>Marca:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Marca'/>
            </div>
            <div>
              <p id='Add_Font18'>Modelo:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Modelo'/>
            </div>
            <div>
              <p id='Add_Font18'>Serie:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Serie'/>
            </div>
          </div>


          <div>
            <div>
              <p id='Add_Font18'>Motor:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Motor'/>
            </div>
            <div>
              <p id='Add_Font18'>Recurso:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Recurso'/>
            </div>
            <div>
              <p id='Add_Font18'>Responsable:</p>
              <input type="text" id='Inputs_Add_Pro' placeholder='Responsable'/>
            </div>
          </div>

          <div>
            <p id='Add_Font18'>Área o Ubicación</p>
            <input type="text" name="" id="Inputs_Add_Pro"  placeholder='Área-Ubicación del bien'/>
          </div>
          
        </div>

        <div className='Con_BTNAdd'>
            <button type='submit' id='BTNAdd_Pro'>Guardar</button>
        </div>

      </form>
    </div>
  )
}
