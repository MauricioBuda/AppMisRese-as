import {object,string} from 'yup'

export const loginSchema = object({
    password:string()
                .required("Campo incompleto")
                .min(8,"Minimo 8 caracteres")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"Clave incorrecta"),
    email:string()
            .required("Campo incompleto")
            .email("Email no valido"),
    
})