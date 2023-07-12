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
  align-items: center;
`;

export const Titulo = styled.h1`
 color: white;
 font-size: xx-large;
 font-weight: bold;
`
export const Formu = styled.form`
width: 90vw;
display:  flex ;
flex-direction: column;
gap: 1rem;
overflow-x: hidden;
align-items: center;
max-height: 70vh;
overflow-y: auto;
`;

export const Listar = styled.div`
width: 75%;
display:  flex ;
margin-top:5rem ;
flex-direction: column;
padding: 2rem;
align-items: center;
border-radius: 6rem;
gap: 10px;
min-height: 40rem;

`;

export const Input = styled.input<{ $primary?: boolean; $second?: boolean; }>`
 padding-left: 1rem;
 background-color: ${props =>
 props.$primary ? '#ffffff' : props.$second ? '#ffff' : '#ffffffdb'};
 outline: none;
 border: none;
 /* padding:  ${props =>
 props.$primary ? '10px' : props.$second ? '17px' : "10rem"};;
 padding-left: 1rem ; */
 border-radius: 40rem;
 width: 100%;
`;

export const Select = styled.select<{ $primary?: boolean; }>`
 background-color: ${props => props.$primary ? "#ffffff" : "#ffffffdb"};
 outline: none;
 border: none;
 border-radius: 40rem;
 /* padding: 10px; */
 /* padding: 1rem 1rem 1rem 0 ; */
 height: 2.20rem;
 font-size: 1rem;
 width: 100%;
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
 padding: 1rem;
 display: flex;
 align-items: center;
 border-radius: 10rem;
 border: none;
 font-weight: 900;
 width: 30%;
 font-size: 1.4rem;
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

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  background-color: #000000;
  max-height: 30rem;
`;


export const Td = styled.td`
  font-size: 1.3rem;
  text-align: center;
  border:  1px ;
  color: black;
  width: 100%;
  background-color: white;
`
export const Tr = styled.tr`
  font-size: 1.3rem;
  text-align: center;
  border:  1px ;
  color: black;
  background-color: #dbd7d7;
`

export const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
 align-items: center;
`

export  const Botaoedit = styled.button `
  color: red;
  border: none;
  cursor: pointer;
  background-color: #fff;
`