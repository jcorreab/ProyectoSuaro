import { useState } from 'react';

const useInformeSoporte = () => {
  const [datos, setDatos] = useState({
    fechaDesde: new Date(),
    fechaHasta: new Date(),
    esTodo: true,
  });
  const [soporte, setSoporte] = useState({
    codigo: '',
    nombre: '',
  });
  const [informe, setInforme] = useState([]);

  const cambiarFechaDesde = (e) => {
    setDatos({ ...datos, fechaDesde: e });
  };
  const cambiarFechaHasta = (e) => {
    setDatos({ ...datos, fechaHasta: e });
  };
  const cambiarSoporte = (e) => {
    setSoporte(e);
  };

  const buscar = () => {};
  const nuevo = () => {};

  return {
    datos,
    soporte,
    informe,
    cambiarFechaDesde,
    cambiarFechaHasta,
    cambiarSoporte,
    buscar,
    nuevo,
  };
};

export default useInformeSoporte;
