import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import PropTypes from 'prop-types';

CuadroDialogo.propTypes = {
  abrirModal: PropTypes.bool.isRequired,
  cerrarModal: PropTypes.func.isRequired,
  ejecutarFuncion: PropTypes.func.isRequired,
  datos: PropTypes.object.isRequired,
};

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function CuadroDialogo(props) {
  const { abrirModal, cerrarModal, ejecutarFuncion, datos } = props;
  const [desplegar, setDesplegar] = React.useState(true);
  const desplegarMenu = () => {
    setDesplegar(!desplegar);
  };

  return (
    <Dialog
      open={abrirModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={cerrarModal}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{'Verifique los datos de la reservacion'}</DialogTitle>
      <DialogContent>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Datos de la Reservacion
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Person2RoundedIcon />
            </ListItemIcon>
            <ListItemText primary={datos.estudiante} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MarkEmailReadRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={datos.correo} />
          </ListItemButton>
          <ListItemButton onClick={desplegarMenu}>
            <ListItemIcon>
              <SupervisorAccountRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Invitados" />
            {desplegar ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={desplegar} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {datos.invitados.map((m) => (
                <ListItemButton key={m.codigo} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={m.nombre} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => ejecutarFuncion()}>Aceptar</Button>
        <Button onClick={() => cerrarModal()}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CuadroDialogo;
