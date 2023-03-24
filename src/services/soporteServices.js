import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('soporte/listar').then((res) => res.data);
