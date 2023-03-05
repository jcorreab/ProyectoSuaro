import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('usuario/listar').then((res) => res.data);
