import { useEffect, useState } from "react"
import Menu from "../../components/Menu"
import { 
  Botaoedit,
  Container, 
  Div, 
  Listar, 
  Table, 
  Td, 
  Titulo,
  Tr
 } from "../CadastroUsuario/style"
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
      <Listar>
        <Titulo>Processos Seletivos</Titulo>
        <Table>
          <thead>
            <Tr>
              <th>
                Nome
              </th>
              <th>
                Empresa
              </th>
              <th>
                Data Fim
              </th>
              <th>
                Quant.Aprovados
              </th>
              <th>
                Edição
              </th>
            </Tr>
          </thead>
          <tbody>
          { participantes &&  <> {
            participantes.map((particante , i) => (
              <tr key={i}>
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
                  <Link style={{textDecoration:"none" ,}} to={`/EditarProces/${particante?.id}`}>
                    <FaEdit></FaEdit>
                  </Link>
                </Div>
                {/* </ContainerEdit> */}
                
               
              </Td>
              </tr>
            ))
          }</>}
          </tbody>
        
        </Table>
      
        
      </Listar>
     </Container>
    </>
    
  )
}

export default ListagemUsuarios
