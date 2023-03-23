import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useError from '../../../../hooks/app/useError';
import useMensaje from '../../../../hooks/app/useMensaje';
import * as servicio from '../services/loginServicesInt';

const useLogin = () => {
  const { errorHttp } = useError();
  const navigate = useNavigate();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    usuario: '',
    clave: '',
  });

  const usuarioRef = useRef();
  const claveRef = useRef();

  const cambiarUsuario = (e) => setFormulario({ ...formulario, usuario: String(e.target.value).toUpperCase() });
  const cambiarClave = (e) => setFormulario({ ...formulario, clave: e.target.value });
  const login = () => {
    if (formulario.usuario.trim().length === 0) {
      mensajeSistema({
        texto: `El Usuario es requerido`,
        variante: 'warning',
      });
      usuarioRef.current.focus();
      return;
    }
    if (formulario.clave.trim().length === 0) {
      mensajeSistema({
        texto: `La Clave es requerida`,
        variante: 'warning',
      });
      claveRef.current.focus();
      return;
    }
    servicio
      .login(formulario)
      .then((res) => {
        if (res !== 200) {
          mensajeSistema({
            texto: `Usuario o Contraseña incorrecta`,
            variante: 'error',
          });
          return;
        }
        window.localStorage.setItem('usuario', JSON.stringify({ usuario: formulario.usuario }));
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => errorHttp({ mensaje: 'Usuario o contraseña incorrecta', error }));
  };

  return {
    formulario,
    usuarioRef,
    claveRef,
    cambiarUsuario,
    cambiarClave,
    login,
  };
};

export default useLogin;
