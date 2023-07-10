// import 'dayjs/locale/es';
import { Grid, Chip, Divider, Box, FormControlLabel, Checkbox, Button } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers';
import Transicion from '../../../../../components/app/Transicion';
import SelectorGenerico from '../../../../../components/app/SelectorGenerico';
import { BotonNuevo, BotonBuscar } from '../../../../../components/app/Botones';
import { estiloTabla, estiloDatagrid, estiloActivo, estiloInactivo } from '../../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../../components/app/IconoDatagrid';
import useInformeSoporte from '../hooks/useInformeSoporte';

function InformeSoporteComponent() {
  const {
    datos,
    soporte,
    informe,
    listaSoporte,
    soporteRef,
    cambiarEsSolucion,
    cambiarEsTodo,
    cambiarSoporte,
    buscar,
    nuevo,
  } = useInformeSoporte();

  const cabecera = [
    { field: 'nombre_soporte', headerName: 'Soporte', width: 300 },
    {
      field: 'fecha_registro',
      headerName: 'Fecha Registro',
      width: 150,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return String(params.value).slice(0, 10);
      },
    },
    {
      field: 'detalle',
      headerName: 'detalle',
      width: 600,
    },
    {
      field: 'estado',
      headerName: 'Solucionado',
      width: 120,
      renderCell: (e) => (
        <Button variant="text" sx={e.row.estado ? estiloActivo : estiloInactivo}>
          {' '}
          {e.row.estado ? 'Solucionado' : 'Pendiente'}{' '}
        </Button>
      ),
    },
  ];
  return (
    <Transicion>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Formulario" />
          </Divider>
        </Grid>
        {/* <Grid item md={2} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              label="Fecha Desde"
              value={datos.fechaDesde}
              onChange={(e) => {
                cambiarFechaDesde(e);
              }}
              renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
            />
          </LocalizationProvider>
        </Grid> */}
        {/* <Grid item md={2} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              label="Fecha Hasta"
              value={datos.fechaHasta}
              onChange={(e) => {
                cambiarFechaHasta(e);
              }}
              renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
            />
          </LocalizationProvider>
        </Grid> */}
        <Grid item md={4} xs={12}>
          <SelectorGenerico
            desactivarBusqueda={datos.esTodo}
            inputRef={soporteRef}
            estadoInicial={{
              nombre: soporte.nombre,
            }}
            tituloTexto="Soporte"
            tituloModal="Soporte"
            retornarDatos={(e) => cambiarSoporte(e)}
            datos={listaSoporte}
          />
        </Grid>
        <Grid item md={2.5} sm={6} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={datos.esTodo} onChange={(e) => cambiarEsTodo(e)} />}
            label="Ver todos los soportes"
          />
        </Grid>
        <Grid item md={2.5} sm={6} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={datos.esSolucion} onChange={(e) => cambiarEsSolucion(e)} />}
            label="Ver soportes solucionados"
          />
        </Grid>
        <Grid item md={1.5} xs={6}>
          <BotonBuscar
            propiedades={{
              onClick: () => buscar(),
            }}
          />
        </Grid>
        <Grid item md={1.5} xs={6}>
          <BotonNuevo
            propiedades={{
              onClick: () => nuevo(),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Informe" />
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Box sx={estiloTabla}>
            <div style={{ height: '40vh', width: '100%' }}>
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
                rows={informe}
                getRowId={(rows) => rows.id}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default InformeSoporteComponent;
