import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../App';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, OutlinedInput, FormControl, InputLabel, IconButton, InputAdornment } from '@mui/material';

export default function SignIn() {
    const { setUser, setIsVerified, setFirstName, setLastName, setUserName } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let temp_login_name = document.getElementById('user_name').value;
        let temp_password = document.getElementById('password').value;
        setLoginName(temp_login_name)
        setPassword(temp_password)
        SignInUser(temp_login_name, temp_password);
    }

    
    async function SignInUser(user_name, password) {
    fetch('http://localhost:3001/authenticate',{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user_name": user_name, "password": password })
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
            setFirstName(data[0].first_name);
            setLastName(data[0].last_name);
            setUser(Number(data[0].id));
            setUserName(data[0].user_name);
            setIsVerified(true);
            navigate("/inventory");
        })
        .catch(err =>{
            window.alert(err.message);
            document.getElementById("user_name").value='';
            document.getElementById("password").value='';
            navigate("/sign-in");
        })
    }

    return (
        <>
            <SignInWrapper>
                <Form>
                    <Title>Sign Into Your Account</Title>
                    <p>Don't have an account yet? <Link to="/sign-up">Sign Up</Link></p>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                        <InputLabel htmlFor="user_name">User Name</InputLabel>
                        <OutlinedInput
                        id="user_name"
                        endAdornment={
                            <InputAdornment position="end">
                            <AccountCircle />
                            </InputAdornment>
                            }
                            label="User Name"
                        />
                    </FormControl>
                    <FormControl sx={{ml:2, mr:2, my:1}} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button id="submitButton" style={styledButton} variant="contained" type="submit" onClick={handleSubmit}>Sign In</Button>
                </Form>
                <ContinueWrapper>
                    <Title>Just Visiting?</Title>
                    <Button id="continueButton" style={styledButton} variant="contained" type="submit" onClick={() => navigate("/inventory")}>Continue as Guest</Button>
                </ContinueWrapper>
            </SignInWrapper>
        </>
    )
}

const styledButton = {
    border: "2px solid #ffffff",
    backgroundColor: "#0844f4",
}

const Title= styled.h1`
margin: 20px;
`
const SignInWrapper = styled.div`
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
width: 60%;
height: 100%;
`
const ContinueWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 40%;
height: 100%;
background-color: #c2e6ff;
`
