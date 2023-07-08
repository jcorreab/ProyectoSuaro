import { Grid, TextField, Button, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function RegistroFormComponent() {
  // const { formulario, usuarioRef, claveRef, cambiarUsuario, cambiarClave, acceder } = useLoginForm();

  return (
    <Grid container spacing={1}>
      <Grid item md={3} sm={6} xs={12}>
        <TextField
          fullWidth
          // inputRef={usuarioRef}
          label="Nombre de Usuario"
          // value={formulario.usuario}
          // onChange={(e) => cambiarUsuario(e)}
        />
      </Grid>
      <Grid item md={9} sm={6} xs={12}>
        <TextField
          fullWidth
          // inputRef={usuarioRef}
          label="Nombre"
          // value={formulario.usuario}
          // onChange={(e) => cambiarUsuario(e)}
        />
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <TextField
          fullWidth
          type="email"
          // inputRef={usuarioRef}
          label="Correo"
          // value={formulario.usuario}
          // onChange={(e) => cambiarUsuario(e)}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <TextField
          fullWidth
          type="password"
          // inputRef={usuarioRef}
          label="Contraseña"
          // value={formulario.usuario}
          // onChange={(e) => cambiarUsuario(e)}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <TextField
          fullWidth
          type="password"
          // inputRef={usuarioRef}
          label="Confirma Contraseña"
          // value={formulario.usuario}
          // onChange={(e) => cambiarUsuario(e)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <NumericFormat
          customInput={TextField}
          fullWidth
          decimalScale={0}
          allowNegative={false}
          label="Cedula"
          allowLeadingZeros
          // value={datos.numeroGaveta}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <NumericFormat
          customInput={TextField}
          fullWidth
          decimalScale={0}
          allowNegative={false}
          label="Celular"
          allowLeadingZeros
          // value={datos.numeroGaveta}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <NumericFormat
          customInput={TextField}
          fullWidth
          decimalScale={0}
          allowNegative={false}
          label="Telèfono"
          allowLeadingZeros
          // value={datos.numeroGaveta}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          // inputRef={claveRef}
          fullWidth
          label="Direccion"
          // value={formulario.clave}
          // onChange={(e) => cambiarClave(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" size="large" onClick={() => {}}>
          Acceder
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth size="large">
          Olvidates tu Contraseña
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth size="large">
          No tienes Cuenta , ¡Registrate Ahora!
        </Button>
      </Grid>
    </Grid>
  );
}

export default RegistroFormComponent;
