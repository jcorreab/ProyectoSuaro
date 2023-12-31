import axiosMain from '../../../../../utils/app/http/axiosMain';

export const listar = async (cliente) => {
  const apiUrl = `/collections/informe_soporte/records?filter=(cliente='${cliente}')`;
  const res = await axiosMain.get(apiUrl);
  return res.data;
};
export const listarLugares = async () => {
  const apiUrl = `/collections/lugar/records`;
  const res = await axiosMain.get(apiUrl);
  return res.data;
};
export const grabar = async (datos) => {
  const res = await axiosMain.post('/collections/reservar/records', datos);
  return res.data;
};

