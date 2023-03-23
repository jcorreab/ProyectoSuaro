import {
  Grid,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Chip,
  MenuItem,
} from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
// import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Transicion from '../../../../components/app/Transicion';
import { estiloTabla, estiloDatagrid, estiloActivo, estiloInactivo } from '../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../components/app/IconoDatagrid';
import { BotonGrabar, BotonNuevo } from '../../../../components/app/Botones';
import useUsuarioForm from '../hooks/useUsuarioForm';

function UsuarioPage() {
  const {
    listaUsuario,
    listaTipoUsuario,
    formulario,
    buscar,
    nombresRef,
    codigoUsuarioRef,
    apellidosRef,
    identifacacionRef,
    celularRef,
    correoRef,
    claveRef,
    cambiarCodigoUsuario,
    cambiarNombres,
    cambiarApellidos,
    cambiarTipoUsuario,
    cambiarIdentificacion,
    cambiarCelular,
    cambiarCorreo,
    cambiarObservacion,
    cambiarFechaIngreso,
    cambiarClave,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    obtenerRegistro,
    grabar,
  } = useUsuarioForm();
  const cabecera = [
    { field: 'codigo_usuario', headerName: 'Codigo', width: 130 },
    { field: 'nombres', headerName: 'Nombres', width: 200 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'identificacion', headerName: 'Identificacion', width: 150 },
    { field: 'celular', headerName: 'Celular', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 200 },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 130,
      renderCell: (param) =>
        param.row.estado ? (
          <Button variant="containded" style={estiloActivo}>
            Habilitado
          </Button>
        ) : (
          <Button variant="containded" style={estiloInactivo}>
            Deshabilitado
          </Button>
        ),
    },
  ];
  return (
    <Transicion>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Usuario</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Formulario" />
          </Divider>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <TextField
            inputRef={codigoUsuarioRef}
            fullWidth
            size="small"
            label="Codigo"
            variant="filled"
            value={formulario.codigo_usuario}
            onChange={(e) => cambiarCodigoUsuario(e)}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 3);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3.5}>
          <TextField
            inputRef={nombresRef}
            fullWidth
            size="small"
            label="Nombres"
            variant="filled"
            value={formulario.nombres}
            onChange={(e) => cambiarNombres(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3.5}>
          <TextField
            inputRef={apellidosRef}
            fullWidth
            size="small"
            label="Apellidos"
            variant="filled"
            value={formulario.apellidos}
            onChange={(e) => cambiarApellidos(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            label="Tipo Usuario"
            variant="filled"
            value={formulario.tipo_usuario}
            onChange={(e) => cambiarTipoUsuario(e)}
          >
            {listaTipoUsuario.map((m) => (
              <MenuItem key={m.codigo} value={m.codigo}>
                {m.descripcion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            inputRef={identifacacionRef}
            fullWidth
            size="small"
            label="Identificación"
            variant="filled"
            onInput={(e) => {
              const ultimoDigito = e.target.value.at(-1);
              e.target.value =
                // eslint-disable-next-line no-restricted-globals
                !isNaN(ultimoDigito)
                  ? (e.target.value = e.target.value.slice(0, 10))
                  : e.target.value.replace(ultimoDigito, '');
            }}
            value={formulario.identificacion}
            onChange={(e) => cambiarIdentificacion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            inputRef={celularRef}
            fullWidth
            size="small"
            label="Celular"
            variant="filled"
            onInput={(e) => {
              const ultimoDigito = e.target.value.at(-1);
              e.target.value =
                // eslint-disable-next-line no-restricted-globals
                !isNaN(ultimoDigito)
                  ? (e.target.value = e.target.value.slice(0, 10))
                  : e.target.value.replace(ultimoDigito, '');
            }}
            value={formulario.celular}
            onChange={(e) => cambiarCelular(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            type="email"
            inputRef={correoRef}
            fullWidth
            size="small"
            label="Correo"
            variant="filled"
            value={formulario.correo}
            onChange={(e) => cambiarCorreo(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            type="password"
            inputRef={claveRef}
            fullWidth
            size="small"
            label="Clave"
            variant="filled"
            value={formulario.clave}
            onChange={(e) => cambiarClave(e)}
          />
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              label="Fecha Ingreso"
              value={formulario.fecha_ingreso}
              onChange={(e) => cambiarFechaIngreso(e)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" variant="filled" />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Observacion"
            variant="filled"
            value={formulario.observacion}
            onChange={(e) => cambiarObservacion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={1}>
          <FormControlLabel
            control={<Checkbox checked={formulario.estado} onChange={(e) => cambiarEstado(e)} />}
            label="Estado"
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <BotonGrabar
            propiedades={{
              onClick: () => grabar(),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <BotonNuevo
            propiedades={{
              onClick: () => nuevo(),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Registros" />
          </Divider>
        </Grid>
        <Grid item xs={12} sm={7} md={5}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            variant="filled"
            value={buscar}
            onChange={(e) => cambiarBusqueda(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={estiloTabla}>
            <div style={{ height: '32vh', width: '100%' }}>
              <DataGrid
                density="compact"
                rowHeight={28}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                sx={estiloDatagrid}
                components={{
                  NoRowsOverlay: IconoDataGrid,
                }}
                onRowClick={(e) => obtenerRegistro(e)}
                columns={cabecera}
                rows={listaUsuario}
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default UsuarioPage;
