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
    <Grid container spacing={1}>
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
    </Grid>
  );
}

export default SoportePage;
