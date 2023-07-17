import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postar } from '../../service/axiosinstance';
import Menu from '../../components/Menu';
import { Botao, Container, Container_Formulario, Container_Input, Formu, Input, Label, Porvolta, Select, Span, Titulo } from "../../style";
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
  const [processos , setPrecesso] = useState<partipantes[]>()
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
    <Menu/>
    
    <Container>
    
       
         
         <Container_Formulario>
    <Titulo>Atualiza</Titulo>
    {loading && 
    <h1>hchdjkhcj</h1>
}
{error && 
    <h1>hchdjkhcj</h1>

    }
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
          defaultValue={participantes?.nome}
          {...register('nome')}
          />
          {errors.nome && <Span>{errors.nome.message}</Span>}
          </Porvolta>
          <Porvolta>
            <Label htmlFor="email">Email</Label>
                    <Input 
                     defaultValue={participantes?.email}
                    $primary  type="email"
                    placeholder="Email"
                    {...register('email')}
                    />
                    {errors.email && <Span>{errors.email.message}</Span>}
          </Porvolta>
         <Porvolta>
          <Label htmlFor="Processo">Processo</Label>
         <Select  
          id="processo" 
          $primary
          defaultValue={participantes?.processo_seletivo}
          {...register('processo_seletivo')}
          >
           <option disabled selected>
          { participantes?.processo_seletivo}
          </option>
          { processos && processos.map((relator) => (
          <option key={relator.id} value={relator.nome}>{relator.nome}</option>
          ))}
          </Select>
          {errors.processo_seletivo && <Span>{errors.processo_seletivo.message}</Span>}

         </Porvolta>
         <Porvolta>
          <Label htmlFor="Telefone">Telefone</Label>
         <Input $primary 
          type="tel" 
          defaultValue={participantes?.telefone}
          placeholder="Telefone"
          {...register('telefone')}
          />
          {errors.telefone && <Span>{errors.telefone.message}</Span>}
         </Porvolta>
          {/* <Porvolta>
            <Label htmlFor="Cep">Cep</Label>
          <Input $primary
          type="number"
          placeholder="Digite seu Cep" 
          onChange={(e => setCep(e.target.value))} />
          </Porvolta>
          
          

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
              <Porvolta>
                <Label htmlFor="logradouro">Logradouro</Label>
              <Input type="text" 
              disabled  
              value={dados?.logradouro}/>

              </Porvolta>
              <Porvolta>
                <Label htmlFor="Bairro">Bairro</Label>
              <Input type="text" 
              disabled  
              value={dados?.bairro}/>                
              </Porvolta>
              
              {
              dados?.complemento && 
              <Porvolta>
              <Label htmlFor="complemento">Complemento</Label>
              <Input type="text" 
              disabled  
              value={dados?.complemento}/>
              </Porvolta> 
              }
             <Porvolta>
              <Label htmlFor="Localidade">Localidade</Label>
               <Input type="text" 
               disabled 
                value={dados?.localidade}/>
              </Porvolta>
              <Porvolta>
                <Label htmlFor="Estado">Estado</Label>
              <Input type="text" 
              disabled 
               value={dados?.uf}/>
              </Porvolta>
              </>
              }
          </> : <h1>carregando</h1>}  
            
              </>
            }
             {enviado && (
            <>
                <Navigate to="/listagemUsuario" replace={true} />
            </> 
         )} */}
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

export default Update_Participante
