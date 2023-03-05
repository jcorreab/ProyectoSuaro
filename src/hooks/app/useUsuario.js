import { useState, useEffect } from 'react';
import * as servicio from '../../services/usuarioServices';

const useUsuario = () => {
  const [listaUsuario, setListaUsuario] = useState([]);
  const [listaUsuarioCopia, setListaUsuarioCopia] = useState([]);
  const listarUsuarioApi = () => {
    servicio.listar().then((res) => {
      const resApi = res;
      setListaUsuario(resApi);
      setListaUsuarioCopia(resApi);
    });
  };

  useEffect(() => listarUsuarioApi(), []);

  return {
    listaUsuario,
    listaUsuarioCopia,
    setListaUsuario,
    listarUsuarioApi,
  };
};

export default useUsuario;
