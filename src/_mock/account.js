// ----------------------------------------------------------------------
const usuario = JSON.parse(window.localStorage.getItem('usuario')) ?? 'USER';
const account = {
  displayName: usuario.usuario,
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
