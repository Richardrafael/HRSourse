import styled from 'styled-components'

export const MenunoOpen = styled.div `
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10px; 
`

export const MenuWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 16px;
  position  : fixed ;
  padding-top: 4rem;
  width: 100%;
  height: 100%;
  
`;

export const Open = styled.button`
 padding: 0.7rem ;
 margin-left: 0.7rem;
 display: flex;
 align-items: center;
 justify-content: center;
 height: 40px;
  width: 40px;
 border-radius: 100rem;
 border: none;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 cursor: pointer;
 &:hover{
  background-color: #fced1c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

}
 &:after{
    border: none;
 }
  
`;
export const MenuList = styled.div`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

export const MenuItem = styled.div`
  display: inline-block;
  margin-right: 16px;
  text-decoration: none;
`;

export const Texto = styled.span`
  color: #000000;
  font-size: 2rem;
  padding: 0.4rem;
  border-radius: 20rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  &:hover {
    color: #666;
  }
`;

export const H1 = styled.h1`
  color: #000000;
  font-size: 1.6rem;
  font-weight: 700;
  padding-right: 0.7rem;
`;