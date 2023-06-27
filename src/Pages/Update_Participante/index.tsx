import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postar } from '../../service/axiosinstance';
import Menu from '../../components/Menu';
import { Botao, Container, Formu, Input, Listar, Span, Titulo } from '../CadastroUsuario/style';
import { useForm } from "react-hook-form"
// import { FaSearch } from "react-icons/fa";
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';
import {zodResolver}  from "@hookform/resolvers/zod"
import { ToastContainer, toast } from 'react-toastify';

interface partipantes {
  nome : string,
  telefone : string,
  email : string ,
  processo_seletivo :string
  id : number
  
}

// tipagem inteligente pega todos os dados de cada createUserFormSchema

type Userfrom =z.infer<typeof createUserFormSchema>


// Validação dos dados com zod 

const createUserFormSchema  = z.object ({
  nome : z.string()
  .nonempty("Nome é obrigatório")
  // tranforma o nome com começo das palavras maisculas
  .transform(nome => {
    return nome.trim().split(" ").map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(" ")
  }),
  email : z.string()
  .nonempty("Email é obrigatório")
  .email("Formato de e-mail inválido")
  .toLowerCase() ,
  telefone : z.string() ,
  processo_seletivo : z.string().nonempty("Processo é obrigatório"),
  // cargo : z.string(),
  // cep : z.string().max(7, "Cep invalido").min(6 , "Cep tem 7 caracteres")

})


function Update_Participante() {
  const [participantes , setParticipantes] = useState< partipantes >()
  const [loading , setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams();

    // register junta todos em obj , formState pega os erros  
    const { register , handleSubmit , formState: {errors}  }
    = useForm<Userfrom>({
     // resolver junta o zod com useFrom
     resolver  : zodResolver(createUserFormSchema)
   })

   async function createUser (data : any) {
    setLoading(true)
    // console.log(data)
    try {
     await postar.patch(`/participantes/${id}` , data)
    // .then(function ( response : any ){
    //   console.log(response.message)
    // })
   sucesso()
    }catch(response : any ){
      setError(response.data)
    }
}

const sucesso = () => {
  toast.success('Atualização Concluida', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
  useEffect(() => {
    
    (async () =>{
      setLoading(false)
        try{
         const res  = await postar.get(`/participantes/${id} `) 
         console.log(res.data);
           
         setParticipantes(res.data)
        } catch (res : any) {
          console.log(res.data)
            setError(res.data)
        }
    })()
    setLoading(true)
  },[])

  return (
    <>
    <Menu/>
    <Container>
    
        <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
         
         { loading  ?
      
         <>
            <Formu 
         action="" 
         onSubmit={handleSubmit(createUser)}
         >
           <Titulo>Atualizando Candidatos</Titulo>
          <Input 
            $primary type="text" 
            placeholder="Nome"
            defaultValue={participantes?.nome}
            {...register('nome')}
            />
            {errors.nome && <Span>{errors.nome.message}</Span>}
            <Input 
            $primary  type="email"
            placeholder="Email"
            defaultValue={participantes?.email}
            {...register('email')}
            />
            {errors.email && <Span>{errors.email.message}</Span>}
            <Input $primary  
            type="text" 
            defaultValue={participantes?.processo_seletivo}
            placeholder="Processo Seletivo"
            {...register('processo_seletivo')}
            />
            {errors.processo_seletivo && <Span>{errors.processo_seletivo.message}</Span>}
            <Input $primary 
            type="tel" 
            defaultValue={participantes?.telefone}
            placeholder="Telefone"
            {...register('telefone')}
            />
            {errors.telefone && <Span>{errors.telefone.message}</Span>}
           { loading &&
            <Botao type="submit">
              Cadastrar
              </Botao>}
              </Formu>
           </> 
           : 
           <>
           <h1>carregando</h1>
           </> }
     
    </Container>
    </>
    
  )
}

export default Update_Participante
