import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_BACKEND_BASE_URL+'/auth/login'
        const requestConfig = {
            url: url,
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.request(requestConfig);
            console.log("Login response - ",response.data.token)
            localStorage.setItem("userJWT", response.data.token)
            navigate("/expenses");
        } catch (error) {
            if("message" in error.response.data) {
                alert(error.response.data.message)
            }
            else {
                alert(error.response.data.error[0].message);
            }
        }
    }

    return (
        <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Login</Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    </Box>
    )
}

export default Login