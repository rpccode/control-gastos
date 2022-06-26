import { useState, useEffect } from "react"
import Filtro from "./components/Filtro";
import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarID } from "./helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg"


function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );  
  const [presupuesto, setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto]=useState(false)
  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosfiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
      
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }  
  
  }, [gastoEditar])
  
  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));
    if(presupuestoLS) {
      setIsValidPresupuesto(true);
    }
  
  }, []);

  useEffect(() => {
    if(filtro){
      const datosFiltrados = gastos.filter(gastos => gastos.Categoria === filtro);
      setGastosFiltrados(datosFiltrados)
    }
  }, [filtro]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);


  const handleNuevoGasto= ()=>{
      setModal(true);
      setGastoEditar({})

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);

  }
  const guardarGasto= gasto =>{
    if(gasto.id){
      //actulizar gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else{
      //nuevo Gasto
      gasto.id= generarID();
      gasto.fecha= Date.now();
        setGastos([...gastos,gasto])
    
    }   
        setAnimarModal(false); 
        setTimeout(() => {
            setModal(false);
        }, 500);
  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }
  return (
    <div className ={modal ? 'fijar' : ''}>
      
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && 
      (
        <>
            <main>
                <Filtro
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                <ListadoGastos
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  filtro={filtro}
                  gastosfiltrados={gastosfiltrados}
                />
            </main>
            <div className="nuevo-gasto">
                <img src={IconoNuevoGasto} alt="icono nuevo gasto"
                  onClick={handleNuevoGasto}
                />
            </div>

        </>
      )}
       
        {modal && <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        /> }
    </div>
     
  )
}

export default App
