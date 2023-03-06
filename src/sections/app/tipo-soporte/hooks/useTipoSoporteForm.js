import { useState, useRef } from 'react';
import useError from '../../../../hooks/app/useError';
import useMensaje from '../../../../hooks/app/useMensaje';
import useTipoSoporte from '../../../../hooks/app/useTipoSoporte';
import * as servicio from '../services/tipoSoporteServicesInt';

const useTipoSoporteForm = () => {
  const { errorHttp } = useError();
  const { listaTipoSoporte, listaTipoSoporteCopia, setListaTipoSoporte, listarTipoSoporteApi } = useTipoSoporte();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    codigo: '',
    descripcion: '',
    estado: true,
  });
  const [buscar, setBuscar] = useState('');
  const descripcionRef = useRef();

  const cambiarDescripcion = (e) => setFormulario({ ...formulario, descripcion: String(e.target.value).toUpperCase() });
  const cambiarEstado = (e) => setFormulario({ ...formulario, estado: e.target.checked });
  const cambiarBusqueda = (e) => {
    const texto = String(e.target.value).toUpperCase();
    const filtro = listaTipoSoporteCopia.filter((f) => String(f.descripcion).toUpperCase().includes(texto));
    setListaTipoSoporte(filtro);
    setBuscar(e.target.value);
  };

  const nuevo = () => {
    setFormulario({
      codigo: '',
      descripcion: '',
      estado: true,
    });
  };
  const agregarRegistro = () => {
    servicio
      .grabar({ ...formulario, codigo: 0 })
      .then((res) => {
        if (res !== 200) {
          return;
        }
        mensajeSistema({
          texto: `El Tipo Soporte ${formulario.descripcion} se grabo correctamente`,
          variante: 'success',
        });
        nuevo();
        listarTipoSoporteApi();
      })
      .catch((error) => errorHttp({ mensaje: 'Error al momento de grabar', error }))
      .finally();
  };
  const editarRegistro = () => {
    servicio
      .editar(formulario)
      .then((res) => {
        if (res !== 200) {
          return;
        }
        mensajeSistema({
          texto: `El Tipo Soporte ${formulario.descripcion} se actualizo correctamente`,
          variante: 'success',
        });
        listarTipoSoporteApi();
      })
      .catch((error) => errorHttp({ mensaje: 'Error al momento de editar', error }))
      .finally();
  };
  const obtenerRegistro = (e) => {
    servicio
      .obtener(e.id)
      .then((res) => {
        setFormulario(res);
      })
      .catch((error) => errorHttp({ mensaje: 'Error al momento de obtener el registro', error }))
      .finally();
  };
  const grabar = () => {
    if (formulario.descripcion.trim().length === 0) {
      mensajeSistema({
        texto: `La descripcion es requerida`,
        variante: 'warning',
      });
      descripcionRef.current.focus();
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

  // const eliminarRegistro = () => {
  //   servicio
  //     .eliminar(formulario)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch()
  //     .finally();
  // };

  return {
    formulario,
    descripcionRef,
    listaTipoSoporte,
    buscar,
    obtenerRegistro,
    cambiarDescripcion,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    grabar,
  };
};

export default useTipoSoporteForm;
