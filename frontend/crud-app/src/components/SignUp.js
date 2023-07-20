import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import { Button, OutlinedInput, FormControl, InputLabel } from '@mui/material';

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        let temp_first_name = document.getElementById('first_name').value;
        let temp_last_name = document.getElementById('last_name').value;
        let temp_user_name = document.getElementById('user_name').value;
        let temp_password = document.getElementById('password').value;
        SignUpUser(temp_first_name, temp_last_name, temp_user_name, temp_password);
    }

    async function SignUpUser(first_name, last_name, user_name, password) {
        fetch('http://localhost:3001/users',{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "first_name": first_name, "last_name": last_name, "user_name": user_name, "password": password })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json()
                        .then(data => {throw new Error(data.error)});
                }
            })
            .then(data => {
                window.alert(data.message);
                navigate("/sign-in");
            })
            .catch(err =>{
                window.alert(err.message);
                document.getElementById("first_name").value='';
                document.getElementById("last_name").value='';
                document.getElementById("user_name").value='';
                document.getElementById("password").value='';
                navigate("/sign-up");
            })
    }

    return (
        <>
            <SignUpWrapper>
                <ImgWrapper><SignUpArt src="../../login_art.jpg" /></ImgWrapper>
                <Form>
                    <Title>Create Your Account</Title>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="first_name">First Name</InputLabel>
                        <OutlinedInput id="first_name" label="First Name"/>
                    </FormControl>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="Last_name">Last Name</InputLabel>
                        <OutlinedInput id="last_name" label="Last Name"/>
                    </FormControl>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="user_name">User Name</InputLabel>
                        <OutlinedInput id="user_name" label="User Name" />
                    </FormControl>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput id="password" label="Password" />
                    </FormControl>
                    <Button id="submitButton" style={styledButton} variant="contained" type="submit" onClick={handleSubmit}>Sign Up</Button>
                </Form>
            </SignUpWrapper>
        </>
    )
}

const styledButton = {
    border: "2px solid #ffffff",
    backgroundColor: "#0844f4",
}

const ImgWrapper = styled.div`
display: flex;
justify-content: center;
width: 60%;
height: 100%;
`
const SignUpArt = styled.img`
height: 100%;
`
const ErrorMessage = styled.div`
color: red;
margin-top: 10px;
`
const Title= styled.h1`
margin: 20px;
`
const SignUpWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
height: 100%;
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 40%;
height: 100%;
`