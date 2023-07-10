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
      correo: cliente.record.email,
    };
  } catch (error) {
    return {
      codigo: '',
      usuario: '',
      nombre: '',
      correo: '',
    };
  }
};

export const guardarUsuarioLog = (datos) => {
  try {
    window.localStorage.setItem('usuariolog', JSON.stringify(datos));
  } catch (error) {
    //
  }
};

export const obtenerUsuarioLog = () => {
  try {
    const usuario = JSON.parse(window.localStorage.getItem('usuariolog'));
    return {
      codigo: usuario.record.id,
      usuario: usuario.record.username,
      nombre: usuario.record.nombre,
      esUsuario: usuario.esUsuario,
    };
  } catch (error) {
    return {
      codigo: '',
      usuario: '',
      nombre: '',
      esUsuario: false,
    };
  }
};
