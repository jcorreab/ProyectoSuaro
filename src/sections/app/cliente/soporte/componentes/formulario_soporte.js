import { Grid, TextField, Chip, Divider, Box, Button } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import es from 'date-fns/locale/es';
import Transicion from '../../../../../components/app/Transicion';
import SelectorGenerico from '../../../../../components/app/SelectorGenerico';
import { BotonGrabar, BotonNuevo, BotonBuscar } from '../../../../../components/app/Botones';
import { estiloTabla, estiloDatagrid } from '../../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../../components/app/IconoDatagrid';
import useSoporteForm from '../hooks/useSoporteForm';

function FormularioSoporteComponent() {
  const {
    // datos,
    soporte,
    listaSoporte,
    soporteRef,
    //  detalleRef,
    listaSoporteTabla,
    cambiarSoporte,
    // cambiarDetalle,
    agregarSoporte,
    eliminarSoporteTabla,
    nuevo,
    grabar,
  } = useSoporteForm();

  const cabecera = [
    { field: 'soporte', headerName: 'Nombre ', width: 300 },
    { field: 'detalle', headerName: 'Fecha', width: 600 },
    {
      field: 'eliminar',
      headerName: 'Reservar',
      width: 150,
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
              nombre: soporte.nombre,
            }}
            tituloTexto="Entrenador"
            tituloModal="Entrenador"
            retornarDatos={(e) => cambiarSoporte(e)}
            datos={listaSoporte}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
            <DesktopDatePicker
              label="Fecha Desde"
              inputFormat="dd/MM/yyyy"
              // readOnly

              value={new Date()}
              onChange={(e) => {
                // if (e === null) {
                //   messajeTool('warning', 'Ingrese la fecha de forma correcta, el sistema tomara la fecha actual ');
                // }
                // setMenu({
                //   ...menus,
                //   fdesde: isValidDate(e) ? e : new Date(),
                // });
                // setError(false);
              }}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
            />
          </LocalizationProvider>
          {/* <TextField
            fullWidth
            variant="filled"
            label="Detalle"
            inputRef={detalleRef}
            value={datos.detalle}
            onChange={(e) => cambiarDetalle(e)}
          /> */}
        </Grid>
        <Grid item md={2} xs={12}>
          <BotonBuscar
            propiedades={{
              onClick: () => agregarSoporte(),
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
                // onRowClick={(e) => obtenerRegistro(e)}
                columns={cabecera}
                rows={listaSoporteTabla}
                getRowId={(rows) => rows.codigo}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default FormularioSoporteComponent;
