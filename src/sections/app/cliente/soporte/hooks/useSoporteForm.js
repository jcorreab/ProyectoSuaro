import { useState, useRef } from 'react';
import useError from '../../../../../hooks/app/useError';
import useSoporte from '../../../../../hooks/app/useSoporte';
import useMensaje from '../../../../../hooks/app/useMensaje';
import { validarVacios } from '../../../../../utils/app/func/fun_valida';

const useSoporteForm = () => {
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

  const cambiarDetalle = (e) => setDatos({ ...datos, detalle: e.target.value });
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

  const nuevo = () => {};
  const grabar = () => {};

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
