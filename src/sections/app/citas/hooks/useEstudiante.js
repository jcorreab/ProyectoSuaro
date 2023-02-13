import { useState, useEffect } from 'react';
import { listarEstudiantes } from '../services/CitasServices';

const useEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const cargarEstudiantes = () =>
      listarEstudiantes().then((res) => {
        const estudiantesApi = res.map((m) => ({
          codigo: m.id,
          codigoalternativo: m.id,
          nombre: m.name,
          correo: m.email,
          edad: Math.floor(Math.random() * 40) + 22,
          esUltimoSemestre: Boolean(Math.round(Math.random())),
        }));
        setEstudiantes(estudiantesApi);
      });
    cargarEstudiantes();
  }, []);
  return {
    estudiantes,
    // cargarEstudiantes,
  };
};

export default useEstudiante;
