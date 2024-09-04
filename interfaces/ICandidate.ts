import * as yup from 'yup';

const schemaCandidate = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  endereco: yup.string().required('Campo obrigatório'),
  numeroBi: yup.string().required('Campo obrigatório'),
});

interface CandidateForm {
  nome: string;
  telefone: string;
  endereco: string;
  numeroBi : string;
}

interface CadidateFiles {
  bilheteFile: FileList;  
  certificadoFile: FileList; 
  residenciaFile: FileList; 
}

interface Extras{
  tipo: string;
  termosChecked: boolean;  
}

type UserProps = {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  bilhete: string;
  certificado: string;
  residencia: string;
  tipo: string;
  estado: string;
  perfilUrl: string;
}

export { schemaCandidate, CandidateForm, CadidateFiles,Extras, UserProps };
