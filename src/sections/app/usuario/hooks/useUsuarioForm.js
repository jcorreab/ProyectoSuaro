import { useState,useRef } from "react";

const useUsuarioForm = () => {
    const [formulario, setFormulario] = useState({
        codigo: '',
        nombres: '',
        apellidos:'',
        tipo_usuario: '',
        identificacion: '',
        celular: '',
        correo:'',
        observacion:'',
        fecha_ingreso: new Date(),
        clave:'',
        estado: true
    })

    

};

export default useUsuarioForm;
