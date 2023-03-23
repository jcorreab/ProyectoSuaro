// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import Iconify from '../../../components/iconify';
import useLogin from './hooks/useLogin';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();
  const { formulario, usuarioRef, claveRef, cambiarUsuario, cambiarClave, login } = useLogin();

  // const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          inputRef={usuarioRef}
          name="email"
          label="Usuario"
          value={formulario.usuario}
          onChange={(e) => cambiarUsuario(e)}
        />

        <TextField
          inputRef={claveRef}
          name="password"
          label="Contraseña"
          type={'password'}
          value={formulario.clave}
          onChange={(e) => cambiarClave(e)}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          //         <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton sx={{ mt: 2 }} fullWidth size="large" variant="contained" onClick={() => login()}>
        Acceder
      </LoadingButton>
    </>
  );
}
