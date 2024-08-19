import * as yup from "yup";

interface RegisterFormData {
    email: string;
    password: string;
    username : string;
  }

const Registerschema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('E-mail não pode ser vazio'),
    password: yup.string().required('Senha vazia'),
    username: yup.string().required('Nome vazio'),
  })
  .required()

  export { RegisterFormData, Registerschema }
