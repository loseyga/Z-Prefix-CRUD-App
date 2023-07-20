import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'
import { Button } from '@mui/material';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function Header() {
    const { isVerified, setIsVerified, firstName, setUser, setFirstName, setLastName } = useContext(AppContext);
    const navigate = useNavigate();

    function handleClickSignOut(){
        setIsVerified(false);
        navigate("/");
        setUser('');
        setFirstName('')
        setLastName('')
        alert('You are logged out');
    }

    return (
        <>
            {isVerified ?
                <HeaderWrapper id="Header">
                    <LeftWrapper>
                        <LogoButton onClick={()=>navigate("/")}><ProductionQuantityLimitsIcon style={{fontSize: "xxx-large"}} /></LogoButton>
                        <Button id="InventoryButton" style={buttonStyle} variant="contained" onClick={()=>navigate("/Inventory")}>See Inventory</Button>
                    </LeftWrapper>
                    <Greeting>Welcome, {firstName}!</Greeting>
                    <RightWrapper>
                        <Button id="signOutButton" style={buttonStyle} variant="contained" onClick={handleClickSignOut}>Sign Out</Button>
                    </RightWrapper>
                </HeaderWrapper>
                :
                <HeaderWrapper id="Header">
                    <LeftWrapper>
                        <LogoButton onClick={()=>navigate("/")}><ProductionQuantityLimitsIcon style={{fontSize: "xxx-large"}} /></LogoButton>
                        <Button id="InventoryButton" style={buttonStyle} variant="contained" onClick={()=>navigate("/Inventory")}>See Inventory</Button>
                    </LeftWrapper>
                    <Greeting>Thanks for visiting!</Greeting>
                    <RightWrapper>
                        <Button id="signInButton" style={buttonStyle} variant="contained" onClick={()=>navigate("/sign-in")}>Sign In</Button>
                    </RightWrapper>
                </HeaderWrapper>
            }
        </>
    )
}

const buttonStyle = {
    border: "2px solid #ffffff",
    backgroundColor: "transparent",
    margin: "20px",
}

const HeaderWrapper = styled.div`
background-color: #0844f4;
height: 100%;
width: 90%;
padding-left: 5%;
padding-right: 5%;

display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: center;
font-size: large;
`
const LeftWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
flex-wrap: nowrap;
width: 25%;
`
const RightWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
flex-wrap: nowrap;
width: 25%;
`
const Greeting = styled.div`
width: fit-content;
font-size: xx-large;
color: #ffffff;
`
const HeaderLogo = styled.img`
display: inline;
margin: 0 auto;
height: 100%;
width: auto;
`
const LogoButton = styled.button`
border: 2px solid #ffffff;
border-radius: 50%;
background-color: #c2e6ff;
position: relative;
overflow: hidden;
height: 75px;
width: 75px;
`