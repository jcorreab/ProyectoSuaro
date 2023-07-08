import { useState, useEffect } from 'react';
import useError from './useError';
import * as servicio from '../../servicios/servicios_soporte';

const useSoporte = () => {
  const { errorHttp } = useError();
  const [listaSoporte, setListaSoporte] = useState([]);
  const listarSoporteApi = () => {
    servicio
      .listarSoporte()
      .then((res) => {
        const resApi = res.items.map((m) => ({ ...m, codigo: m.id, nombre: m.descripcion }));
        setListaSoporte(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los soportes', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarSoporteApi(), []);

  return {
    listaSoporte,
    setListaSoporte,
    listarSoporteApi,
  };
};

export default useSoporte;
