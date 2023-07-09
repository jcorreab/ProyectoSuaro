import { useContext } from 'react';
import { CargandoContext } from '../../contexts/app/cargandoContext';

// ----------------------------------------------------------------------

const useCargando = () => useContext(CargandoContext);

export default useCargando;
