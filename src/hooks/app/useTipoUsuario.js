import { useState, useEffect } from 'react';
import * as servicio from '../../services/tipoUsuarioServices';

const useTipoUsuario = () => {
  const [listaTipoUsuario, setListaTipoUsuario] = useState([]);
  const [listaTipoUsuarioCopia, setListaTipoUsuarioCopia] = useState([]);
  const listarTipoUsuarioApi = () => {
    servicio.listar().then((res) => {
      const resApi = res
      setListaTipoUsuario(resApi);
      setListaTipoUsuarioCopia(resApi);
    });
  };

  useEffect(() => listarTipoUsuarioApi(), []);

  return {
    listaTipoUsuario,
    listaTipoUsuarioCopia,
    setListaTipoUsuario,
    listarTipoUsuarioApi
  };
};

export default useTipoUsuario;
