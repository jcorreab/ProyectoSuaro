import { useState, useRef, useEffect } from 'react';
import useError from '../../../../../hooks/app/useError';
import useSoporte from '../../../../../hooks/app/useSoporte';
import useMensaje from '../../../../../hooks/app/useMensaje';
import useCargando from '../../../../../hooks/app/useCargando';
import * as servicios from '../servicios/servicios_int';
import { obtenerClienteLog } from '../../../../../utils/app/func/fun_storage';

const clienteLog = obtenerClienteLog();

const useInformeSoporte = () => {
  const { empezarCarga, terminarCarga } = useCargando();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const { listaSoporte, listarSoporteApi } = useSoporte();
  const [listaLugares, setListaLugares] = useState([]);
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

  const cambiarFecha = (e) => {
    setDatos({ ...datos, fechaHasta: e });
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

  const cargarListaLugares = () => {
    servicios.listarLugares().then((r) => {
      const mapearId = r.items.map((f, i) => ({ ...f, codigo: i + 1 }));
      console.log("🚀 ~ file: useInformeSoporte.js:64 ~ servicios.listarLugares ~ mapearId:", mapearId)

      setListaLugares(mapearId);
    });
  };

  useEffect(() => {
    cargarListaLugares();
  }, []);

  const generarHorarioDiarioPorLugar = (nombrelugar, identrenador, fecha) => {
    function formatTime(hour) {
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    const arregloHoras = Array.from({ length: 11 }, (_, index) => {
      const horaDesde = index + 8;
      const horaHasta = index + 9;
      const fechaDesde = fecha;
      fechaDesde.setHours(horaDesde, 0, 0);
      const fechaHasta = fecha;
      fechaHasta.setHours(horaHasta, 0, 0);
      const formattedFechaDesde = fechaDesde.toISOString().slice(0, 19).replace('T', ' ');
      const formattedFechaHasta = fechaHasta.toISOString().slice(0, 19).replace('T', ' ');
      return {
        horadesde: formatTime(horaDesde),
        horahasta: formatTime(horaHasta),
        fecha: fecha.toISOString().slice(0, 10),
        nombre: nombrelugar,
        id: identrenador,
        fechaDesde: formattedFechaDesde,
        fechaHasta: formattedFechaHasta,
      };
    });

    return arregloHoras;
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
        .listarLugares()
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
    cambiarFecha,
    generarHorarioDiarioPorLugar,
    listaLugares,
  };
};

export default useInformeSoporte;
