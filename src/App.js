import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ExpensePage from './pages/expense';
import Auth from "./pages/auth"
import { RecoilRoot } from 'recoil';

function PrivateRoute({ Component }) {
  const userJWT = localStorage.getItem('userJWT');

  if (!userJWT) {
    return <Navigate to="/" />; // Redirect to Auth if not authenticated
  }
  console.log("going to expenses page")
  return <Component />; // Render the protected component if authenticated
}


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <Auth /> */}
        <RecoilRoot>
          <Routes>
            {/* Protected Route for ExpensePage */}
            <Route
              path="/expenses"
              element={<PrivateRoute Component={ExpensePage}/>}
            />
            
            {/* Public Route for Auth */}
            <Route path="/" element={<Auth />} />
            
            {/* Any unmatched route redirects to Auth */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </RecoilRoot>
      </div>
    </BrowserRouter>
    // <RecoilRoot>
    //   <ExpensePage />
    // </RecoilRoot>
    
  );
}

export default App;
