import axiosMain from '../utils/app/http/axiosMain';

/**
 *
 * @returns {Promise}
 */
export const listarSoporte = async () => {
  const res = await axiosMain.get('/collections/tipo_soporte/records');
  return res.data;
};

export const obtenerUsuarios = async ({ codigo }) => {
  const res = await axiosMain.get(`/collections/persona/records/${codigo}`);
  return res.data;
};

export const datosTiempoUsuario = async () => {
  const res = await axiosMain.get(`/collections/asistencia/records`);
  return res.data.items;
};
