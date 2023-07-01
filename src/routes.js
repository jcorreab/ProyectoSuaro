import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Citas from './sections/app/citas/Citas';
import TipoUsuarioPage from './sections/app/tipo-usuario/pages/TipoUsuarioPage';
import UsuarioPage from './sections/app/usuario/pages/usuarioPage';
import ClientePage from './sections/app/clientes/pages/ClientePage';
import ProductoPage from './sections/app/producto/pages/ProductoPage'
import TipoSoportePage from './sections/app/tipo-soporte/pages/TipoSoportePage';
import SoportePage from './sections/app/soporte/pages/SoportePage';
// RUTAS APP
import LoginPageCliente from './pages/app/cliente/login/login_page';
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
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'citas', element: <Citas /> },
        { path: 'tipousuario', element: <TipoUsuarioPage /> },
        { path: 'usuario', element: <UsuarioPage /> },
        { path: 'cliente', element: <ClientePage /> },
        { path: 'producto', element: <ProductoPage /> },
        { path: 'tiposoporte', element: <TipoSoportePage /> },
        { path: 'soporte', element: <SoportePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPageCliente />,
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
