import { useState, useEffect } from 'react';
import useError from './useError';
import * as servicio from '../../services/productoServices';

const useProducto = () => {
  const { errorHttp } = useError();
  const [listaProducto, setListaProducto] = useState([]);
  const [listaProductoCopia, setListaProductoCopia] = useState([]);
  const listarProductoApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaProducto(resApi);
        setListaProductoCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los productos', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarProductoApi(), []);

  return {
    listaProducto,
    listaProductoCopia,
    setListaProducto,
    listarProductoApi,
  };
};

export default useProducto;
