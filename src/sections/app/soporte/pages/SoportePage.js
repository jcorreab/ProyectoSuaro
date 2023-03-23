import 'dayjs/locale/es';
import { Box, Grid, TextField, Typography, Divider, Chip } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CajaGenerica from '../../../../components/app/CajaGenerica';
import Transicion from '../../../../components/app/Transicion';
import { estiloTabla, estiloDatagrid } from '../../../../theme/app/Estilos';
import { IconoDataGrid } from '../../../../components/app/IconoDatagrid';
import { BotonGrabar, BotonNuevo } from '../../../../components/app/Botones';
import useSoporteForm from '../hooks/useSoporte';

function SoportePage() {
  const {
    listaUsuario,
    listaCliente,
    cliente,
    buscar,
    cambiarBusqueda,
    tecnico1,
    tecnico2,
    fechaRegistro,
    clienteRef,
    tecnico1Ref,
    tecnico2Ref,
    cambiarCliente,
    cambiarTecnico1,
    cambiarTecnico2,
    cambiarFechaRegistro,
    nuevo,
    grabar,
  } = useSoporteForm();
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
            inputRef={clienteRef}
            estadoInicial={{
              codigoAlternativo: cliente.identificacion,
              nombre: cliente.nombre,
            }}
            tituloTexto={{ nombre: 'Cliente', descripcion: 'Nombre' }}
            tituloModal="Clientes"
            retornarDatos={(e) => cambiarCliente(e)}
            datos={listaCliente}
          />
        </Grid>
        <Grid item container md={6} sm={12} xs={12}>
          <CajaGenerica
            inputRef={tecnico1Ref}
            estadoInicial={{
              codigoAlternativo: tecnico1.codigo_usuario,
              nombre: tecnico1.nombre,
            }}
            tituloTexto={{ nombre: 'Tecnico', descripcion: 'Nombre' }}
            tituloModal="Tecnicos"
            retornarDatos={(e) => cambiarTecnico1(e)}
            datos={listaUsuario}
          />
        </Grid>
        <Grid item container md={6} sm={12} xs={12}>
          <CajaGenerica
            inputRef={tecnico2Ref}
            estadoInicial={{
              codigoAlternativo: tecnico2.codigo_usuario,
              nombre: tecnico2.nombre,
            }}
            tituloTexto={{ nombre: 'Tecnico', descripcion: 'Nombre' }}
            tituloModal="Tecnicos"
            retornarDatos={(e) => cambiarTecnico2(e)}
            datos={listaUsuario}
          />
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              label="Fecha Registro"
              value={fechaRegistro}
              onChange={(e) => cambiarFechaRegistro(e)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" variant="filled" />}
            />
          </LocalizationProvider>
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
            <Chip label="Lista de Soportes" />
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
