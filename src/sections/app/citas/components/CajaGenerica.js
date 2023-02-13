import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment, TextField } from '@mui/material';
import ModalGenerico from './ModalGenerico';
import useMensaje from '../hooks/useMensaje';
import { BotonIconBuscar } from './Botones';

CajaGenerica.propTypes = {
  estadoInicial: PropTypes.object.isRequired, // codigoAlternativo y nombre,
  tituloTexto: PropTypes.object.isRequired, // nombre y descripcion ,
  tituloModal: PropTypes.string.isRequired, // nombre del modal
  retornarDatos: PropTypes.func.isRequired, // retorna los datos del modal al momento de seleccionar
  datos: PropTypes.array.isRequired, // datos que van a llenar la tabla,
  desactivarBusqueda: PropTypes.bool, // desactiva la opcion de buscar
  ejecutarDependencia: PropTypes.func,
  activarDependencia: PropTypes.bool,
};

function CajaGenerica(props) {
  const {
    estadoInicial,
    tituloTexto,
    tituloModal,
    retornarDatos,
    desactivarBusqueda,
    datos,
    ejecutarDependencia,
    activarDependencia,
    // eslint-disable-next-line react/prop-types
    inputRef,
  } = props;

  const { mensajeSistema } = useMensaje();

  const [formulario, setFormulario] = React.useState(estadoInicial);

  const [abrirModalGenerico, setAbrilModalGenerico] = React.useState(false);
  const cerrarModalGenerico = () => setAbrilModalGenerico(false);
  const retornarDatosGenerico = (e) => {
    const item = e.row;
    retornarDatos(item);
    cerrarModalGenerico();
  };
  const retonarMensaje = () => {
    mensajeSistema({ texto: 'No existe el registro con el criterio indicado', variante: 'warning' });
    setFormulario({
      codigoAlternativo: datos.at(0).codigoalternativo,
      nombre: datos.at(0).nombre,
    });
    setAbrilModalGenerico(true);
    retornarDatos(datos.at(0));
  };
  const buscarPorCodigo = () => {
    const esBusqueda = String(formulario.codigoAlternativo).trim().length === 0;
    if (!esBusqueda) {
      const resultado = datos.filter(
        (f) => String(f.codigoalternativo).trim() === String(formulario.codigoAlternativo).trim()
      );
      if (resultado.length === 0) {
        retonarMensaje();
        return;
      }
      setFormulario({
        ...formulario,
        nombre: resultado[0].nombre,
      });
      retornarDatos(resultado[0]);
      return;
    }
    setAbrilModalGenerico(true);
  };

  React.useEffect(() => {
    setFormulario(estadoInicial);
  }, [estadoInicial]);
  return (
    <>
      <ModalGenerico
        nombre={tituloModal}
        abrirModal={abrirModalGenerico}
        retornarDatos={retornarDatosGenerico}
        cerrarModal={cerrarModalGenerico}
        datos={datos}
      />
      <Grid container item xs={12} spacing={1}>
        <Grid item md={4} sm={4} xs={12}>
          <TextField
            inputRef={inputRef}
            fullWidth
            size="small"
            disabled={desactivarBusqueda}
            label={`${tituloTexto.nombre}`}
            required
            value={formulario.codigoAlternativo}
            onChange={(e) => {
              if (activarDependencia) {
                ejecutarDependencia(e);
              }
              setFormulario({
                ...formulario,
                codigoAlternativo: e.target.value.toUpperCase(),
                nombre: '----',
              });
              //   estadoInicial.nombre = '----';
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {
                    <BotonIconBuscar
                      propiedades={{
                        disabled: desactivarBusqueda || datos.length === 0,
                        onClick: () => {
                          buscarPorCodigo();
                        },
                      }}
                    />
                  }
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <TextField disabled fullWidth size="small" label={tituloTexto.descripcion} value={formulario.nombre} />
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(CajaGenerica);
