import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import PrivateRoute from './PrivateRoute';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
