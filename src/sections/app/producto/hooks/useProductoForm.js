import { useState, useRef } from 'react';
import useProducto from '../../../../hooks/app/useProducto';
import useError from '../../../../hooks/app/useError';
import useMensaje from '../../../../hooks/app/useMensaje';
import * as servicio from '../services/productoServicesInt';

const useProductoForm = () => {
  const { errorHttp } = useError();
  const { listaProducto, listaProductoCopia, setListaProducto, listarProductoApi } = useProducto();
  const { mensajeSistema } = useMensaje();
  const [formulario, setFormulario] = useState({
    codigo: '',
    nombre: '',
    estado: true,
  });
  const [buscar, setBuscar] = useState('');
  const descripcionRef = useRef();

  const cambiarDescripcion = (e) => setFormulario({ ...formulario, nombre: String(e.target.value).toUpperCase() });
  const cambiarEstado = (e) => setFormulario({ ...formulario, estado: e.target.checked });
  const cambiarBusqueda = (e) => {
    const texto = String(e.target.value).toUpperCase();
    const filtro = listaProductoCopia.filter((f) => String(f.nombre).toUpperCase().includes(texto));
    setListaProducto(filtro);
    setBuscar(e.target.value);
  };

  const nuevo = () => {
    setFormulario({
      codigo: '',
      nombre: '',
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
          texto: `El Producto ${formulario.nombre} se grabo correctamente`,
          variante: 'success',
        });
        nuevo();
        listarProductoApi();
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
          texto: `El Producto ${formulario.nombre} se actualizo correctamente`,
          variante: 'success',
        });
        listarProductoApi();
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
    if (formulario.nombre.trim().length === 0) {
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
    listaProducto,
    buscar,
    obtenerRegistro,
    cambiarDescripcion,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    grabar,
  };
};

export default useProductoForm;
