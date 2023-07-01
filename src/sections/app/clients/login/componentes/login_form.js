import { Grid, TextField, Button, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Transicion from '../../../../../components/app/Transicion';
import useLoginForm from '../hooks/useLoginForm';

function LoginFormComponent() {
  const { formulario, usuarioRef, claveRef, cambiarUsuario, cambiarClave, acceder } = useLoginForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={usuarioRef}
          label="Usuario"
          value={formulario.usuario}
          onChange={(e) => cambiarUsuario(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={claveRef}
          type="password"
          fullWidth
          label="Contraseña"
          value={formulario.clave}
          onChange={(e) => cambiarClave(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" size="large" onClick={() => acceder()}>
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

export default LoginFormComponent;
