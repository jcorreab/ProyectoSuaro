import axios from 'axios';
import axiosMain from '../../../../../utils/app/http/axiosMain';

export const grabar = async (datos) => {
  const res = await axiosMain.post('/collections/reservacion/records', datos);
  return res.data;
};

export const grabarDetalle = async (datos) => {
  const res = await axiosMain.post('/collections/detalle_reservacion/records', datos);
  return res.data;
};

export const enviarCorreo = (datos) => {
  axios.get(`http://127.0.0.1:8000/api/correo/listar?correo=${datos.correo}&nombre=${datos.nombre}`);
};
