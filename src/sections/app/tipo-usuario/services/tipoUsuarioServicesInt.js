import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/tipo_usuario/grabar', datos).then((res) => res.data);
export const editar = (datos) => axiosMercredi.put('/tipo_usuario/editar', datos).then((res) => res.data);
export const obtener = (codigo) => axiosMercredi.get(`/tipo_usuario/obtener?codigo=${codigo}`).then((res) => res.data);
