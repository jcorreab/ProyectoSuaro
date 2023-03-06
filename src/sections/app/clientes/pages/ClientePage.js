import { Grid, TextField, Button, Box, FormControlLabel, Checkbox, Typography, Divider, Chip } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
// import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
// import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Transicion from '../../../../components/app/Transicion';
import { estiloTabla, estiloDatagrid, estiloActivo, estiloInactivo } from '../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../components/app/IconoDatagrid';
import { BotonGrabar, BotonNuevo } from '../../../../components/app/Botones';
import useClienteForm from '../hooks/useClienteForm';
// import useTipoUsuarioForm from '../hooks/useTipoUsuarioForm';

function ClientePage() {
  const {
    listaCliente,
    formulario,
    buscar,
    razonSocialRef,
    // telefonoRef,
    // direccionRef,
    identifacacionRef,
    celularRef,
    correoRef,
    coordenadasRef,
    cambiarRazonSocial,
    cambiarTelefono,
    cambiarDireccion,
    cambiarCoordenadas,
    cambiarIdentificacion,
    cambiarCelular,
    cambiarCorreo,
    // cambiarFechaIngreso,
    cambiarEstado,
    cambiarBusqueda,
    nuevo,
    obtenerRegistro,
    grabar,
  } = useClienteForm();
  const cabecera = [
    // { field: 'codigo', headerName: 'Codigo', width: 130 },
    { field: 'razon_social', headerName: 'Razon Social', width: 300 },
    { field: 'identificacion', headerName: 'Identificacion', width: 150 },
    { field: 'celular', headerName: 'Celular', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 200 },
    { field: 'coordenadas', headerName: 'Coordenadas', width: 150 },
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
          <Typography variant="h4">Cliente</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Formulario" />
          </Divider>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <TextField
            inputRef={razonSocialRef}
            fullWidth
            size="small"
            label="Razon social"
            variant="filled"
            value={formulario.razon_social}
            onChange={(e) => cambiarRazonSocial(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
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
        <Grid item xs={12} sm={5} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Telefono"
            variant="filled"
            value={formulario.telefono}
            onChange={(e) => cambiarTelefono(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
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
        <Grid item xs={12} sm={5} md={2}>
          <TextField
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
            fullWidth
            size="small"
            label="Direccion"
            variant="filled"
            value={formulario.direccion}
            onChange={(e) => cambiarDireccion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            inputRef={coordenadasRef}
            fullWidth
            size="small"
            label="Coordenadas"
            variant="filled"
            value={formulario.coordenadas}
            onChange={(e) => cambiarCoordenadas(e)}
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
            <div style={{ height: '30vh', width: '100%' }}>
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
                rows={listaCliente}
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default ClientePage;
