import axiosMain from '../../../../../utils/app/http/axiosMain';

export const listar = async (cliente) => {
  const apiUrl = `/collections/informe_soporte/records?filter=(cliente='${cliente}')`;
  const res = await axiosMain.get(apiUrl);
  return res.data;
};
