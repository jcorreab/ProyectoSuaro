import { useState, useEffect, memo } from 'react';
import { TextField, Grid, Modal, Fade, InputAdornment, Box, Button } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import {
  estiloDatagrid,
  estiloTabla,
  estiloModal,
  estilosContenedor,
  estiloActivo,
  estiloInactivo,
} from '../styles/Estilos';
import { IconoDataGrid } from './IconoDatagrid';
import { BotonIconBuscar } from './Botones';

ModalGenerico.propTypes = {
  nombre: PropTypes.string.isRequired, // nombre del modal
  abrirModal: PropTypes.bool.isRequired, // abre el modal
  retornarDatos: PropTypes.func.isRequired, // retorna los datos del modal al momento de seleccionar
  cerrarModal: PropTypes.func.isRequired, // cierra el modal
  datos: PropTypes.array.isRequired, // datos que van a llenar la tabla
};

const cabecera = [
  {
    field: 'codigoalternativo',
    headerName: 'Codigo',
    width: 100,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '****';
      }

      return `${params.value}`.toUpperCase();
    },
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 250,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '****';
      }
      return `${params.value}`.toUpperCase();
    },
  },
  {
    field: 'edad',
    headerName: 'Edad',
    width: 80,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '****';
      }
      return `${params.value} Años`;
    },
  },
  {
    field: 'correo',
    headerName: 'Correo',
    width: 200,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '****';
      }
      return `${params.value}`;
    },
  },
  {
    field: 'esUltimoSemestre',
    headerName: 'Ultimo semestre',
    width: 150,
    renderCell: (param) =>
      param.row.esUltimoSemestre ? (
        <Button variant="containded" style={estiloActivo}>
          Si
        </Button>
      ) : (
        <Button variant="containded" style={estiloInactivo}>
          No
        </Button>
      ),
  },
];

/**
 * @param {{titulo: string}} Props
 */
// eslint-disable-next-line react/prop-types
const TituloModal = ({ titulo }) => (
  <div style={{ margin: '1rem', fontWeight: 'bold' }}>
    <h2>Selección de {titulo} </h2>
  </div>
);

function ModalGenerico(props) {
  const [buscar, setBuscar] = useState('');
  const { nombre, abrirModal, retornarDatos, cerrarModal, datos } = props;
  const [datosTabla, setDatosTabla] = useState([]);
  const obtenerDatosTabla = (e) => {
    retornarDatos(e);
  };
  const filtarDatos = (e) => {
    const texto = String(e.target.value).toUpperCase();
    setBuscar(texto);
    const datosOrigen = [...datos];
    const datosFiltrados = datosOrigen.filter(
      (f) => String(f.nombre).toUpperCase().includes(texto) || String(f.codigo).toUpperCase().includes(texto)
    );
    setDatosTabla(datosFiltrados);
  };
  useEffect(() => {
    setDatosTabla(datos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos]);

  return (
    <Modal
      open={abrirModal}
      onClose={() => {
        cerrarModal();
        setBuscar('');
        setDatosTabla(datos);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={abrirModal}>
        <Box sx={estiloModal}>
          <TituloModal titulo={nombre} />
          <Box ml={2} mr={2}>
            <Grid container spacing={1} alignItems="center">
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  autoFocus
                  label="Buscar"
                  onChange={(e) => filtarDatos(e)}
                  value={buscar}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BotonIconBuscar />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={estiloTabla}>
            <div style={estilosContenedor}>
              <DataGrid
                density="compact"
                rowHeight={28}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                sx={estiloDatagrid}
                components={{
                  NoRowsOverlay: IconoDataGrid,
                }}
                columns={cabecera}
                rows={datosTabla}
                getRowId={(rows) => rows.codigo}
                onRowDoubleClick={(e) => obtenerDatosTabla(e)}
              />
            </div>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default memo(ModalGenerico);
