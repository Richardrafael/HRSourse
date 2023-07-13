
import { FaBars, FaTimes } from 'react-icons/fa';
import  '../../global.css'
import { H1, MenuItem, MenuList, MenuWrapper, MenunoOpen, Open, Texto } from './style';
import { Link } from 'react-router-dom';
// import Toogle from '../toogle';
// import { motion } from 'framer-motion';

interface BarProps {
    isOpen: Function;
    visible: boolean;
    
  }


const Bar  = ({isOpen   , visible ,  } : BarProps) => {
    return (
        <>
        { visible &&
       <>
      <MenuWrapper>
      <MenuList>
        <MenuItem>
          <Link style={{textDecoration:"none" }} to="/cadastroUsuario">
            <Texto>    
            Cadastro Candidatos
            </Texto> 
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={{textDecoration:"none" }} to="/cadastroProcesso">
            <Texto>
            Cadastro Processo
            </Texto>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={{textDecoration:"none" }}  to="/listagemUsuario">
          <Texto>
            Listar Candidatos
            </Texto>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={{textDecoration:"none" }} to="/listagemProcesso">
            <Texto>
            Listar Processos
            </Texto>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={{textDecoration:"none" ,}} to="/Dashboard">
           <Texto>
           DashBoard
            </Texto> 
          </Link>
        </MenuItem>
      </MenuList>
    </MenuWrapper>
       </> 
       }
    
    
      
    <MenunoOpen>
        <>
            <Open 
                onClick={() => isOpen( )}>
                { 
                !visible ? 
                <FaBars size={20}/> 
                : 
                <FaTimes size={20}  />
                }
                </Open>
        </>
        <>
                <H1 >RhSource</H1> 
        </>
    </MenunoOpen>
    
   
        </>
    )
}


export default Bar
