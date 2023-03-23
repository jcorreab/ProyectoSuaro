import { useState, useRef } from 'react';
import useUsuario from '../../../../hooks/app/useUsuario';
import useTipoUsuario from '../../../../hooks/app/useTipoUsuario';
import useMensaje from '../../../../hooks/app/useMensaje';
import * as servicio from '../services/usuarioServicesInt';
import useError from '../../../../hooks/app/useError';

const useUsuarioForm = () => {
  const { errorHttp } = useError();
  const { listaUsuario, listaUsuarioCopia, setListaUsuario, listarUsuarioApi } = useUsuario();
  const { listaTipoUsuario } = useTipoUsuario();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    codigo: '',
    codigo_usuario: '',
    nombres: '',
    apellidos: '',
    tipo_usuario: 1,
    identificacion: '',
    celular: '',
    correo: '',
    observacion: '',
    fecha_ingreso: new Date(),
    clave: '',
    estado: true,
  });
  const [buscar, setBuscar] = useState('');

  const nombresRef = useRef();
  const codigoUsuarioRef = useRef();
  const apellidosRef = useRef();
  const identifacacionRef = useRef();
  const celularRef = useRef();
  const correoRef = useRef();
  const claveRef = useRef();

  const cambiarCodigoUsuario = (e) =>
    setFormulario({ ...formulario, codigo_usuario: String(e.target.value).toUpperCase() });
  const cambiarNombres = (e) => setFormulario({ ...formulario, nombres: String(e.target.value).toUpperCase() });
  const cambiarApellidos = (e) => setFormulario({ ...formulario, apellidos: String(e.target.value).toUpperCase() });
  const cambiarTipoUsuario = (e) => setFormulario({ ...formulario, tipo_usuario: e.target.value });
  const cambiarIdentificacion = (e) => setFormulario({ ...formulario, identificacion: e.target.value });
  const cambiarCelular = (e) => setFormulario({ ...formulario, celular: e.target.value });
  const cambiarCorreo = (e) => setFormulario({ ...formulario, correo: e.target.value });
  const cambiarObservacion = (e) => setFormulario({ ...formulario, observacion: String(e.target.value).toUpperCase() });
  const cambiarFechaIngreso = (e) => setFormulario({ ...formulario, fecha_ingreso: e });
  const cambiarClave = (e) => setFormulario({ ...formulario, clave: e.target.value });
  const cambiarEstado = (e) => setFormulario({ ...formulario, estado: e.target.checked });

  const cambiarBusqueda = (e) => {
    const texto = String(e.target.value).toUpperCase();
    const filtro = listaUsuarioCopia.filter(
      (f) =>
        String(f.nombres).toUpperCase().includes(texto) ||
        String(f.apellidos).toUpperCase().includes(texto) ||
        String(f.identificacion).toUpperCase().includes(texto)
    );
    setListaUsuario(filtro);
    setBuscar(e.target.value);
  };
  const nuevo = () => {
    setFormulario({
      codigo: '',
      codigo_usuario: '',
      nombres: '',
      apellidos: '',
      tipo_usuario: '',
      identificacion: '',
      celular: '',
      correo: '',
      observacion: '',
      fecha_ingreso: new Date(),
      clave: '',
      estado: true,
    });
  };
  const agregarRegistro = () => {
    servicio
      .grabar({ ...formulario, codigo: 0 })
      .then((res) => {
        if (res !== 200) {
          mensajeSistema({
            texto: `Error al registrar el usuario, revise si la identificacion o el codigo de usuario se encuentran registradas`,
            variante: 'error',
          });
          return;
        }
        mensajeSistema({
          texto: `El Usuario ${formulario.nombres} ${formulario.apellidos} se grabo correctamente`,
          variante: 'success',
        });
        nuevo();
        listarUsuarioApi();
      })
      .catch((error) =>
        errorHttp({
          mensaje:
            'Error al registrar el usuario, revise si la identificacion o el codigo de usuario se encuentran registradas',
          error,
        })
      )
      .finally();
  };
  const editarRegistro = () => {
    servicio
      .editar(formulario)
      .then((res) => {
        if (res !== 200) {
          mensajeSistema({
            texto: `Error al editar el usuario, revise si la identificacion o el codigo de usuario se encuentran registradas`,
            variante: 'error',
          });
          return;
        }
        mensajeSistema({
          texto: `El Usuario ${formulario.nombres} ${formulario.apellidos} se actualizo correctamente`,
          variante: 'success',
        });
        listarUsuarioApi();
      })
      .catch((error) =>
        errorHttp({
          mensaje:
            'Error al editar el usuario, revise si la identificacion o el codigo de usuario se encuentran registradas',
          error,
        })
      )
      .finally();
  };
  const obtenerRegistro = (e) => {
    servicio
      .obtener(e.id)
      .then((res) => {
        setFormulario(res);
      })
      .catch((error) =>
        errorHttp({
          mensaje: 'Error al obtener el registro del usuario',
          error,
        })
      )
      .finally();
  };
  const validar = () => {
    if (formulario.codigo_usuario.trim().length === 0) {
      mensajeSistema({
        texto: `El Codigo del usuario es requerido`,
        variante: 'warning',
      });
      codigoUsuarioRef.current.focus();
      return true;
    }
    if (formulario.nombres.trim().length === 0) {
      mensajeSistema({
        texto: `Los nombres del usuario son requeridos`,
        variante: 'warning',
      });
      nombresRef.current.focus();
      return true;
    }
    if (formulario.apellidos.trim().length === 0) {
      mensajeSistema({
        texto: `Los apellidos del usuario son requeridos`,
        variante: 'warning',
      });
      apellidosRef.current.focus();
      return true;
    }
    if (formulario.identificacion.trim().length === 0) {
      mensajeSistema({
        texto: `La identificacion del usuario es requerida`,
        variante: 'warning',
      });
      identifacacionRef.current.focus();
      return true;
    }
    if (formulario.identificacion.trim().length < 10) {
      mensajeSistema({
        texto: `La identificacion del usuario debe tener diez digitos`,
        variante: 'warning',
      });
      identifacacionRef.current.focus();
      return true;
    }
    if (formulario.celular.trim().length === 0) {
      mensajeSistema({
        texto: `El celular del usuario es requerido`,
        variante: 'warning',
      });
      celularRef.current.focus();
      return true;
    }

    if (formulario.celular.trim().length < 10) {
      mensajeSistema({
        texto: `El celular del usuario debe tener diez digitos`,
        variante: 'warning',
      });
      celularRef.current.focus();
      return true;
    }
    if (formulario.correo.trim().length === 0) {
      mensajeSistema({
        texto: `El correo del usuario es requerido`,
        variante: 'warning',
      });
      correoRef.current.focus();
      return true;
    }
    if (formulario.clave.trim().length === 0) {
      mensajeSistema({
        texto: `La Clave del usuario es requerida`,
        variante: 'warning',
      });
      claveRef.current.focus();
      return true;
    }
    return false;
  };
  const grabar = () => {
    if (validar()) {
      return;
    }
    // NUEVO
    if (String(formulario.codigo).trim().length === 0) {
      agregarRegistro();
      return;
    }
    // EDITA
    editarRegistro();
  };
  return {
    listaUsuario,
    listaTipoUsuario,
    formulario,
    buscar,
    nombresRef,
    codigoUsuarioRef,
    apellidosRef,
    identifacacionRef,
    celularRef,
    correoRef,
    claveRef,
    cambiarCodigoUsuario,
    cambiarNombres,
    cambiarApellidos,
    cambiarTipoUsuario,
    cambiarIdentificacion,
    cambiarCelular,
    cambiarCorreo,
    cambiarObservacion,
    cambiarFechaIngreso,
    cambiarClave,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    obtenerRegistro,
    grabar,
  };
};

export default useUsuarioForm;
