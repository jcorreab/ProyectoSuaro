import axiosMercredi from '../utils/axiosMercredi';

export const listar = () => axiosMercredi.get('tipo_usuario/listar').then((res) => res.data);
