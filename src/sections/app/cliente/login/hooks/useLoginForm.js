import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useError from '../../../../../hooks/app/useError';
import useMensaje from '../../../../../hooks/app/useMensaje';
import * as servicio from '../servicios/servicios_int';
import { validarVacios } from '../../../../../utils/app/func/fun_valida';
import { guardarClienteLog } from '../../../../../utils/app/func/fun_storage';

const useLoginForm = () => {
  const navegar = useNavigate();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    usuario: '',
    clave: '',
  });

  const usuarioRef = useRef();
  const claveRef = useRef();

  const cambiarUsuario = (e) => setFormulario({ ...formulario, usuario: e.target.value });
  const cambiarClave = (e) => setFormulario({ ...formulario, clave: e.target.value });
  const navegarRegistrar = () => navegar('/registro');
  const navegarAceeder = () => navegar('/dashboard/soporte');

  const acceder = () => {
    try {
      if (validarVacios(formulario.usuario)) {
        mensajeSistema({ texto: 'El usuario es requerido', variante: 'warning' });
        usuarioRef.current.focus();
        return;
      }
      if (validarVacios(formulario.clave)) {
        mensajeSistema({ texto: 'La clave es requerida', variante: 'warning' });
        claveRef.current.focus();
        return;
      }
      servicio
        .acceder({
          identity: formulario.usuario,
          password: formulario.clave,
        })
        .then((res) => {
          guardarClienteLog(res);
          navegarAceeder()
        })
        .catch((error) => errorHttp({ error: error.code, mensaje: 'Revise si el usuario o contraseña son correcta' }));
    } catch (error) {
      //
    }
  };

  return {
    formulario,
    usuarioRef,
    claveRef,
    cambiarUsuario,
    cambiarClave,
    acceder,
    navegarRegistrar,
  };
};

export default useLoginForm;
