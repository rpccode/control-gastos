import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos, 
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosfiltrados

}) => {
    return (
      <div className='listado-gastos contenedor'>
      
      {
        filtro ? (
            <>
              <h2>{gastosfiltrados.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>

                {gastosfiltrados.map(gasto => (
                <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
             />
      ))}
            
            
            
            </>
 
          ) : (
            <>
              <h2>{gastos.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>

            {gastos.map(gasto => (
              <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
            ))}
            
            
            
            </>
    
        
      )
            }
      
      </div>
    )
  }

export default ListadoGastos