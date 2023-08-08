import { useState, useRef, useEffect } from 'react';
import useError from '../../../../../hooks/app/useError';
import useMensaje from '../../../../../hooks/app/useMensaje';
import * as servicio from '../servicios/servicios_int';
import useCargando from '../../../../../hooks/app/useCargando';
import { obtenerClienteLog } from '../../../../../utils/app/func/fun_storage';
// import * as ServiciosEntrenadores from '../servicios/servicios_int'

const useSoporteForm = () => {
  const clienteLog = obtenerClienteLog();
  const { empezarCarga, terminarCarga } = useCargando();
  const { errorHttp } = useError();
  const { mensajeSistema } = useMensaje();
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [seleccionarReserva, setSeleccionarReserva] = useState([]);
  const [datos, setDatos] = useState({
    fecha: new Date(),
    detalle: '',
  });
  const [soporte, setSoporte] = useState({
    codigo: '',
    nombre: '',
  });

  const cambiarFecha = (e) => {
    // console.log(e.target.value);
    setDatos({
      ...datos,
      fecha: new Date(e),
    });
  };

  const soporteRef = useRef();
  const detalleRef = useRef();

  const [listaSoporteTabla, setListaSoporteTabla] = useState([]);
  const [listaTablaEntrenamientos, setListaTablaEntrenamientos] = useState([]);

  const limpiarDatosEntrenador = () => {
    setEntrenador({
      id: '',
      nombre: '',
      codigoAlternativo: 0,
    });
  };
  const [entrenador, setEntrenador] = useState({
    id: '',
    nombre: '',
    codigoAlternativo: 0,
  });

  const cambiarDetalle = (e) => setDatos({ ...datos, detalle: String(e.target.value).toUpperCase() });
  const cambiarSoporte = (e) => {
    setSoporte(e);
  };
  const cambiarEntrenador = (e) => {
    setEntrenador({
      id: e.id,
      nombre: e.nombre,
      codigoalternativo: e.codigoalternativo,
    });
  };

  const eliminarSoporteTabla = (e) => {
    const nuevaLista = listaSoporteTabla.filter((f) => f.codigo !== e.id);
    setListaSoporteTabla(nuevaLista);
  };

  const nuevo = () => {
    setListaTablaEntrenamientos([]);
    limpiarDatosEntrenador();
    // setListaTablaEntrenamientos()
    //   listarSoporteApi();
    soporteRef.current.focus();
  };
  const grabar = async () => {
    try {
      if (listaEntrenadores.length === 0) {
        mensajeSistema({ texto: 'No hay ningun entrenamiento seleccionado' });
        soporteRef.current.focus();
        return;
      }
      const listardatosActual = seleccionarReserva.map((p) => listaTablaEntrenamientos.find((f) => f.codigo === p));

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
      // const datosEnvio = {
      //   fecha_registro: datos.fecha,
      //   cliente: clienteLog.codigo,
      //   estado: false,
      // };
      // const soporteApi = await servicio.grabar(datosEnvio);
      DatosAGrabar.forEach(async (f) => {
        await servicio.grabar({
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

  const obtenerDatosEntrenadores = () => {
    servicio
      .ListarEntrenadores()
      .then((r) => {
        const mapearId = r.map((a, i) => ({ ...a, codigo: i + 1 }));
        setListaEntrenadores(mapearId);
      })
      .catch((e) => console.log(e));
  };

  const generarHorarioDiarioPorEntrenador = (nombreentrenador, identrenador, fecha) => {
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
        nombre: nombreentrenador,
        id: identrenador,
        fechaDesde: formattedFechaDesde,
        fechaHasta: formattedFechaHasta,
      };
    });

    return arregloHoras;
  };

  const buscarHorarios = () => {
    if (entrenador.nombre.length === 0) {
      mensajeSistema({
        texto: 'Escoga un entrenador antes de realizar una busqueda',
        variante: 'warning',
      });
      return false;
    }

    const datosAmapear = generarHorarioDiarioPorEntrenador(entrenador.nombre, entrenador.id, datos.fecha).map(
      (f, e) => ({
        ...f,
        codigo: e + 1,
      })
    );
    setListaTablaEntrenamientos(datosAmapear);
    return false;
  };

  useEffect(() => {
    obtenerDatosEntrenadores();
  }, []);

  return {
    datos,
    soporte,
    soporteRef,
    detalleRef,
    listaSoporteTabla,
    cambiarSoporte,
    cambiarDetalle,
    eliminarSoporteTabla,
    nuevo,
    grabar,
    listaEntrenadores,
    entrenador,
    cambiarEntrenador,
    buscarHorarios,
    listaTablaEntrenamientos,
    cambiarFecha,
    setSeleccionarReserva,
  };
};

export default useSoporteForm;
