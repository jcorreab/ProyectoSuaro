import { useState, useRef } from 'react';
import useMensaje from '../../../../hooks/app/useMensaje';
import * as servicio from '../services/clienteServicesInt';
import useError from '../../../../hooks/app/useError';
import useCliente from '../../../../hooks/app/useCliente';

const useClienteForm = () => {
  const { errorHttp } = useError();
  const { listaCliente, listaClienteCopia, setListaCliente, listarClienteApi } = useCliente();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    codigo: '',
    razon_social: '',
    identificacion: '',
    telefono: '',
    celular: '',
    correo: '',
    direccion: '',
    coordenadas: '',
    fecha_ingreso: new Date(),
    estado: true,
  });
  const [buscar, setBuscar] = useState('');

  const razonSocialRef = useRef();
  const telefonoRef = useRef();
  const correoRef = useRef();
  const identifacacionRef = useRef();
  const celularRef = useRef();
  const direccionRef = useRef();
  const coordenadasRef = useRef();

  const cambiarRazonSocial = (e) =>
    setFormulario({ ...formulario, razon_social: String(e.target.value).toUpperCase() });
  const cambiarIdentificacion = (e) => setFormulario({ ...formulario, identificacion: e.target.value });
  const cambiarCelular = (e) => setFormulario({ ...formulario, celular: e.target.value });
  const cambiarCorreo = (e) => setFormulario({ ...formulario, correo: e.target.value });
  const cambiarTelefono = (e) => setFormulario({ ...formulario, telefono: String(e.target.value).toUpperCase() });
  const cambiarFechaIngreso = (e) => setFormulario({ ...formulario, fecha_ingreso: e });
  const cambiarDireccion = (e) => setFormulario({ ...formulario, direccion: String(e.target.value).toUpperCase() });
  const cambiarCoordenadas = (e) => setFormulario({ ...formulario, coordenadas: e.target.value });
  const cambiarEstado = (e) => setFormulario({ ...formulario, estado: e.target.checked });

  const cambiarBusqueda = (e) => {
    const texto = String(e.target.value).toUpperCase();
    const filtro = listaClienteCopia.filter(
      (f) =>
        String(f.razon_social).toUpperCase().includes(texto) || String(f.identificacion).toUpperCase().includes(texto)
    );
    setListaCliente(filtro);
    setBuscar(e.target.value);
  };
  const nuevo = () => {
    setFormulario({
      codigo: '',
      razon_social: '',
      identificacion: '',
      telefono: '',
      celular: '',
      correo: '',
      direccion: '',
      coordenadas: '',
      fecha_ingreso: new Date(),
      estado: true,
    });
  };
  const agregarRegistro = () => {
    servicio
      .grabar({ ...formulario, codigo: 0 })
      .then((res) => {
        if (res !== 200) {
          mensajeSistema({
            texto: `Error al insertar el cliente, revise si la identificacion si se encuentran registradas`,
            variante: 'error',
          });
          return;
        }
        mensajeSistema({
          texto: `El Cliente ${formulario.razon_social} se grabo correctamente`,
          variante: 'success',
        });
        nuevo();
        listarClienteApi();
      })
      .catch((error) =>
        errorHttp({
          mensaje: 'Error al insertar el cliente, revise si la identificacion si se encuentran registradas',
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
            texto: `Error al editar el cliente, revise si la identificacion se encuentran registradas`,
            variante: 'error',
          });
          return;
        }
        mensajeSistema({
          texto: `El Cliente ${formulario.razon_social} se actualizo correctamente`,
          variante: 'success',
        });
        listarClienteApi();
      })
      .catch((error) =>
        errorHttp({
          mensaje: 'Error al editar el cliente, revise si la identificacion se encuentran registradas',
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
          mensaje: 'Error al obtener el registro del cliente',
          error,
        })
      )
      .finally();
  };
  const validar = () => {
    if (formulario.razon_social.trim().length === 0) {
      mensajeSistema({
        texto: `Los nombre del cliente es requerido`,
        variante: 'warning',
      });
      razonSocialRef.current.focus();
      return true;
    }
    if (formulario.identificacion.trim().length === 0) {
      mensajeSistema({
        texto: `La identificacion del cliente es requerida`,
        variante: 'warning',
      });
      identifacacionRef.current.focus();
      return true;
    }
    if (formulario.identificacion.trim().length < 10) {
      mensajeSistema({
        texto: `La identificacion del cliente debe tener diez digitos`,
        variante: 'warning',
      });
      identifacacionRef.current.focus();
      return true;
    }
    if (formulario.celular.trim().length === 0) {
      mensajeSistema({
        texto: `El celular del cliente es requerido`,
        variante: 'warning',
      });
      celularRef.current.focus();
      return true;
    }

    if (formulario.celular.trim().length < 10) {
      mensajeSistema({
        texto: `El celular del cliente debe tener diez digitos`,
        variante: 'warning',
      });
      celularRef.current.focus();
      return true;
    }
    if (formulario.correo.trim().length === 0) {
      mensajeSistema({
        texto: `El correo del cliente es requerido`,
        variante: 'warning',
      });
      correoRef.current.focus();
      return true;
    }
    if (formulario.coordenadas.trim().length === 0) {
      mensajeSistema({
        texto: `Las Coordenadas del cliente son requeridas`,
        variante: 'warning',
      });
      coordenadasRef.current.focus();
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
    listaCliente,
    formulario,
    buscar,
    razonSocialRef,
    telefonoRef,
    direccionRef,
    identifacacionRef,
    celularRef,
    correoRef,
    coordenadasRef,
    cambiarRazonSocial,
    cambiarTelefono,
    cambiarDireccion,
    cambiarCoordenadas,
    cambiarIdentificacion,
    cambiarCelular,
    cambiarCorreo,
    cambiarFechaIngreso,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    obtenerRegistro,
    grabar,
  };
};

export default useClienteForm;
