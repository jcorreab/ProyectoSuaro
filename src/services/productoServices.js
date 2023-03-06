import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('item/listar').then((res) => res.data);
