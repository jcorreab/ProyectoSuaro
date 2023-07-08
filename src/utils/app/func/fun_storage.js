export const guardarClienteLog = (datos) => {
  try {
    window.localStorage.setItem('clientelog', JSON.stringify(datos));
  } catch (error) {
    //
  }
};

export const obtenerClienteLog = () => {
  try {
    const cliente = JSON.parse(window.localStorage.getItem('clientelog'));
    return {
      codigo: cliente.record.id,
      usuario: cliente.record.username,
      nombre: cliente.record.nombre,
    };
  } catch (error) {
    return {
      codigo: '',
      usuario: '',
      nombre: '',
    };
  }
};
