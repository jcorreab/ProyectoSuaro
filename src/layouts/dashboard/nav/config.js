// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'Citas',
  //   path: '/dashboard/citas',
  //   icon: icon('file-copy'),
  // },
  {
    title: 'Tipos Usuarios',
    path: '/dashboard/tipousuario',
    icon: icon('ic_tipo_usuario'),
  },
  {
    title: 'Usuarios',
    path: '/dashboard/usuario',
    icon: icon('ic_usuario'),
  },
  {
    title: 'Clientes',
    path: '/dashboard/cliente',
    icon: icon('ic_cliente'),
  },
  {
    title: 'Productos',
    path: '/dashboard/producto',
    icon: icon('ic_item'),
  },
  {
    title: 'Tipos Soportes',
    path: '/dashboard/tiposoporte',
    icon: icon('ic_tipo_soporte'),
  },
  {
    title: 'Soporte',
    path: '/dashboard/soporte',
    icon: icon('ic_soporte'),
  },
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
