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
width: 75%;
/* height */
display:  flex ;
flex-direction: column;
/* background-color: #181919; */
padding: 2rem;
align-items: center;
border-radius: 6rem;
min-height: 40rem;
gap: 10px;

`;

export const Listar = styled.div`
width: 75%;
/* height */
display:  flex ;
flex-direction: column;
/* background-color: #53a5a5; */
padding: 2rem;
/* justify-content: ; */
align-items: center;
border-radius: 6rem;
min-height: 40rem;
gap: 10px;

`;

// export const Table = styled.`
  

// `;

export const ContainerInput = styled.div`
 display: flex;
 align-items: start;
 gap: 1rem;
 padding: 0.3rem;
 /* padding-left: 1rem ; */
 flex-direction: column;
`

export const Input = styled.input<{ $primary?: boolean; }>`
 padding-left: 1rem;
 background-color: ${props => props.$primary ? "#ffffff" : "#ffffffdb"};
 outline: none;
 border: none;
 border-radius: 40rem;
 padding: 0.3rem;
 padding-left: 1rem ;
 height: 2rem;
 font-size: 1rem;
 width: 90%;
`;

export const Select = styled.select<{ $primary?: boolean; }>`
 padding-left: 1rem;
 background-color: ${props => props.$primary ? "#ffffff" : "#ffffffdb"};
 outline: none;
 border: none;
 border-radius: 40rem;
 padding: 0.3rem;
 padding-left: 1rem ;
 height: 2.35rem;
 font-size: 1rem;
 width: 92%;
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
  /* justify-content: center; */
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
// export const ContainerEdit = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: row;
//   width: 100%;
// `