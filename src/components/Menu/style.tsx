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
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  
`;

export const Open = styled.button`
 padding: 1rem;
 border: none;
 cursor: pointer;
 &after{
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
  font-size: 3rem;
  font-weight: 700;
  &:hover {
    color: #666;
  }
`;

export const H1 = styled.h1`
  
  color: #000000;
  font-size: 2.2rem ;
  font-weight: 700;
  padding-right: 1rem;
`;