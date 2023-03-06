import { useState, useEffect } from 'react';
import useError from './useError';
import * as servicio from '../../services/tipoUsuarioServices';

const useTipoUsuario = () => {
  const { errorHttp } = useError();
  const [listaTipoUsuario, setListaTipoUsuario] = useState([]);
  const [listaTipoUsuarioCopia, setListaTipoUsuarioCopia] = useState([]);
  const listarTipoUsuarioApi = () => {
    servicio
      .listar()
      .then((res) => {
        const resApi = res;
        setListaTipoUsuario(resApi);
        setListaTipoUsuarioCopia(resApi);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al listar los tipo de usuario', error }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => listarTipoUsuarioApi(), []);

  return {
    listaTipoUsuario,
    listaTipoUsuarioCopia,
    setListaTipoUsuario,
    listarTipoUsuarioApi,
  };
};

export default useTipoUsuario;
