import axiosMercredi from '../../../../utils/axiosMercredi';

export const grabar = (datos) => axiosMercredi.post('/soporte/registrar', datos).then((res) => res.data);
