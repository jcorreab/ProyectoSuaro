import { useState, useEffect } from 'react';
import * as servicio from '../../services/clienteServicies';
import useError from './useError';

const useCliente = () => {
  const { errorHttp } = useError();
  const [listaCliente, setListaCliente] = useState([]);
  const [listaClienteCopia, setListaClienteCopia] = useState([]);
  const listarClienteApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaCliente(resApi);
        setListaClienteCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los clientes', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarClienteApi(), []);

  return {
    listaCliente,
    listaClienteCopia,
    setListaCliente,
    listarClienteApi,
  };
};

export default useCliente;
