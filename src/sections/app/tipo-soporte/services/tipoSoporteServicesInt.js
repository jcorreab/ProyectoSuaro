import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/tipo_soporte/grabar', datos).then((res) => res.data);
export const editar = (datos) => axiosMercredi.put('/tipo_soporte/editar', datos).then((res) => res.data);
export const obtener = (codigo) => axiosMercredi.get(`/tipo_soporte/obtener?codigo=${codigo}`).then((res) => res.data);
