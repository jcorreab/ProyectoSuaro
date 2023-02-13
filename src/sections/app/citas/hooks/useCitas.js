import { useState, useRef } from 'react';
import { inRange } from 'lodash';
import useEstudiante from './useEstudiante';
import useMensaje from './useMensaje';

const useCitas = () => {
  const { estudiantes } = useEstudiante();
  const { mensajeSistema } = useMensaje();
  const [estudiante, setEstudiante] = useState({
    codigo: '',
    nombre: '',
    correo: '',
  });
  const [invitado, setInvitado] = useState({
    nombreCompleto: '',
    edad: '',
  });
  const [invitados, setInvitados] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [abrirDialogo, setAbrirDialogo] = useState(false);
  // para le evento focus
  const estudianteRef = useRef();
  const fechaRef = useRef();
  const invitadoNombreRef = useRef();
  const invitadoEdadRef = useRef();

  const validarFechaHoraCita = () => {
    const fecCita = new Date(fecha);
    const dia = fecCita.getDay();
    const hora = fecCita.getHours();
    const minuto = fecCita.getMinutes();
    // validar si es fin de semana
    if (dia === 0 || dia === 6) return true;
    // validar lunes - jueves
    if (inRange(dia, 1, 5) && !inRange(hora, 9, 16)) return true;
    if (inRange(dia, 1, 5) && hora === 15 && minuto > 0) return true;
    // validar viernes
    if (dia === 5 && !inRange(hora, 10, 15)) return true;
    if (dia === 5 && hora === 14 && minuto > 0) return true;

    return false;
  };

  const cerrarDialogo = () => setAbrirDialogo(false);
  const abrirDialogoModal = () => setAbrirDialogo(true);
  const limpiarCampoEstudiante = () =>
    setEstudiante({
      codigo: '',
      nombre: '',
      correo: '',
    });
  const limpiarCampoInvitado = () =>
    setInvitado({
      nombreCompleto: '',
      edad: '',
    });
  const limpiarTablaInvitados = () => setInvitados([]);
  const cambiarEstudiante = (e) => {
    if (!e.esUltimoSemestre) {
      mensajeSistema({
        texto: 'El estudiante debe estar cursando el ultimo semestre de su respectiva carrera',
        variante: 'warning',
      });
      limpiarCampoEstudiante();
      return;
    }
    if (parseInt(e.edad, 10) < 18) {
      mensajeSistema({
        texto: 'El estudiante debe ser mayor de edad',
        variante: 'warning',
      });
      limpiarCampoEstudiante();
      return;
    }
    setEstudiante({ codigo: String(e.codigo), nombre: e.nombre, correo: e.correo });
  };
  const cambiarNombreInvitado = (e) => setInvitado({ ...invitado, nombreCompleto: e.target.value });
  const cambiarEdadInvitado = (e) => setInvitado({ ...invitado, edad: e.floatValue });
  const cambiarFecha = (e) => setFecha(e);
  const agregarInvitados = () => {
    if (invitado.nombreCompleto.trim().length === 0) {
      mensajeSistema({ texto: 'Ingrese el nombre del invitado', variante: 'warning' });
      invitadoNombreRef.current.focus();
      return;
    }
    if (invitado.edad < 18 || typeof invitado.edad === 'undefined') {
      mensajeSistema({ texto: 'El invitado debe ser mayor de edad', variante: 'warning' });
      invitadoEdadRef.current.focus();
      return;
    }
    if (invitados.length === 3) {
      mensajeSistema({ texto: 'Solo se puede invitar 3 personas por estudiante', variante: 'warning' });
      return;
    }
    const codigo = invitados.length === 0 ? 1 : invitados.at(-1).codigo + 1;
    const inv = { codigo, nombre: invitado.nombreCompleto, edad: invitado.edad };
    setInvitados([...invitados, inv]);
    limpiarCampoInvitado();
    invitadoNombreRef.current.focus();
  };
  const quitarInvitado = (inv) => {
    const filtro = invitados.filter((f) => f.codigo !== inv);
    setInvitados(filtro);
  };
  const guardar = () => {
    if (String(estudiante.codigo).trim().length === 0) {
      mensajeSistema({
        texto: 'El estudiante es requerido',
        variante: 'warning',
      });
      estudianteRef.current.focus();
      return;
    }
    if (validarFechaHoraCita()) {
      mensajeSistema({
        texto: 'Las citas se realizan de Lunes a Jueves de 9:00 a 15:00 y los viernes de 10:00 a 14:00',
        variante: 'warning',
      });
      fechaRef.current.focus();
      return;
    }
    abrirDialogoModal();
  };
  const guardarCambios = () => {
    mensajeSistema({
      texto: 'Felicidades! tu cita ha sido registrada correctamente',
      variante: 'success',
    });
    cerrarDialogo();
    nuevo();
  };
  const nuevo = () => {
    limpiarCampoEstudiante();
    limpiarCampoInvitado();
    limpiarTablaInvitados();
  };
  return {
    abrirDialogo,
    estudiante,
    estudiantes,
    fecha,
    invitado,
    invitados,
    estudianteRef,
    fechaRef,
    invitadoNombreRef,
    invitadoEdadRef,
    cambiarEstudiante,
    cambiarFecha,
    cambiarNombreInvitado,
    cambiarEdadInvitado,
    agregarInvitados,
    quitarInvitado,
    cerrarDialogo,
    guardar,
    guardarCambios,
    nuevo,
  };
};

export default useCitas;
