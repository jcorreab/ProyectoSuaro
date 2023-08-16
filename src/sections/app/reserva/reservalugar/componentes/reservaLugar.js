// import 'dayjs/locale/es';
import { Grid, Chip, Divider, Box, TextField } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Transicion from '../../../../../components/app/Transicion';
import SelectorGenerico from '../../../../../components/app/SelectorGenerico';
import { BotonNuevo, BotonBuscar } from '../../../../../components/app/Botones';
import { estiloTabla, estiloDatagrid} from '../../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../../components/app/IconoDatagrid';
import useReporteLugar from '../hooks/useReporteLugarComponent';


function ReporteLugarComponent() {
  const {
    datos,
    lugar,
    informe,
    soporteRef,
    generarHorarioDiarioPorLugar,
    cambiarFecha,
    cambiarLugar,
    nuevo,
    listaLugares,
  } = useReporteLugar();

  const cabecera = [
    { field: 'codigo', headerName: 'Codigo ', width: 400, hide: true },
    { field: 'nombre', headerName: 'Lugar ', width: 400 },
    { field: 'fecha', headerName: 'Fecha', width: 200 },
    { field: 'horadesde', headerName: 'Hora Desde', width: 200 },
    { field: 'horahasta', headerName: 'Hora Hasta', width: 200 },
  ];
  return (
    <Transicion>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Reserva Lugar" />
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
            //    desactivarBusqueda={datos.esTodo}
            inputRef={soporteRef}
            estadoInicial={{
              nombre: lugar.nombres,
            }}
            tituloTexto="Lugar"
            tituloModal="Lugar"
            retornarDatos={((e) => cambiarLugar(e))}
            datos={listaLugares}
          />
        </Grid>
        <Grid item md={2} xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              label="Fecha "
              value={datos.fecha}
              onChange={(e) => {
                cambiarFecha(e);
              }}
              renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        {/* <Grid item md={2.5} sm={6} xs={12}>
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
        </Grid> */}
        <Grid item md={1.5} xs={6}>
          <BotonBuscar
            propiedades={{
              onClick: () => generarHorarioDiarioPorLugar(),
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
        {/* <Grid item xs={12}>
          <Divider>
            <Chip label="Informe" />
          </Divider>
        </Grid> */}
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
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default ReporteLugarComponent;
