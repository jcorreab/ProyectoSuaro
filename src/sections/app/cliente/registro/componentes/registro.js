import { Grid, Typography, Alert } from '@mui/material';
import Transicion from '../../../../../components/app/Transicion';
import LogoEmpresa from '../../../../../assets/logo_mercredi.png';
import useResponsive from '../../../../../hooks/useResponsive';
import RegistroFormComponent from './registro_form';

function RegistroComponent() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Transicion>
      <Grid
        container
        justifyContent="space-between"
        spacing={3}
      >
        {mdUp && (
          <Grid item container justifyContent="center" spacing={2} xs={6}>
            <Grid item xs={12}>
              <img src={LogoEmpresa} style={{ width: '500px' }} alt="" />
            </Grid>
            <Grid item xs={12}>
              <img src="https://www.mercredi.ec/assets/images/hero-right-img.png" style={{ width: '80%' }} alt="" />
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          textAlign="initial"
          sx={{
            height: mdUp || '90vh',
          }}
          spacing={1}
          md={6}
          xs={12}
        >
          <Grid item xs={12}>
            <Typography variant="h3">¡REGISTRATE AHORA!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Ingrese sus datos acontinuacion</Typography>
          </Grid>
          <Grid item xs={12}>
            <RegistroFormComponent />
          </Grid>
        </Grid>
      </Grid>
    </Transicion>
  );
}

export default RegistroComponent;
