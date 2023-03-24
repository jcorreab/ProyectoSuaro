import { useState, useEffect } from 'react';
import * as servicio from '../../services/soporteServices';
import useError from './useError';

const useSoporteBuscar = () => {
  const { errorHttp } = useError();
  const [listaSoporteBuscar, setListaSoporteBuscar] = useState([]);
  const [listaSoporteBuscarCopia, setListaSoporteBuscarCopia] = useState([]);
  const listarSoporteBuscarApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaSoporteBuscar(resApi);
        setListaSoporteBuscarCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los soportes', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarSoporteBuscarApi(), []);

  return {
    listaSoporteBuscar,
    listaSoporteBuscarCopia,
    setListaSoporteBuscar,
    listarSoporteBuscarApi,
  };
};

export default useSoporteBuscar;
