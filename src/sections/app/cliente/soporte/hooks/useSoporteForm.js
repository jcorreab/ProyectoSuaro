import { useState, useRef } from 'react';
import useError from '../../../../../hooks/app/useError';
import useSoporte from '../../../../../hooks/app/useSoporte';
import useMensaje from '../../../../../hooks/app/useMensaje';
import { validarVacios } from '../../../../../utils/app/func/fun_valida';
import * as servicio from '../servicios/servicios_int';
import { obtenerClienteLog } from '../../../../../utils/app/func/fun_storage';
import useCargando from '../../../../../hooks/app/useCargando';

const clienteLog = obtenerClienteLog();

const useSoporteForm = () => {
  const { empezarCarga, terminarCarga } = useCargando();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const { listaSoporte, listarSoporteApi } = useSoporte();
  const [datos, setDatos] = useState({
    fecha: new Date(),
    detalle: '',
  });
  const [soporte, setSoporte] = useState({
    codigo: '',
    nombre: '',
  });

  const soporteRef = useRef();
  const detalleRef = useRef();

  const [listaSoporteTabla, setListaSoporteTabla] = useState([]);

  const limpiarTabla = () => setListaSoporteTabla([]);
  const limpiarDatosSoporte = () => {
    setDatos({
      fecha: new Date(),
      detalle: '',
    });
    setSoporte({
      codigo: '',
      nombre: '',
    });
  };

  const cambiarDetalle = (e) => setDatos({ ...datos, detalle: String(e.target.value).toUpperCase() });
  const cambiarSoporte = (e) => {
    setSoporte(e);
  };

  const agregarSoporte = () => {
    const exiteSoporteEnTabla = listaSoporteTabla.filter((f) => f.codigo === soporte.codigo).length !== 0;
    if (exiteSoporteEnTabla) {
      mensajeSistema({
        texto: 'El soporte que seleccionò ya se encuentra registrado, ingrese otro en tal caso de ser necesario',
      });
      soporteRef.current.focus();
      return;
    }
    if (validarVacios(soporte.codigo)) {
      mensajeSistema({ texto: 'El soporte es requerido' });
      soporteRef.current.focus();
      return;
    }
    if (validarVacios(datos.detalle)) {
      mensajeSistema({ texto: 'El detalle es requerido' });
      detalleRef.current.focus();
      return;
    }
    const datosEnvio = {
      codigo: soporte.codigo,
      soporte: soporte.nombre,
      detalle: datos.detalle,
    };

    setListaSoporteTabla([...listaSoporteTabla, datosEnvio]);
    limpiarDatosSoporte();
    soporteRef.current.focus();
  };

  const eliminarSoporteTabla = (e) => {
    const nuevaLista = listaSoporteTabla.filter((f) => f.codigo !== e.id);
    setListaSoporteTabla(nuevaLista);
  };

  const nuevo = () => {
    limpiarDatosSoporte();
    limpiarTabla();
    listarSoporteApi();
    soporteRef.current.focus();
  };
  const grabar = async () => {
    try {
      if (listaSoporteTabla.length === 0) {
        mensajeSistema({ texto: 'No ha ingresado ningun soporte' });
        soporteRef.current.focus();
        return;
      }
      empezarCarga();
      const datosEnvio = {
        fecha_registro: datos.fecha,
        cliente: clienteLog.codigo,
        estado: false,
      };
      const soporteApi = await servicio.grabar(datosEnvio);
      listaSoporteTabla.forEach(async (f) => {
        await servicio.grabarDetalle({
          soporte: f.codigo,
          reservacion: soporteApi.id,
          detalle: f.detalle,
        });
      });
      servicio.enviarCorreo({ correo: clienteLog.correo, nombre: clienteLog.nombre });

      mensajeSistema({
        texto: 'Su soporte fue registrado correctamente, verifique su correo si su reservacion fue aceptada',
        variante: 'success',
      });
      nuevo();
    } catch (error) {
      errorHttp({ error: error.code, mensaje: 'Error al momento de grabar la reservacion' });
    } finally {
      terminarCarga();
    }
  };

  return {
    datos,
    soporte,
    listaSoporte,
    soporteRef,
    detalleRef,
    listaSoporteTabla,
    cambiarSoporte,
    cambiarDetalle,
    agregarSoporte,
    eliminarSoporteTabla,
    nuevo,
    grabar,
  };
};

export default useSoporteForm;
