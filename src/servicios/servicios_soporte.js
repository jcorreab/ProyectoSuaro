import axiosMain from '../utils/app/http/axiosMain';

/**
 *
 * @returns {Promise}
 */
export const listarSoporte = async () => {
  const res = await axiosMain.get('/collections/tipo_soporte/records');
  return res.data;
};
