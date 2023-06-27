import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postar } from '../../service/axiosinstance';
import Menu from '../../components/Menu';
import { Botao, Container, Div, Formu, Input, Span, Titulo } from '../CadastroUsuario/style';
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
  const [cargo , setCargo] = useState("")
  const [visible,setIvisible] =useState(true)
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
  
  const editar = () =>  {
    setIvisible(!visible)
    console.log("passei")
  }

  
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
           <Titulo>Atualiza Processo</Titulo>
           {error && <Span>{error}</Span>}
          <Input 
            $primary type="text" 
            placeholder="Nome"
            // value={participantes?.nome}
            disabled={visible}
            defaultValue={nome}
            {...register('nome')}
            />
            {errors.nome && <Span>{errors.nome.message}</Span>}
            <Input 
            $primary  type="text"
            placeholder="Empresa"
            defaultValue={empresa}
            disabled={visible}
            {...register('empresa')}
            />
            {errors.empresa && <Span>{errors.empresa.message}</Span>}
            <Input $primary  
            type="text" 
            defaultValue={QuantAprovado}
            disabled={visible}
            placeholder="Quantidade Aprovados"
            {...register('QuantAprovado')}
            />
            {errors.QuantAprovado && <Span>{errors.QuantAprovado.message}</Span>}
            <Input $primary 
            type="text" 
            defaultValue={cargo}
            placeholder="Cargo"
            disabled={visible}
            {...register('cargo')}
            />
            {errors.cargo && <Span>{errors.cargo.message}</Span>}
          
             <Input $primary 
            type="date" 
            defaultValue={data[0]}
            disabled={visible}
            placeholder="Data de Incio"
            {...register('DataInicio')}
            />
            {errors.DataInicio && <Span>{errors.DataInicio.message}</Span>}
           <Input $primary 
            type="date" 
            defaultValue={data[1]}
            disabled={visible}
            placeholder="Data de Fim"
            {...register('DataFim')}
            />
            {errors.DataFim && <Span>{errors.DataFim.message}</Span>}

            { visible ? 
              <div onClick={ editar}>
                Atualizar
              </div>
          : 
          <>
          <Botao type="submit">
                Cadastrar
                </Botao>
          </> 
          }
            
           </Formu>
           </>
       : <h1>ce</h1>  }
    </Container>
    </>
    
  )
}

export default Update_Processo
