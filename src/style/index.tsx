import styled from 'styled-components'

export const Container = styled.div`
  margin: 0;
  padding: 0;
  background-color: #000000;
  width: 100vw;
  height: 100vh;
  display: flex;
  color: white;
  padding-top: 2rem;
  justify-content: center;
  align-items: start;
`;

export const Formu = styled.form`
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: center;
 width: 100%;
 gap:1rem;
`;

export const Container_Input = styled.div`
  grid-template-columns: 1fr 1fr;
  width: 100%;
  display: grid;
  gap: 10px;

`
export const Porvolta =  styled.div `
  flex-direction: column;
  display: flex;
`

export const Container_Formulario = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  max-height:70vh;
  overflow-y: auto;
  margin-top: 4rem;
`
export const Label = styled.label`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #ffff;
  padding: 0 0 0.1rem 0.2rem;
  width: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;


export const Input = styled.input<{ $primary?: boolean; $second?: boolean; }>`
 background-color : #ffff;
 border-radius: 0.3rem ;
 outline: none;
 border: none;
 padding: 0.4rem;

`;


export const Select = styled.select<{ $primary?: boolean; }>`
 outline: none;
 border: none;
 padding: 0.3rem;
 border-radius: 0.3rem ;
 background-color : #ffff;
 `;


export const Inputbuscas = styled.input`
 outline: none;
 border-radius: 40rem;
 border: none;
 font-size: 1rem;
 width: 90%;
 padding: 0.3rem;
 height: 2rem;
 `;
export const Botao = styled.button`
 padding: 0.5rem 3rem 0.5rem 3rem  ;
 display: flex;
 align-items: center;
 border-radius: 10rem;
 border: none;
 font-weight: 900;
 font-size: 1.1rem;
 background-color: #eaff00;
 justify-content: center;
 color : #000000df;
 cursor: pointer;
 
 &::after {
    border: none;
  }
  &:hover {
    background-color: #baef1c;
  }
`;
export const Span = styled.span`
 font-size: 1rem;
 color: #8f1616;
 align-items: start;
 width: 90%;
 font-weight: bolder;
 `;

 export const Listar = styled.div`
 
 `;
export const Table = styled.table`
width: 100%;
  border-collapse: collapse;
`;
export const Td = styled.td`
padding: 0.5rem;
  /* width: 20%; */
  `
  export const Th = styled.th`
    background-color: #3b3a3a;
  padding: 0.5rem;
  text-align: left;
  `
export const Titulo = styled.h1`
  
`
export const Tr = styled.tr`
&:nth-child(even) {
    background-color: #1b1b1baf;
  }
`
export const ContainerListagem = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-height:70vh;
  width: 70vw;
`

export const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  gap: 5px;
 align-items: center;
`


export const Center =  styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;

`
export  const Botaoedit = styled.button `
  color: red;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
`