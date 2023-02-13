import { Button, IconButton } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

/**
 * @param {{ propiedades: object }} Props
 */
// eslint-disable-next-line react/prop-types
export const BotonNuevo = ({ propiedades }) => (
    <Button
        fullWidth
        variant="text"
        startIcon={<InsertDriveFileRoundedIcon />}
        {...propiedades}
    >
        Nuevo
    </Button>
)

/**
 * @param {{ propiedades: object, texto: string }} Props
 */
// eslint-disable-next-line react/prop-types
export const BotonAgregar = ({ propiedades, texto }) => (
    <Button
        fullWidth
        variant="text"
        startIcon={<AddCircleRoundedIcon />}
        {...propiedades}
    >
        {texto}
    </Button>
)

/**
 * @param {{ propiedades: object }} Props
 */
// eslint-disable-next-line react/prop-types
export const BotonBuscar = ({ propiedades }) => (
    <Button
        fullWidth
        variant="text"
        startIcon={<SearchRoundedIcon />}
        {...propiedades}
    >
        Buscar
    </Button>
)

/**
 * @param {{ propiedades: object, texto: string }} Props
 */
// eslint-disable-next-line react/prop-types
export const BotonGrabar = ({ propiedades, texto }) => (
    <Button
        fullWidth
        variant="text"
        startIcon={<SaveRoundedIcon />}
        {...propiedades}
    >
        {texto}
    </Button>
)


/**
 * @param {{ propiedades: object }} Props
 */
// eslint-disable-next-line react/prop-types
export const BotonIconBuscar = ({ propiedades }) => (
  <IconButton size="small" {...propiedades}>
    <SearchRoundedIcon />
  </IconButton>
);

/** Propiedades por defecto */
BotonGrabar.defaultProps = {
  texto: 'Grabar',
};
BotonAgregar.defaultProps = {
  texto: 'Agregar',
};


