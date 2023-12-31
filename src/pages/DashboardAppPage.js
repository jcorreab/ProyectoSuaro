import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import useMensaje from '../hooks/app/useMensaje';
// components
// import Iconify from '../components/iconify';
// sections

import {
  // // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { obtenerClienteLog } from '../utils/app/func/fun_storage';
import * as services from '../servicios/servicios_soporte';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const clienteLog = obtenerClienteLog();
  const { mensajeSistema } = useMensaje();
  const [datos, setDatos] = useState({
    peso: 0.0,
    altura: 0.0,
    imc: 0.0,
    pesooptimo: 0.0,
  });

  const buscarDatosPersona = () => {
    services.obtenerUsuarios({ codigo: clienteLog.codigo }).then((r) => {
      setDatos({
        peso: parseFloat(r.peso),
        altura: parseFloat(r.altura),
        imc: parseFloat(r.peso) / (((parseFloat(r.altura) / 100) * parseFloat(r.altura)) / 100),
        pesooptimo: parseFloat(r.peso),
      });
      if (r.peso >= 90) {
        mensajeSistema({
          texto: 'Se recomienda entrenamiento de peso',
          variante: 'success',
        });
      } else {
        mensajeSistema({
          texto: 'Se recomienda un entrenamiento de cardio',
          variante: 'success',
        });
      }
    });
  };

  const [datosDiarios, setDatosDiarios] = useState({
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
    domingo: 0,
  });

  const obtenerDatosSemanales = () => {
    services.datosTiempoUsuario().then((r) => {
      const filtrarPersona = r.filter((f) => f.persona === clienteLog.codigo);
      const hoy = new Date();
      const diaActual = hoy.getDate();
      const primerDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), diaActual - hoy.getDay(), 0, 0, 0);
      const ultimoDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), diaActual + (6 - hoy.getDay()), 23, 59, 59);

      const arregloF = filtrarPersona.filter((objeto) => {
        const fechaObjeto = new Date(objeto.created);
        return fechaObjeto >= primerDiaSemana && fechaObjeto <= ultimoDiaSemana;
      });
      const datosPrueba = {
        lunes: 0,
        martes: 0,
        miercoles: 0,
        jueves: 0,
        viernes: 0,
        sabado: 0,
        domingo: 0,
      };
      arregloF.forEach((objeto) => {
        const fechaIngreso = new Date(objeto.fecha_ingreso);
        const diaSemana = fechaIngreso.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
        const diaSemanaTexto = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][diaSemana];

        datosPrueba[diaSemanaTexto] += 1;
      });
   //   console.log(datosPrueba);
      setDatosDiarios(datosPrueba);
    });
  };

  useEffect(() => {
    buscarDatosPersona();
    obtenerDatosSemanales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | GymMaster </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, Bienvenido
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Peso Actual" total={datos.peso} icon={'mdi:weight-kilogram'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Altura" total={datos.altura} color="info" icon={'pixelarticons:human-height'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="IMC" total={datos.imc} color="warning" icon={'game-icons:frozen-body'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Peso Optimo" total={datos.pesooptimo} color="error" icon={'mdi:weight-kilogram'} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Asistencia Semanal"
              //   subheader="(+43%) than last year"

              chartData={[
                { label: 'Lunes', value: datosDiarios.lunes },
                { label: 'Martes', value: datosDiarios.martes },
                { label: 'Miercoles', value: datosDiarios.miercoles },
                { label: 'Jueves', value: datosDiarios.jueves },
                { label: 'Viernes', value: datosDiarios.viernes },
                { label: 'Sabado', value: datosDiarios.sabado },
                { label: 'Domingo', value: datosDiarios.domingo },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
