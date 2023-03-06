import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/cliente/grabar', datos).then((res) => res.data);
export const editar = (datos) => axiosMercredi.put('/cliente/editar', datos).then((res) => res.data);
export const obtener = (codigo) => axiosMercredi.get(`/cliente/obtener?codigo=${codigo}`).then((res) => res.data);
