import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
// RUTAS APP
import LoginPageCliente from './pages/app/cliente/login/login_page';
import RegistroPageCliente from './pages/app/cliente/registro/registro_page';
import SoportePage from './pages/app/cliente/soporte/soporte_page';
import InformeSoportePage from './pages/app/cliente/informe/informe_soporte_page';
import DashboardInicioPage from './pages/app/cliente/inicio/dashboard_inicio_page';
import LoginPageUsuario from './pages/app/usuario/login/login_page';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/soporte" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'soporte', element: <SoportePage /> },
        { path: 'informesoporte', element: <InformeSoportePage /> },
        { path: 'inicio', element: <DashboardInicioPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPageCliente />,
    },
    {
      path: 'loginusuario',
      element: <LoginPageUsuario />,
    },
    {
      path: 'registro',
      element: <RegistroPageCliente />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
