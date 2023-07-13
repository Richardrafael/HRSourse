import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';
import {zodResolver}  from "@hookform/resolvers/zod"
import { postar } from "../../service/axiosinstance"
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
import { ToastContainer, toast } from "react-toastify"
import Menu from "../../components/Menu";
import { Navigate } from "react-router-dom";


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
  empresa : z.string()
  .nonempty("Empresa é obrigatório")
  .toLowerCase() ,
  cargo : z.string() ,
  QuantAprovado : z.string().nonempty("QuantidadeAprovados é obrigatório"),
  modalidade:z.string().nonempty("escolha um modalidade"),
  localidade:z.string(),
  DataInicio: z.coerce.date().transform(data => {
 const dataObj = new Date(data);
  const dia = String(dataObj.getDate() + 1).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();

  const dataFormatada = `${ano}-${mes}-${dia}`;
  return dataFormatada;
  }),
  DataFim: z.coerce.date().transform(data => {
    const dataObj = new Date(data);
     const dia = String(dataObj.getDate() + 1).padStart(1, "0");
     const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
     const ano = dataObj.getFullYear();
   
     const dataFormatada = `${ano}-${mes}-${dia}`;
     return dataFormatada;
     }),
})


function CadastroPlataforma() {
  const [error , setError] = useState(null)
  const [loading , setLoading ] = useState(true)
  const [enviado , setEnviado] = useState(false)
  
  // register junta todos em obj , formState pega os erros  
  const { register , handleSubmit , formState: {errors}  }
   = useForm<Userfrom>({
    // resolver junta o zod com useFrom
    resolver  : zodResolver(createUserFormSchema)
  })

  async function createUser (data : any) {
    console.log(data)
      setLoading(false)
      try {
       await postar.post('/Processos' , data)
        sucesso()
      }catch(response : any ){
        setError(response.data)
      }
      setLoading(true)
  }

  const sucesso = () => {
    toast.success('Participante Cadastrado com sucesso', {
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
    <Titulo>Cadastro Processos</Titulo>
    <Formu 
      action="" 
      onSubmit={handleSubmit(createUser)}
      >
        
          {error && <Span>{error}</Span>}
          <Container_Input>
          <Porvolta>
          <Label htmlFor="Nome">Nome</Label>
         <Input 
          $primary type="text" 
          placeholder="Nome"
          {...register('nome')}
          />
          {errors.nome && <Span>{errors.nome.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="empresa">Empresa</Label>
          <Input 
          $primary  type="text"
          placeholder="Empresa"
          {...register('empresa')}
          />
          {errors.empresa && <Span>{errors.empresa.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="QuantAprovado">Quantidade Aprovados</Label>
          <Input 
          $primary  type="number"
          placeholder="Quantidade de Aprovados"
          {...register('QuantAprovado')}
          />
          {errors.modalidade && <Span>{errors.modalidade.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="modalidade">Modalidade</Label>
          <Input $primary  
          type="text" 
          placeholder="Modalidade"
          {...register('cargo')}
          />
          {errors.QuantAprovado && <Span>{errors.QuantAprovado.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="data_inicio">Data Inicio</Label>
          <Input $second  
          type="date" 
          placeholder="Data de Inicio"
          {...register('DataInicio')}
          />
          {errors.DataInicio && <Span>{errors.DataInicio.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="Data_fim">Data Fim</Label>
          <Input $second 
          type="date" 
          placeholder="Data fim"
          {...register('DataFim')}
          />
          {errors.DataFim && <Span>{errors.DataFim.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="localidade">Localidade</Label>
          <Input $primary  
          type="text" 
          placeholder="Localidade"
          {...register('localidade')}
          />
           {errors.localidade && <Span>{errors.localidade.message}</Span>}
          
          </Porvolta>
          </Container_Input>
           {loading ?
          <Botao type="submit">
            Cadastrar
            </Botao>
            :
            <>
            <Span>carregando ...</Span>
            </>}
      </Formu>
    </Container_Formulario>
      
          
          {enviado && (
            <>
                <Navigate to="/listagemProcesso" replace={true} />
            </> 
         )}
         
      </Container>
    </>
  )
}

export default CadastroPlataforma
