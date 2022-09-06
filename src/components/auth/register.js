import React , {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material';
import Container from '@mui/material/Container';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(email, password)
        try {
            const result = await axios.post('/api/register', {email,password});
            console.log(result);
            localStorage.setItem("react-app-token", result.data.token);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container maxWidth="md">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <TextField onChange={(e)=>{setEmail(e.target.value)}} fullWidth margin="dense" id="outlined-basic" label="Email" variant="outlined" />
                    <TextField onChange={(e)=>{setPassword(e.target.value)}}  fullWidth margin="dense" id="outlined-basic1" label="password" variant="outlined" />
                    <Button type="submit" variant="contained">contained</Button>
                </form>
            </Container>

        </>
    )
}

export default Register