import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/soporte/registrar', datos).then((res) => res.data);
export const listar = () => axiosMercredi.get('/soporte/lstar').then((res) => res.data);
