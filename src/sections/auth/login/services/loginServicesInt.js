import axiosMercredi from '../../../../utils/axiosMercredi';

export const login = (datos) => axiosMercredi.post('/login/acceder', datos).then((res) => res.data);
