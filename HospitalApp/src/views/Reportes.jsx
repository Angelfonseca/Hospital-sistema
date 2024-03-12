import {Link} from 'react-router-dom';

//Styles
import '/src/styles/Reportes.css';


export default function Reportes() {
  return (
    <div className='Container_Reports'>
      <div>
      <Link to="/"><button id='btnRegresarRep'>Regresar</button></Link>
      </div>
      <div>
        <input type="text" id='SearchID'/>
        <select name="" id="SelectGroup"></select>
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
