import { Grid, Typography, Alert } from '@mui/material';
import Transicion from '../../../../../components/app/Transicion';
import LogoEmpresa from '../../../../../assets/logo_mercredi.png';
import LoginFormComponent from './login_form';
import useResponsive from '../../../../../hooks/useResponsive';

function LoginComponent() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Transicion>
      <Grid
        container
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        spacing={3}
      >
        {mdUp && (
          <Grid item container justifyContent="center" spacing={2} xs={7.5}>
            <Grid item xs={12}>
              <img src={LogoEmpresa} style={{ width: '500px' }} alt="" />
            </Grid>
            <Grid item xs={12}>
              <img src="https://www.mercredi.ec/assets/images/hero-right-img.png" style={{ width: '60%' }} alt="" />
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          justifyContent="center"
          textAlign="initial"
          sx={{
            height: mdUp || '90vh',
            mt:3
          }}
          spacing={1}
          md={4.5}
          xs={12}
        >
          <Grid item xs={12}>
            <Typography variant="h3">INICIO DE SESION</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Ingrese sus credenciales acontinuacion</Typography>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              Sumérgete en nuestro sistema de <strong> soporte en línea: </strong> tu compañero confiable en el mundo
              digital. Nuestro equipo de expertos está aquí para asistirte con soluciones personalizadas y un servicio
              atento.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <LoginFormComponent />
          </Grid>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default LoginComponent;
