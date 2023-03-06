import { useState, useEffect } from 'react';
import useError from './useError';
import * as servicio from '../../services/tipoSoporteServices';

const useTipoSoporte = () => {
  const { errorHttp } = useError();
  const [listaTipoSoporte, setListaTipoSoporte] = useState([]);
  const [listaTipoSoporteCopia, setListaTipoSoporteCopia] = useState([]);
  const listarTipoSoporteApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaTipoSoporte(resApi);
        setListaTipoSoporteCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los tipo de soporte', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarTipoSoporteApi(), []);

  return {
    listaTipoSoporte,
    listaTipoSoporteCopia,
    setListaTipoSoporte,
    listarTipoSoporteApi,
  };
};

export default useTipoSoporte;
