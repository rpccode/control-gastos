import { useState , useEffect } from "react";
import cerrarModal from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
  eliminarGasto
}) => {
  const [mensaje, setMensaje] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Cantidad, setCantidad] = useState(0);
  const [Categoria, setCategoria] = useState("");
  const [fecha, setfecha] = useState('');
    const [id, setid] = useState('');
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.Nombre);
            setCantidad(gastoEditar.Cantidad);
            setCategoria(gastoEditar.Categoria);
            setid(gastoEditar.id);
            setfecha(gastoEditar.fecha);
        }


    
    }, [])
    
  const handleCerrar = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([Nombre, Cantidad, Categoria].includes("")) {
      setMensaje("Todos los Campos son Obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }
    guardarGasto({ Nombre, Cantidad, Categoria, id,fecha });
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarModal} alt="icono cerrar" onClick={handleCerrar} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"} `}
      >
        <legend>{gastoEditar.Nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto:</label>
          <input
            type="text"
            placeholder="Agrega El Nombre del Gasto"
            id="nombre"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            placeholder="Agrega la Cantidad del Gasto ej: $300"
            id="cantidad"
            value={Cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            value={Categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="materiales">Materiales</option>
            <option value="equipos">Equipos</option>
            <option value="subscripciones">Subscripciones</option>
            <option value="transporte">Transporte o Combustible</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.Nombre ? "Guardar" : "Agregar Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
