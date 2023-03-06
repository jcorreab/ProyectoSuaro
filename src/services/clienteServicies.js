import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('cliente/listar').then((res) => res.data);
