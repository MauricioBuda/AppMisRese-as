import {object,ref,string} from 'yup'

export const registerSchema = object({
    confirmPassword:string()
    .required("Campo incompleto")
    .oneOf([ref("password"),null],"Las claves no coinciden"),
    password:string()
                .required("Campo incompleto")
                .min(8,"Al menos debe tener 8 dígitos")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"Por favor, incluir al menos una mayúscula, una minúscula y un número"),
    email:string()
            .required("Campo incompleto")
            .email("Email no valido"),
    
})