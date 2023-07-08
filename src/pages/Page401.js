import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// @mui
import { Box, Button, Typography, Container, Zoom } from '@mui/material';
// components
import Page from '../components/app/Page';
import ImagenSesionExpira from '../assets/img/img_401.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page401() {
  return (
    <Page title="401 Sesion Expirada" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Su Sesion Expiró
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Vuelva al inicio , inicie sesion nuevamente.</Typography>

            <Zoom in style={{ transitionDelay: '500ms' }}>
              <img alt="sesionexpira" src={ImagenSesionExpira} />
            </Zoom>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Inicio
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
