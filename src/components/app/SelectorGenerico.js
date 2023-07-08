import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment, TextField } from '@mui/material';
import ModalGenerico from './ModalGenerico';
import useMensaje from '../../hooks/app/useMensaje';
import { BotonIconBuscar } from './Botones';

SelectorGenerico.propTypes = {
  estadoInicial: PropTypes.object.isRequired, // codigoAlternativo y nombre,
  tituloTexto: PropTypes.string.isRequired, // nombre y descripcion ,
  tituloModal: PropTypes.string.isRequired, // nombre del modal
  retornarDatos: PropTypes.func.isRequired, // retorna los datos del modal al momento de seleccionar
  datos: PropTypes.array.isRequired, // datos que van a llenar la tabla,
  desactivarBusqueda: PropTypes.bool, // desactiva la opcion de buscar
};

function SelectorGenerico(props) {
  const {
    estadoInicial,
    tituloTexto,
    tituloModal,
    retornarDatos,
    desactivarBusqueda,
    datos,
    // eslint-disable-next-line react/prop-types
    inputRef,
  } = props;

  const { mensajeSistema } = useMensaje();

  const [formulario, setFormulario] = React.useState(estadoInicial);

  const [abrirModalGenerico, setAbrilModalGenerico] = React.useState(false);
  const cerrarModalGenerico = () => setAbrilModalGenerico(false);
  const retornarDatosGenerico = (e) => {
    const item = e.row;
    retornarDatos({ ...item, nombre: String(item.nombre).toUpperCase() });
    cerrarModalGenerico();
  };
  const retonarMensaje = () => {
    mensajeSistema({ texto: 'No existe el registro con el criterio indicado', variante: 'warning' });
    setFormulario({
      codigoAlternativo: datos.at(0).codigoalternativo,
      nombre: String(datos.at(0).nombre).toUpperCase(),
    });
    setAbrilModalGenerico(true);
    retornarDatos(datos.at(0));
  };
  const buscarPorCodigo = () => {
    const esBusqueda = String(formulario.nombre).trim().length === 0;
    if (!esBusqueda) {
      const resultado = datos.filter((f) =>
        String(f.nombre).toUpperCase().trimEnd().includes(String(formulario.nombre).toUpperCase())
      );
      if (resultado.length === 0) {
        retonarMensaje();
        return;
      }
      setFormulario({
        ...formulario,
        nombre: String(resultado[0].nombre).toUpperCase(),
      });
      retornarDatos({ ...resultado[0], nombre: String(resultado[0].nombre).toUpperCase() });
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
        <Grid item xs={12}>
          <TextField
            autoFocus
            inputRef={inputRef}
            variant="filled"
            fullWidth
            disabled={desactivarBusqueda}
            label={tituloTexto}
            required
            value={formulario.nombre}
            onChange={(e) => {
              setFormulario({
                ...formulario,
                nombre: e.target.value.toUpperCase(),
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
      </Grid>
    </>
  );
}

export default React.memo(SelectorGenerico);
