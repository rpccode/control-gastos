import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    gastos,
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto,
    setGastos

}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
       {isValidPresupuesto ?(
      
              
                <ControlPresupuesto
                    gastos={gastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                    setGastos={setGastos}
                />
          
       ):(
                <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                     />
       )}
    </header>
  )
}

export default Header