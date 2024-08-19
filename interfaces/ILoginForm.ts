import * as yup from "yup";

interface FormData {
    email: string;
    password: string;
  }

const Loginschema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('E-mail não pode ser vazio'),
    password: yup.string().required('Senha vazia'),
  })
  .required()

  export { FormData, Loginschema }
