import { useState, createContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Home, Inventory, Item, SignIn, SignUp } from './components';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const AppContext = createContext();


const App = ()=> {

    const [user,setUser]=useState(1);
    const [isVerified, setIsVerified] = useState(false)
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const ContextObject = { user, setUser,
                            isVerified,  setIsVerified,  
                            firstName, setFirstName,
                            lastName, setLastName,
                            testStr: `I'm using context!`
                          }
    
    console.log(ContextObject);
    
    return(
        <>
        <AppWrapper id="App">
            <AppContext.Provider value={ContextObject}>
                <BrowserRouter>
                    <HeaderContainer><Header /></HeaderContainer>
                    <BodyContainer>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/inventory' element={<Inventory />} />
                            <Route path='/sign-in/*' element={<SignIn />} />
                            <Route path='/sign-up/*' element={<SignUp />} />
                            <Route path='/inventory/:item_id/*' element={<Item />} />
                            <Route path='/*' element={<Home />} /> catch all
                        </Routes>
                    </BodyContainer>
                </BrowserRouter>
            </AppContext.Provider>
        </AppWrapper>
        </>
    );
}
export default App

const AppWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 10% 90%;
  background-color: #ffffff;
  font-family: roboto;
  font-size: large;
`;

const HeaderContainer = styled.div`
grid-row: 1 / 2;
`
const BodyContainer = styled.div`
grid-row: 2 / 3;
`