import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
// import { FaSearch } from "react-icons/fa";
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';
import {zodResolver}  from "@hookform/resolvers/zod"
import api, { postar } from "../../service/axiosinstance"
import { 
  Botao,
  Container, 
  Formu, 
  Input, 
  Select, 
  Span,
  Titulo
 } from "../../style"
// import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import Menu from "../../components/Menu";
import { Navigate } from "react-router-dom";


interface Cep {
  cep : string ,
  logradouro : string,
  complemento : string,
  localidade : string,
  uf : string
  bairro : string,
  erro : boolean

}

interface partipantes {
  nome : string,
  cargo : string,
  empresa : string ,
  QuantAprovado :number
  id : number,
  DataFim : string,
  DataInicio : string
  
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

function CadastroUsuarios() {

  const [cep , setCep] = useState("")
  const [dados , setDados ] = useState< Cep | undefined >()
  const [error , setError] = useState(null)
  const [processos , setPrecesso] = useState<partipantes[]>()
  const [loading , setLoading ] = useState(true)
  const [abrecep , setAbrecep] = useState(true)
  const [enviado , setEnviado] = useState(false)
  // const [enviado , setEnviado] = useState(false)
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
       await postar.post('/participantes' , data)
      // .then(function ( response : any ){
      //   console.log(response.message)
      // })
     sucesso()
      }catch(response : any ){
        setError(response.data)
      }
  }
  // o useEffect so sera acionado se o tamanho cep for maior 7 
  useEffect(() => {
    setError(null)
    if (cep.length > 7) {
      setLoading(false);
      console.log("passei");
      // setError(null)
      async function Buscar() {
        await api
        .get(`${cep}/json`)
        .then((res) => {
          console.log(res.data)
          setDados(res.data);
        })
        .catch((error) => setError(error.message))
        console.log("passei")
        setLoading(true)
        setAbrecep(true)
        
        }
        console.log("passei")
        Buscar();
        setLoading(true);
      }else {
      setAbrecep(false)
      }
  }, [cep.length > 7])

  useEffect (() => {
    async function Buscar() {
      await postar
      .get("Processos")
      .then ((res) => {
        console.log(res.data)
        setPrecesso(res.data)
      })
      .catch((error) => setError(error.message))
      console.log("passei")
    }
    Buscar()
   },[])

  const sucesso = () => {
    toast.success('Cadastrado com sucesso', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setTimeout(() => {
    setEnviado(true)
    },3000)
  }

  return (
    <>
     

    <Container>
    <Menu/>
      <Formu 
      action="" 
      onSubmit={handleSubmit(createUser)}
      >
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
          <Titulo>Cadastro Participante</Titulo>
         <Input 
          $primary type="text" 
          placeholder="Nome"
          {...register('nome')}
          />
          {errors.nome && <Span>{errors.nome.message}</Span>}
          <Input 
          $primary  type="email"
          placeholder="Email"
          {...register('email')}
          />
          {errors.email && <Span>{errors.email.message}</Span>}
          <Select  
          id="perfil" 
          $primary
          // placeholder="Processo Seletivo"
          {...register('processo_seletivo')}
          >
           <option disabled selected>
            Selecione
          </option>
          { processos && processos.map((relator) => (
          <option key={relator.id} value={relator.nome}>{relator.nome}</option>
          ))}
          </Select>
          {errors.processo_seletivo && <Span>{errors.processo_seletivo.message}</Span>}
          <Input $primary 
          type="tel" 
          placeholder="Telefone"
          {...register('telefone')}
          />
          {errors.telefone && <Span>{errors.telefone.message}</Span>}
          {/* <Input $primary  
          type="text" 
          placeholder="Cargo"
          {...register('cargo')}
          />
          {errors.cargo && <Span>{errors.cargo.message}</Span>} */}
          <Input $primary
          type="number"
          placeholder="Digite seu Cep" 
          onChange={(e => setCep(e.target.value))} />
          

          { 
          error  || dados?.erro === true  ?
          <>
            <h1>Nao encontrado</h1>
            </>
            : 
            <>
          {loading ? <> 
            { 
              //  aparece todos os dado de cep se for maior q 7
              abrecep  && 
              <>
              <Input type="text" disabled  value={dados?.logradouro}/>
              <Input type="text" disabled  value={dados?.bairro}/>
              
              {
              // complemento existe parace na tela 
              dados?.complemento && 
                <Input type="text" disabled  value={dados?.complemento}/>
              }
              <Input type="text" disabled  value={dados?.localidade}/>
              <Input type="text" disabled  value={dados?.uf}/>
              </>
              }
          </> : <h1>carregando</h1>}  
            
              </>
            }
             {enviado && (
            <>
                <Navigate to="/listagemUsuario" replace={true} />
            </> 
         )}
          
          <Botao type="submit">
            Cadastrar
            </Botao>
      </Formu>
      </Container>
    </>
  )
}

export default CadastroUsuarios
