import axiosMain from '../../../../../utils/app/http/axiosMain';

/**
 *
 * @param {*} datos
 * @returns
 */
export const acceder = async (datos) => {
  const apiUrl = '/collections/cliente/auth-with-password';
  const res = await axiosMain.post(apiUrl, datos);
  return res.data;
};
