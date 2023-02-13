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
import CajaGenerica from './components/CajaGenerica';
import useCitas from './hooks/useCitas';
import { estiloTabla, estiloDatagrid } from './styles/Estilos';
import { IconoDataGrid } from './components/IconoDatagrid';
import { BotonAgregar, BotonGrabar, BotonNuevo } from './components/Botones';
import CuadroDialogo from './components/CuadroDialogo';

function Citas() {
  const {
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
    cambiarEdadInvitado,
    cambiarNombreInvitado,
    agregarInvitados,
    quitarInvitado,
    cerrarDialogo,
    guardar,
    guardarCambios,
    nuevo,
  } = useCitas();
  const cabecera = [
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
      field: 'eliminar',
      headerName: 'Eliminar',
      width: 100,
      renderCell: (param) => (
        <Button
          variant="text"
          startIcon={<RemoveCircleRoundedIcon />}
          onClick={() => quitarInvitado(param.row.codigo)}
        />
      ),
    },
  ];
  return (
    <>
      <CuadroDialogo
        abrirModal={abrirDialogo}
        cerrarModal={() => cerrarDialogo()}
        ejecutarFuncion={() => guardarCambios()}
        datos={{
          estudiante: estudiante.nombre,
          correo: estudiante.correo,
          invitados,
        }}
      />
      <Box ml={2} mr={2}>
        <Grid item container md={7} sm={12} xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Reservar Cita</Typography>
          </Grid>
          <Grid item container md={8} xs={12}>
            <CajaGenerica
              inputRef={estudianteRef}
              estadoInicial={{
                codigoAlternativo: estudiante.codigo,
                nombre: estudiante.nombre,
              }}
              tituloTexto={{ nombre: 'Estudiante', descripcion: 'Nombre' }}
              tituloModal="Estudiantes"
              retornarDatos={(e) => {
                cambiarEstudiante(e);
              }}
              datos={estudiantes}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateTimePicker
                label="Fecha"
                value={fecha}
                onChange={(e) => {
                  cambiarFecha(e);
                }}
                renderInput={(params) => <TextField {...params} fullWidth size="small" inputRef={fechaRef} required />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Chip icon={<AlternateEmailRoundedIcon />} label={`Correo: ${estudiante.correo}`} />
          </Grid>
          <Grid item xs={12}>
            <Chip
              icon={<TagFacesRoundedIcon />}
              label="Solo Aplica para estudiantes que esten cursando el ultimo semestre y que cumpla la mayoria de edad"
            />
          </Grid>
          <Grid item xs={12}>
            <Chip
              icon={<TagFacesRoundedIcon />}
              label="Las citas se realizan de Lunes a Jueves de 9:00 a 15:00 y los viernes de 10:00 a 14:00"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Chip label="Invitados" />
            </Divider>
          </Grid>
          <Grid item md={8} sm={8} xs={12}>
            <TextField
              inputRef={invitadoNombreRef}
              required
              fullWidth
              size="small"
              label="Nombre Completo"
              value={invitado.nombreCompleto}
              onChange={(e) => cambiarNombreInvitado(e)}
            />
          </Grid>
          <Grid item md={2} sm={2} xs={12}>
            <NumericFormat
              inputRef={invitadoEdadRef}
              required
              fullWidth
              customInput={TextField}
              label="Edad"
              size="small"
              decimalScale={0}
              value={invitado.edad}
              onValueChange={(e) => cambiarEdadInvitado(e)}
              suffix={'Años'}
            />
          </Grid>
          <Grid item md={2} sm={2} xs={12}>
            <BotonAgregar
              propiedades={{
                onClick: () => {
                  agregarInvitados();
                },
              }}
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
                  columns={cabecera}
                  rows={invitados}
                  getRowId={(rows) => rows.codigo}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Chip
              icon={<TagFacesRoundedIcon />}
              label="Puedes invitar hasta 3 personas que cumplan la mayoria de edad"
            />
          </Grid>
          <Grid item md={2} sm={2} xs={12}>
            <BotonGrabar
              propiedades={{
                onClick: () => {
                  guardar();
                },
              }}
            />
          </Grid>
          <Grid item md={2} sm={2} xs={12}>
            <BotonNuevo
              propiedades={{
                onClick: () => {
                  nuevo();
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Citas;
