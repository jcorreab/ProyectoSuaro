import { useState, useRef } from 'react';
import useError from '../../../../../hooks/app/useError';
import useSoporte from '../../../../../hooks/app/useSoporte';
import useMensaje from '../../../../../hooks/app/useMensaje';
import useCargando from '../../../../../hooks/app/useCargando';
import * as servicios from '../servicios/servicios_int';
import { obtenerClienteLog } from '../../../../../utils/app/func/fun_storage';

const clienteLog = obtenerClienteLog()

const useInformeSoporte = () => {
  const { empezarCarga, terminarCarga } = useCargando();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const { listaSoporte, listarSoporteApi } = useSoporte();
  const [datos, setDatos] = useState({
    fechaDesde: new Date(),
    fechaHasta: new Date(),
    esTodo: true,
    esSolucion: false,
  });
  const [soporte, setSoporte] = useState({
    codigo: '',
    nombre: '',
  });
  const [informe, setInforme] = useState([]);

  const soporteRef = useRef();

  const limpiarTabla = () => setInforme([]);
  const limpiarDatosBusqueda = () => {
    setDatos({ fechaDesde: new Date(), fechaHasta: new Date(), esTodo: true });
    setSoporte({
      codigo: '',
      nombre: '',
    });
  };

  const cambiarFechaDesde = (e) => {
    setDatos({ ...datos, fechaDesde: e });
    limpiarTabla();
  };
  const cambiarFechaHasta = (e) => {
    setDatos({ ...datos, fechaHasta: e });
    limpiarTabla();
  };
  const cambiarSoporte = (e) => {
    setSoporte(e);
    limpiarTabla();
  };
  const cambiarEsSolucion = (e) => {
    setDatos({ ...datos, esSolucion: e.target.checked });
    limpiarTabla();
  };
  const cambiarEsTodo = (e) => {
    setDatos({ ...datos, esTodo: e.target.checked });
    limpiarTabla();
  };

  const buscar = () => {
    try {
      if (!datos.esTodo) {
        if (soporte.codigo.trim().length === 0) {
          mensajeSistema({ texto: 'El soporte es requerido' });
          soporteRef.current.focus();
          return;
        }
      }

      empezarCarga();
      servicios
        .listar(clienteLog.codigo)
        .then((res) => {
          if (res.items.length === 0) {
            mensajeSistema({ texto: 'No se encontraron registros con el criterio indicado' });
            return;
          }
          if (datos.esTodo) {
            setInforme(res.items);
            return;
          }
          const resApi = res.items.filter((f) => f.id_soporte === soporte.codigo && f.estado === datos.esSolucion);
          if (resApi.length === 0) {
            mensajeSistema({ texto: 'No se encontraron registros con el criterio indicado' });
            return;
          }
          setInforme(resApi);
        })
        .catch((error) => errorHttp({ error: error.code, mensaje: 'Error al buscar la informacion' }))
        .finally(() => terminarCarga());
    } catch (error) {
      //
    }
  };
  const nuevo = () => {
    limpiarTabla();
    limpiarDatosBusqueda();
    listarSoporteApi();
  };

  return {
    datos,
    soporte,
    informe,
    listaSoporte,
    soporteRef,
    cambiarFechaDesde,
    cambiarFechaHasta,
    cambiarSoporte,
    cambiarEsSolucion,
    cambiarEsTodo,
    buscar,
    nuevo,
  };
};

export default useInformeSoporte;
