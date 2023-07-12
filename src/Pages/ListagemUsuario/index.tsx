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
 } from "../../style"
import { postar } from "../../service/axiosinstance"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"


interface partipantes {
  nome : string,
  telefone : string,
  email : string ,
  processo_seletivo :string
  id : number
  
}


function ListagemUsuarios() {

  const [participantes , setParticipantes] = useState<partipantes[]>([])

  useEffect(() => { 
    postar.get("participantes") 
    .then((response) => {
      setParticipantes(response.data)
      console.log(response.data)
    })
    .catch(
      (error) => console.log(error)
      )
    
   },[]);

const apaga = (id : number) =>{
    postar.delete(`participantes/${id}`)
    .then(response => {
      window.location.reload();
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

  return (
    <>
     <Menu/>
     <Container>
      <Listar>
        <Titulo>Participantes</Titulo>
        <Table>
          <thead>
            <Tr>
              <th>
                Nome
              </th>
              <th>
                Telefone
              </th>
              <th>
                Gmail
              </th>
              <th>
                Processo
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
                {particante?.telefone}
              </Td>
              <Td>
                {particante?.email}
              </Td>
              <Td>
                {particante?.processo_seletivo}
              </Td>
              <Td>
                {/* <ContainerEdit> */}
                <Div>
                  <Botaoedit onClick={() => apaga(particante?.id)}>
                    <FaTrash size={20}></FaTrash>
                  </Botaoedit>
                  <Link style={{textDecoration:"none" ,}} to={`/EditarPar/${particante?.id}`}>
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
