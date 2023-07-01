import useMensaje from './useMensaje';

function useError() {
  const { mensajeSistema } = useMensaje();

  /**
   *
   * @param {{ error: string, mensaje: string }}
   */
  const errorHttp = ({ error, mensaje }) => {
    try {
      const errorSistema = error;
      switch (errorSistema) {
        case 400:
          mensajeSistema({
            texto: mensaje,
            variante: 'error',
          });
          break;
        case 401:
          mensajeSistema({
            texto: ' La sesion expiro. Inicie sesion nuevamente',
            variante: 'error',
          });
          break;
        case 404:
          mensajeSistema({
            texto: 'La ruta de la api no se encuentra disponible. Error 404',
            variante: 'error',
          });
          break;
        case 405:
          mensajeSistema({
            texto: 'El metodo http es incorrecto. Error 405',
            variante: 'error',
          });
          break;
        case 500:
          mensajeSistema({
            texto: mensaje,
            variante: 'error',
          });
          break;
        default:
          mensajeSistema({
            texto: 'Problemas de Conexion con el servidor o Error de la aplicacion. Contacte con soporte',
            variante: 'error',
          });
          break;
      }
    } catch {
      mensajeSistema({
        texto: 'Problemas de Conexion con el servidor o Error de la aplicacion. Contacte con soporte',
        variante: 'error',
      });
    }
  };
  return {
    errorHttp,
  };
}

export default useError;
