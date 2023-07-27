import { Grid, Typography, Alert } from '@mui/material';
import Transicion from '../../../../../components/app/Transicion';
import LogoEmpresa from '../../../../../assets/LogoGym.png';
import LoginFormComponent from './login_form';
import useResponsive from '../../../../../hooks/useResponsive';

function LoginComponent() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Transicion>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {mdUp && (
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                <img src={LogoEmpresa} style={{ width: '100%' }} alt="Logo del Gimnasio" />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          xs={12}
          md={6}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center">Bienvenido al sistema de gimnasio</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              Ingrese sus credenciales a continuación para acceder a su cuenta.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              En nuestro sistema de gimnasio, puede administrar los datos de los miembros, programar clases,
              realizar seguimiento de progresos y más. ¡Disfrute de una experiencia de gestión eficiente y efectiva!
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


// import { Grid, Typography, Alert } from '@mui/material';
// import Transicion from '../../../../../components/app/Transicion';
// import LogoEmpresa from '../../../../../assets/img/gym.png';
// import LoginFormComponent from './login_form';
// import useResponsive from '../../../../../hooks/useResponsive';

// function LoginComponent() {
//   const mdUp = useResponsive('up', 'md');
//   return (
//     <Transicion>
//       <Grid
//         container
//         justifyContent="space-between"
//         alignContent="center"
//         alignItems="center"
//         textAlign="center"
//         spacing={3}
//       >
//         {mdUp && (
//           <Grid item container justifyContent="center" spacing={2} xs={7.5}>
//             <Grid item xs={12}>
//               {/* <img src={LogoEmpresa} style={{ width: '20px' }} alt="" /> */}
//             </Grid>
//             <Grid item xs={12}>
//               <img src={LogoEmpresa} style={{ width: '50%' }} alt="" />
//             </Grid>
//           </Grid>
//         )}

//         <Grid
//           item
//           container
//           justifyContent="center"
//           textAlign="initial"
//           sx={{
//             height: mdUp || '90vh',
//             mt:3
//           }}
//           spacing={1}
//           md={4.5}
//           xs={12}
//         >
//           <Grid item xs={12}>
//             <Typography variant="h3">INICIO DE SESION</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Ingrese sus credenciales acontinuacion</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 2 }}>
//               Sumérgete en nuestro sistema de <strong> soporte en línea: </strong> tu compañero confiable en el mundo
//               digital. Nuestro equipo de expertos está aquí para asistirte con soluciones personalizadas y un servicio
//               atento.
//             </Alert>
//           </Grid>
//           <Grid item xs={12}>
//             <LoginFormComponent />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Transicion>
//   );
// }

export default LoginComponent;
