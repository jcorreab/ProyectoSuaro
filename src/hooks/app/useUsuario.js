import { useState, useEffect } from 'react';
import * as servicio from '../../services/usuarioServices';
import useError from './useError';

const useUsuario = () => {
  const { errorHttp } = useError();
  const [listaUsuario, setListaUsuario] = useState([]);
  const [listaUsuarioCopia, setListaUsuarioCopia] = useState([]);
  const listarUsuarioApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaUsuario(resApi);
        setListaUsuarioCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los usuario', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarUsuarioApi(), []);

  return {
    listaUsuario,
    listaUsuarioCopia,
    setListaUsuario,
    listarUsuarioApi,
  };
};

export default useUsuario;
