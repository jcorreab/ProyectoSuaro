import 'dayjs/locale/es';
import { Grid, TextField, Chip, Divider, Box, Button } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Transicion from '../../../../../components/app/Transicion';
import SelectorGenerico from '../../../../../components/app/SelectorGenerico';
import { BotonGrabar, BotonNuevo, BotonBuscar } from '../../../../../components/app/Botones';
import { estiloTabla, estiloDatagrid } from '../../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../../components/app/IconoDatagrid';
import useReservaEntrenador from '../hooks/useReservaEntrenador';


function FormularioReservaEntrenadorComponent() {
  const {
    datos,
    listaEntrenadores,
    soporteRef,
    buscarHorarios,
    listaTablaEntrenamientos,
    eliminarSoporteTabla,
    nuevo,
    grabar,
    entrenador,
    cambiarEntrenador,
    cambiarFecha,
    setSeleccionarReserva,
  } = useReservaEntrenador();

  const cabecera = [
    { field: 'codigo', headerName: 'Codigo ', width: 400, hide: true },
    { field: 'nombre', headerName: 'Nombre ', width: 400 },
    { field: 'fecha', headerName: 'Fecha', width: 200 },
    { field: 'horadesde', headerName: 'Hora Desde', width: 200 },
    { field: 'horahasta', headerName: 'Hora Hasta', width: 200 },

    {
      field: 'eliminar',
      headerName: 'Reservar',
      width: 150,
      hide: true,
      renderCell: (e) => (
        <Button variant="text" startIcon={<RemoveCircleRoundedIcon />} onClick={() => eliminarSoporteTabla(e)} />
      ),
    },
  ];
  return (
    <Transicion>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Reservar Entrenador" />
          </Divider>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end" container spacing={1}>
          <Grid item md={2} xs={6}>
            <BotonNuevo
              propiedades={{
                onClick: () => nuevo(),
              }}
            />
          </Grid>
          <Grid item md={2} xs={6}>
            <BotonGrabar
              propiedades={{
                onClick: () => grabar(),
              }}
            />
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <SelectorGenerico
            inputRef={soporteRef}
            estadoInicial={{
              //   codigoalternativo: entrenador.codigoalternativo,
              nombre: entrenador.nombre,
            }}
            tituloTexto="Entrenador"
            tituloModal="Entrenador"
            retornarDatos={(e) => cambiarEntrenador(e)}
            datos={listaEntrenadores}
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
        <Grid item md={1} xs={12}>
          <BotonBuscar
            propiedades={{
              onClick: () => buscarHorarios(),
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
                onSelectionModelChange={(newSelectionModel) => {
                  setSeleccionarReserva(newSelectionModel);
                }}
                checkboxSelection
                // onRowClick={(e) => obtenerRegistro(e)}
                columns={cabecera}
                rows={listaTablaEntrenamientos}
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default FormularioReservaEntrenadorComponent;
