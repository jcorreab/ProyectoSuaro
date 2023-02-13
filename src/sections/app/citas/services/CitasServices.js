import axios from 'axios';

/**
 *
 * @returns {Promise<Array<object>>}
 */
export const listarEstudiantes = () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data);
