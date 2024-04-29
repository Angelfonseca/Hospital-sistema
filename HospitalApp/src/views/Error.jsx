import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='Container_Error'>
        <h1 className='RouterErrorH1'>404</h1>
        <label>Lo siento no deberías de estar aquí</label>
        <Link to={'/auth'}><button>Regresar</button></Link>

        <style>
            {`
                .Container_Error{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .RouterErrorH1{
                    font-size: 100px;
                    color: #ff0000;
                }
                label{
                    font-size: 36px;
                    color: #000;
                }
                button{
                    font-size: 20px;
                    padding: 10px;
                    margin-top: 20px;
                    background-color: #000;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
                button:hover{
                    background-color: #ff0000;
                }
            `}
        </style>
    </div>

  )
}
