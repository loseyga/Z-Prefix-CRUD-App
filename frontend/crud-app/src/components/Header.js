import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'
import { Button } from '@mui/material';

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
                    <LogoButton onClick={()=>navigate("/")}><HeaderLogo src={'../../public/inventory_logo.png'}/></LogoButton>
                    <Greeting>Welcome, {firstName}!</Greeting>
                    <Button style={buttonStyle} variant="contained" onClick={handleClickSignOut}>Sign Out</Button>
                </HeaderWrapper>
                :
                <HeaderWrapper id="Header">
                    <LogoButton onClick={()=>navigate("/")}><HeaderLogo src={'../../public/inventory_logo.png'}/></LogoButton>
                    <Greeting>Thanks for visiting!</Greeting>
                    <Button style={buttonStyle} variant="contained" onClick={()=>navigate("/sign-in")}>Sign In</Button>
                </HeaderWrapper>
            }
        </>
    )
}

const buttonStyle = {
    border: "2px solid #ffffff",
    backgroundColor: "transparent",
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