import { useState, useRef, useEffect } from 'react';
import useError from '../../../../../hooks/app/useError';
import useMensaje from '../../../../../hooks/app/useMensaje';
import useCargando from '../../../../../hooks/app/useCargando';
import * as servicios from '../servicios/servicios_int';
import { obtenerClienteLog } from '../../../../../utils/app/func/fun_storage';

const clienteLog = obtenerClienteLog();

const useInformeSoporte = () => {
  const { empezarCarga, terminarCarga } = useCargando();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const [listaLugares, setListaLugares] = useState([]);
  const [seleccionarReserva, setSeleccionarReserva] = useState([]);
  const [datos, setDatos] = useState({
    fecha: new Date(),
  });
  const [lugar, setLugar] = useState({
    id: '',
    codigo: '',
    nombres: '',
  });
  const [informe, setInforme] = useState([]);

  const soporteRef = useRef();

  const limpiarTabla = () => setInforme([]);
  const limpiarDatosBusqueda = () => {
    setDatos({ fechaDesde: new Date(), fechaHasta: new Date(), esTodo: true });
    setLugar({
      codigo: '',
      nombres: '',
    });
  };
  const buscarHorarios = () => {
    if (lugar.nombres.length === 0) {
      mensajeSistema({
        texto: 'Escoga un entrenador antes de realizar una busqueda',
        variante: 'warning',
      });
      return false;
    }

    const datosAmapear = generarHorarioDiarioPorLugar(lugar.nombres, lugar.id, datos.fecha).map((f, e) => ({
      ...f,
      codigo: e + 1,
    }));
    console.log(datosAmapear);
    setListaLugares(datosAmapear);
    return false;
  };

  const cambiarFecha = (e) => {
    setDatos({ ...datos, fecha: e });
    limpiarTabla();
  };

  const cambiarLugar = (e) => {
    setLugar(e);
    limpiarTabla();
  };

  const cargarListaLugares = () => {
    servicios.listarLugares().then((r) => {
      const mapearId = r.items.map((f, i) => ({ ...f, codigo: i + 1, nombre: f.nombres }));
      //  console.log('🚀 ~ file: useInformeSoporte.js:64 ~ servicios.listarLugares ~ mapearId:', mapearId);

      setListaLugares(mapearId);
    });
  };

  useEffect(() => {
    cargarListaLugares();
  }, []);

  const generarHorarioDiarioPorLugar = (nombrelugar, idlugar, fecha) => {
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
        id: idlugar,
        fechaDesde: formattedFechaDesde,
        fechaHasta: formattedFechaHasta,
      };
    });

    return arregloHoras;
  };
  const grabar = async () => {
    try {
      if (listaLugares.length === 0) {
        mensajeSistema({ texto: 'No hay ningun entrenamiento seleccionado' });
        soporteRef.current.focus();
        return;
      }
      const listardatosActual = seleccionarReserva.map((p) => listaLugares.find((f) => f.codigo === p));

      const DatosAGrabar = listardatosActual.map((f) => ({
        persona: clienteLog.correo,
        fecha: f.fecha,
        lugar: '',
        entrenador: f.id,
        estado: true,
        horadesde: f.fechaDesde,
        horahasta: f.fechaHasta,
      }));
      console.log(DatosAGrabar);
      empezarCarga();

      DatosAGrabar.forEach(async (f) => {
        await servicios.grabar({
          f,
        });
      });

      mensajeSistema({
        texto: 'Sus Reseravas fueron Realizadas con exito',
        variante: 'success',
      });
      nuevo();
    } catch (error) {
      errorHttp({ error: error.code, mensaje: 'Error al momento de grabar la reservacion' });
    } finally {
      terminarCarga();
    }
  };

  const nuevo = () => {
    limpiarTabla();
    limpiarDatosBusqueda();
  };

  return {
    datos,
    cambiarLugar,
    informe,
    soporteRef,
    lugar,
    buscarHorarios,
    nuevo,
    cambiarFecha,
    generarHorarioDiarioPorLugar,
    listaLugares,
    setSeleccionarReserva,
    grabar,
  };
};

export default useInformeSoporte;
