import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('tipo_soporte/listar').then((res) => res.data);
