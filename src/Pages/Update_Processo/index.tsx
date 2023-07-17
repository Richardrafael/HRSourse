import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postar } from '../../service/axiosinstance';
import Menu from '../../components/Menu';
import { Botao, Container, Container_Formulario, Container_Input, Formu, Input, Label, Porvolta, Span, Titulo } from "../../style";
import { useForm } from "react-hook-form"
// import { FaSearch } from "react-icons/fa";
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';
import {zodResolver}  from "@hookform/resolvers/zod"
import { ToastContainer, toast } from 'react-toastify';

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
  empresa : z.string()
  .nonempty("Empresa é obrigatório")
  .toLowerCase() ,
  cargo : z.string() ,
  modalidade:z.string().nonempty("escolha um modalidade"),
  localidade:z.string(),
  QuantAprovado : z.string().nonempty("QuantidadeAprovados é obrigatório"),
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


function Update_Processo() {
  // const [participantes , setParticipantes] = useState< partipantes >()
  const [loading , setLoading] = useState(true)
  const [nome , setNome] = useState("")
  const [empresa , setEmpresa] = useState("")
  const [QuantAprovado, setQuantAprovado] = useState("")
  const [data,setData] =useState([])
  const [ , setCargo] = useState("")
  // const [visible,setIvisible] =useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams();


  useEffect(() => {
    
    (async () =>{
      setLoading(false)
        try{
         const res  = await postar.get(`/Processos/${id} `) 
         console.log(res.data);
         transformarData(res.data.DataInicio, res.data.DataFim)
        //  setParticipantes(res.data);
         setEmpresa(res.data.empresa)
         setNome(res.data.nome)
         setCargo(res.data.cargo)
         setQuantAprovado(res.data.QuantAprovado)
        } catch (res : any) {
          console.log(res.data)
            setError(res.data)
        }
    })()
    setLoading(true)
  },[])

    // register junta todos em obj , formState pega os erros  
    const { register , handleSubmit  ,  formState: {errors}  }
    = useForm<Userfrom>({
     // resolver junta o zod com useFrom
     resolver  : zodResolver(createUserFormSchema),
     
     
   })

   async function createUser (data : any) {
    
    setLoading(true)
    console.log(data)
    try {
     await postar.patch(`/Processos/${id}` , data)
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
 


   function transformarData(data : number , DataFim : number) {
    const test = [data, DataFim]
    const dadosFormatados: any  = [];
    
    test.forEach((data) => {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate() ).padStart(1, "0");
        const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
        const ano = dataObj.getFullYear();
        const dataFormatada = `${ano}-${mes}-${dia}`;
        console.log(dataFormatada)
        dadosFormatados.push(dataFormatada);
    })
    console.log(dadosFormatados)
    return setData(dadosFormatados);
   
  }
  
  // const editar = () =>  {
  //   setIvisible(!visible)
  //   console.log("passei")
  // }

  
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
    <Titulo>Atualiza Processos</Titulo>
    { loading ? <Formu 
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
          defaultValue={nome}
          {...register('nome')}
          />
          {errors.nome && <Span>{errors.nome.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="empresa">Empresa</Label>
          <Input 
          $primary  type="text"
          defaultValue={empresa}
          placeholder="Empresa"
          {...register('empresa')}
          />
          {errors.empresa && <Span>{errors.empresa.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="QuantAprovado">Quantidade Aprovados</Label>
          <Input 
          defaultValue={QuantAprovado}
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
          defaultValue={data[0]}
          placeholder="Data de Inicio"
          {...register('DataInicio')}
          />
          {errors.DataInicio && <Span>{errors.DataInicio.message}</Span>}
          </Porvolta>
          <Porvolta>
          <Label htmlFor="Data_fim">Data Fim</Label>
          <Input $second 
          type="date" 
          defaultValue={data[1]}
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
            Atualizar
            </Botao>
            :
            <>
            <Span>carregando ...</Span>
            </>}
      </Formu> : 
      <h1>Carregando</h1>
      }
    </Container_Formulario>
      
{/*           
          {enviado && (
            <>
                <Navigate to="/listagemProcesso" replace={true} />
            </> 
         )} */}
         
      </Container>
    </>
    
  )
}

export default Update_Processo
