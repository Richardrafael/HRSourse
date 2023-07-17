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
  Container_Formulario, 
  Container_Input, 
  Formu, 
  Input, 
  Label, 
  Porvolta,  
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

// interface partipantes {
//   nome : string,
//   cargo : string,
//   empresa : string ,
//   QuantAprovado :number
//   id : number,
//   DataFim : string,
//   DataInicio : string
  
// }

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
  cep : z.string() , 
  rua : z.string(),
  bairro : z.string(),
  cidade : z.string(),
  estado : z.string(),
  complemento : z.string(),

})

function CadastroUsuarios() {

  const [cep , setCep] = useState("")
  const [dados , setDados ] = useState< Cep | undefined >()
  const [error , setError] = useState(null)
  // const [processos , setPrecesso] = useState<partipantes[]>()
  const [loading , setLoading ] = useState(true)
  const [abrecep , setAbrecep] = useState(false)
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
      console.log(data)
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
          // console.log(res.data)
          setDados(res.data);
        })
        .catch((error) => setError(error.message))
        // console.log("passei")
        setLoading(true)
        setAbrecep(true)
        
        }
        // console.log("passei")
        Buscar();
        setLoading(true);
      }else {
      setAbrecep(false)
      }
  }, [cep.length > 7])

  // useEffect (() => {
  //   async function Buscar() {
  //     await postar
  //     .get("Processos")
  //     .then ((res) => {
  //       console.log(res.data)
  //       setPrecesso(res.data)
  //     })
  //     .catch((error) => setError(error.message))
  //     console.log("passei")
  //   }
  //   Buscar()
  //  },[])

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

    <Container>
    <Menu/>
    <Container_Formulario>
    <Titulo>Cadastro Participante</Titulo>
    
      <Formu 
      action="" 
      onSubmit={handleSubmit(createUser)}
      >
        <Container_Input>
          <Porvolta>
          <Label htmlFor="nome">Nome</Label>
         <Input 
          $primary type="text" 
          placeholder="Nome"
          {...register('nome')}
          />
          {errors.nome && <Span>{errors.nome.message}</Span>}
          </Porvolta>
          <Porvolta>
            <Label htmlFor="email">Email</Label>
          <Input 
                    $primary  type="email"
                    placeholder="Email"
                    {...register('email')}
                    />
                    {errors.email && <Span>{errors.email.message}</Span>}
          </Porvolta>
         {/* <Porvolta>
          <Label htmlFor="Processo">Processo</Label>
         <Select  
          id="processo" 
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

         </Porvolta> */}
         <Porvolta>
          <Label htmlFor="Telefone">Telefone</Label>
         <Input $primary 
          type="tel" 
          placeholder="Telefone"
          {...register('telefone')}
          />
          {errors.telefone && <Span>{errors.telefone.message}</Span>}
         </Porvolta>
          <Porvolta>
            <Label htmlFor="Cep">Cep</Label>
          <Input $primary
          type="number"
          id="aa"
          placeholder="Digite seu Cep" 
          {...register('cep')}
          onChange={(e => setCep(e.target.value))} />
          </Porvolta>
          
          

          { 
          error  || dados?.erro === true  ?
          <>
            <h1>Nao encontrado</h1>
            </>
            : 
            <>
          {
           loading ? <> 
            { 
             abrecep  && 
              <>
              <Porvolta>
                <Label htmlFor="logradouro">Logradouro</Label>
              <Input type="text" 
              {...register('rua')}
              value={dados?.logradouro}/>

              </Porvolta>
              <Porvolta>
                <Label htmlFor="Bairro">Bairro</Label>
              <Input type="text" 
              {...register('bairro')}
              value={dados?.bairro}/>                
              </Porvolta>
              
             <Porvolta>
              <Label htmlFor="Localidade">Cidade</Label>
               <Input type="text" 
               disabled 
               {...register('cidade')}
               value={dados?.localidade}/>
              </Porvolta>
              <Porvolta>
                <Label htmlFor="Estado">Estado</Label>
              <Input type="text" 
              disabled 
              {...register('estado')}
              value={dados?.uf}/>
              </Porvolta>
              {
              dados?.complemento && 
              <Porvolta>
              <Label htmlFor="complemento">Complemento</Label>
              <Input type="text" 
              disabled  
              {...register('complemento')}
              value={dados?.complemento}/>
              </Porvolta> 
              }
              </> 
             }   
             </>
             : 
              <>
              <h1>carregando</h1>
              </>
           } </>}
             
         {enviado && (
            <>
                <Navigate to="/listagemUsuario" replace={true} />
            </> 
         )}
          </Container_Input>
          <Botao type="submit">
            Cadastrar
            </Botao>
      </Formu>

    </Container_Formulario>
    
      </Container>
    </>
  )
}

export default CadastroUsuarios
