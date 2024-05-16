import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material';
import Login from '../components/login';
import SignUp from '../components/signUp';



function Auth() {
    const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Signup

    const handleTabChange = (event, newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    return (
        <div className='auth-page'>
            <div className='app-name'>
                <h2>Expensify</h2>
            </div>
            <Box sx={{ width: '30%', mx: 'auto'}} className='auth-card'>
                <Tabs value={activeTab} onChange={handleTabChange} fullWidth>
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
                {activeTab === 0 && ( // Content for Login tab
                    <Login />
                )}
                {activeTab === 1 && ( // Content for Signup tab
                    <SignUp />
                )}
            </Box>
        </div>
    );
}

export default Auth