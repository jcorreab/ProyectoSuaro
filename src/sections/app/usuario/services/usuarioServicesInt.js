import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/usuario/grabar', datos).then((res) => res.data);
export const editar = (datos) => axiosMercredi.put('/usuario/editar', datos).then((res) => res.data);
export const obtener = (codigo) => axiosMercredi.get(`/usuario/obtener?codigo=${codigo}`).then((res) => res.data);
