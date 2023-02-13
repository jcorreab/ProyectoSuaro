export const estiloActivo = {
  width: '100px',
  color: '#00AB55',
  // borderRadius: "1rem",
  border: 'solid 0px #00AB55',
  backgroundColor: '#cbf5d8',
};
export const estiloInactivo = {
  width: '100px',
  color: '#bd2323',
  // borderRadius: "1rem",
  border: '0px solid #bd2323',
  backgroundColor: '#e7b9b9',
};
export const estiloTabla = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'background.neutral',
    borderRadius: '0.5rem',
  },
  width: '100%',
};

export const estiloDatagrid = {
  '& .MuiDataGrid-cell': {
    border: 'none',
  },
  '& .scrollArea--right': {
    border: '20px',
  },
};
export const estiloModal = {
  borderRadius: '1rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '90%', md: '90%', lg: '45%' },
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export const estilosContenedor = {
  padding: '1rem',
  height: '55vh',
  width: '100%',
};
