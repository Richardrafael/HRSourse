import { useEffect, useState } from "react"
import Menu from "../../components/Menu"
import { 
  Botaoedit,
  Center,
  Container, 
  ContainerListagem, 
  Div, 
  Listar, 
  Table, 
  Td, 
  Th, 
  Titulo,
  Tr
 } from "../../style"
import { postar } from "../../service/axiosinstance"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"


interface partipantes {
  nome : string,
  empresa : string,
  DataFim : Date ,
  QuantAprovado :number
  id : number
  
}


function ListagemUsuarios() {

  const [participantes , setParticipantes] = useState<partipantes[]>([])

  useEffect(() => { 
    postar.get("Processos") 
    .then((response) => {
      setParticipantes(response.data)
      console.log(response.data)
    })
    .catch(
      (error) => console.log(error)
      )
    
   },[]);

const apaga = (id : number) =>{
    postar.delete(`Processos/${id}`)
    .then(response => {
      window.location.reload();
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

function formatarDataPadraoBrasil(data : any) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

  return (
    <>
     <Menu/>
     <Container>
      <Center>
        <Titulo>Processos Seletivos</Titulo>
        <ContainerListagem>
        <Listar>
        <Table>       
            <Tr>
              <Th>
                Nome
              </Th>
              <Th>
                Empresa
              </Th>
              <Th>
                Data Fim
              </Th>
              <Th>
                Quant.Aprovados
              </Th>
              <Th>
                Edição
              </Th>
            </Tr>
          <tbody>
          { participantes &&  <> {
            participantes.map((particante , i) => (
              <Tr key={i}>
              <Td>
                {particante?.nome}
              </Td>
              <Td>
                {particante?.empresa}
              </Td>
              <Td>
                {formatarDataPadraoBrasil(particante?.DataFim?.toLocaleString())}
              </Td>
              <Td>
                {particante?.QuantAprovado}
              </Td>
              <Td>
                {/* <ContainerEdit> */}
                <Div>
                  <Botaoedit onClick={() => apaga(particante?.id)}>
                    <FaTrash size={20}></FaTrash>
                  </Botaoedit>
                  <Link style={{textDecoration:"none" }} to={`/EditarProces/${particante?.id}`}>
                    <FaEdit></FaEdit>
                  </Link>
                </Div>
                {/* </ContainerEdit> */}
                
               
              </Td>
              </Tr>
            ))
          }</>}
          </tbody>
        
        </Table>
      
        
      </Listar>

        </ContainerListagem>
      
      </Center>
     </Container>
    </>
    
  )
}

export default ListagemUsuarios
