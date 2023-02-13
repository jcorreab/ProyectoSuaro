import { Grid, TextField, Button, Box, FormControlLabel, Checkbox, Typography, Divider, Chip } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
// import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
// import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Transicion from '../../../../components/app/Transicion';
import { estiloTabla, estiloDatagrid, estiloActivo, estiloInactivo } from '../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../components/app/IconoDatagrid';
import { BotonGrabar, BotonNuevo } from '../../../../components/app/Botones';
// import useTipoUsuarioForm from '../hooks/useTipoUsuarioForm';

function UsuarioPage() {
//   const {
//     formulario,
//     descripcionRef,
//     listaTipoUsuario,
//     buscar,
//     obtenerRegistro,
//     cambiarDescripcion,
//     cambiarEstado,
//     cambiarBusqueda,
//     nuevo,
//     grabar,
//   } = useTipoUsuarioForm();
  const cabecera = [
    // { field: 'codigo', headerName: 'Codigo', width: 130 },
    { field: 'descripcion', headerName: 'Descripcion', width: 300 },
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

    // {
    //   field: 'editar',
    //   headerName: 'Editar',
    //   width: 100,
    //   renderCell: (param) => (
    //     <Button
    //       variant="text"
    //       startIcon={<ModeEditOutlineRoundedIcon />}
    //       onClick={() => obtenerRegistro(param.row.codigo)}
    //     />
    //   ),
    // },
    // {
    //   field: 'eliminar',
    //   headerName: 'Eliminar',
    //   width: 100,
    //   renderCell: (param) => (
    //     <Button
    //       variant="text"
    //       startIcon={<RemoveCircleRoundedIcon />}
    //       // onClick={() => quitarInvitado(param.row.codigo)}
    //     />
    //   ),
    // },
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
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Nombres"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Apellidos"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Codigo Usuario"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Tipo Usuario"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Identificación"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Celular"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Correo"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Clave"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={6}>
          <TextField
            // inputRef={descripcionRef}
            fullWidth
            size="small"
            label="Observacion"
            variant="filled"
            // value={formulario.descripcion}
            // onChange={(e) => cambiarDescripcion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={1}>
          <FormControlLabel
            control={<Checkbox checked  />}
            label="Estado"
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
            <Chip label="Registros" />
          </Divider>
        </Grid>
        <Grid item xs={12} sm={7} md={5}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            variant="filled"
            
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
                columns={cabecera}
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

export default UsuarioPage;
