import { useState } from 'react';
import  '../../global.css'
import Bar from './Onopen';


function Menu( ) {
  const isOpen = () => setModal(!modal);
  const [modal, setModal] = useState(false);

 
  return (
    <>
      <Bar isOpen={isOpen}  visible={modal} />
  </>
  )
}


export default Menu
