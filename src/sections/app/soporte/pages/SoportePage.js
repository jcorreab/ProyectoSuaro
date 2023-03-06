import 'dayjs/locale/es';
import { Box, Grid, Button, TextField, Typography, Divider, Chip } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { NumericFormat } from 'react-number-format';
import CajaGenerica from '../../../../components/app/CajaGenerica';
import Transicion from '../../../../components/app/Transicion';
import { estiloTabla, estiloDatagrid, estiloActivo, estiloInactivo } from '../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../components/app/IconoDatagrid';
import { BotonGrabar, BotonNuevo } from '../../../../components/app/Botones';

function SoportePage() {
  return (
    <Transicion>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Soporte</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Formulario" />
          </Divider>
        </Grid>
        <Grid item container md={6} sm={12} xs={12}>
          <CajaGenerica
            //   inputRef={estudianteRef}
            estadoInicial={{
              codigoAlternativo: 'estudiante.codigo',
              nombre: 'estudiante.nombre',
            }}
            tituloTexto={{ nombre: 'Cliente', descripcion: 'Nombre' }}
            tituloModal="Estudiantes"
            retornarDatos={(e) => {
              // cambiarEstudiante(e);
            }}
            datos={[]}
          />
        </Grid>
        <Grid item container md={6} sm={12} xs={12}>
          <CajaGenerica
            //   inputRef={estudianteRef}
            estadoInicial={{
              codigoAlternativo: 'estudiante.codigo',
              nombre: 'estudiante.nombre',
            }}
            tituloTexto={{ nombre: 'Tecnico', descripcion: 'Nombre' }}
            tituloModal="Estudiantes"
            retornarDatos={(e) => {
              // cambiarEstudiante(e);
            }}
            datos={[]}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <BotonGrabar
            propiedades={{
              onClick: () => {},
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <BotonNuevo
            propiedades={{
              onClick: () => {},
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Lista de Soportes" />
          </Divider>
        </Grid>
        <Grid item xs={12} sm={7} md={5}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            variant="filled"
            // value={buscar}
            // onChange={(e) => cambiarBusqueda(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={estiloTabla}>
            <div style={{ height: '30vh', width: '100%' }}>
              <DataGrid
                density="compact"
                rowHeight={28}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                sx={estiloDatagrid}
                components={{
                  NoRowsOverlay: IconoDataGrid,
                }}
                // onRowClick={(e) => obtenerRegistro(e)}
                columns={[]}
                rows={[]}
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default SoportePage;
