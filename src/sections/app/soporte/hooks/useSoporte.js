import { useState, useRef } from 'react';
import useUsuario from '../../../../hooks/app/useUsuario';
import useMensaje from '../../../../hooks/app/useMensaje';
import * as servicio from '../services/soporteServicesInt';
import useError from '../../../../hooks/app/useError';
import useCliente from '../../../../hooks/app/useCliente';
import useTipoSoporte from '../../../../hooks/app/useTipoSoporte';

const useSoporteForm = () => {
  const { errorHttp } = useError();
  const { listaUsuario } = useUsuario();
  const { listaCliente } = useCliente();
  const { listaTipoSoporte } = useTipoSoporte();
  const { mensajeSistema } = useMensaje();
  const [cliente, setCliente] = useState({
    codigo: 0,
    identificacion: '',
    nombre: '',
  });
  const [tecnico1, setTecnico1] = useState({
    codigo: 0,
    codigo_usuario: '',
    nombre: '',
  });
  const [tecnico2, setTecnico2] = useState({
    codigo: 0,
    codigo_usuario: '',
    nombre: '',
  });
  const [fechaRegistro, setFechaRegistro] = useState(new Date());
  const [buscar, setBuscar] = useState('');

  const clienteRef = useRef();
  const tecnico1Ref = useRef();
  const tecnico2Ref = useRef();

  const cambiarCliente = (e) => setCliente({ codigo: e.codigo, identificacion: e.codigoalternativo, nombre: e.nombre });
  const cambiarTecnico1 = (e) =>
    setTecnico1({ codigo: e.codigo, codigo_usuario: e.codigoalternativo, nombre: e.nombre });
  const cambiarTecnico2 = (e) =>
    setTecnico2({ codigo: e.codigo, codigo_usuario: e.codigoalternativo, nombre: e.nombre });
  const cambiarFechaRegistro = (e) => setFechaRegistro(e);
  const cambiarBusqueda = (e) => setBuscar(e.target.value);

  const nuevo = () => {};
  const agregarRegistro = () => {
    servicio
      .grabar({
        cliente: cliente.codigo,
        operador1: tecnico1.codigo,
        operador2: tecnico1.codigo,
        fecha_registro: fechaRegistro,
        estado: false,
      })
      .then((res) => {
        if (res !== 200) {
          mensajeSistema({
            texto: `Error al registrar el soporte, intente de nuevo`,
            variante: 'error',
          });
          return;
        }
        mensajeSistema({
          texto: `El Soporte para el cliente ${cliente.nombre} se grabo correctamente`,
          variante: 'success',
        });
        nuevo();
      })
      .catch((error) =>
        errorHttp({
          mensaje: 'Error al registrar el soporte, intente de nuevo',
          error,
        })
      )
      .finally();
  };

  const validar = () => {
    if (cliente.identificacion.trim().length === 0) {
      mensajeSistema({
        texto: `El Cliente es requerido`,
        variante: 'warning',
      });
      clienteRef.current.focus();
      return true;
    }
    if (tecnico1.codigo_usuario.trim().length === 0) {
      mensajeSistema({
        texto: `El Tecnico principal es requerido`,
        variante: 'warning',
      });
      tecnico1Ref.current.focus();
      return true;
    }
    if (tecnico2.codigo_usuario.trim().length === 0) {
      mensajeSistema({
        texto: `El Tecnico Auxiliar es requerido`,
        variante: 'warning',
      });
      tecnico2Ref.current.focus();
      return true;
    }
    return false;
  };
  const grabar = () => {
    if (validar()) {
      return;
    }
    agregarRegistro();
  };
  return {
    listaUsuario,
    listaCliente,
    listaTipoSoporte,
    cliente,
    buscar,
    tecnico1,
    tecnico2,
    fechaRegistro,
    clienteRef,
    tecnico1Ref,
    tecnico2Ref,
    cambiarCliente,
    cambiarTecnico1,
    cambiarTecnico2,
    cambiarFechaRegistro,
    cambiarBusqueda,
    nuevo,
    grabar,
  };
};

export default useSoporteForm;
