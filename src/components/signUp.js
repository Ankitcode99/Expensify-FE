
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_BACKEND_BASE_URL+'/auth/signup'
        
        axios({url: url, method:'POST', data:{
            email: email,
            password: password
        }}).then((response) => {
            console.log("Success", response)
            alert("Signed up successfully, you can proceed to login!")
            setEmail('')
            setPassword('')
          }).catch((error) => {
            if("message" in error.response.data) {
                alert(error.response.data.message)
            }
            else {
                alert(error.response.data.error[0].message);
            }
            return
          })
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Sign Up</Typography>
            <form onSubmit={handleSignupSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    value={email} // Reuse email state for simplicity, adjust for separate signup fields if needed
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password} // Reuse password state for simplicity, adjust for separate signup fields if needed
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                {/* Add more signup form fields here */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
        </Box>
    )
}

export default SignUp