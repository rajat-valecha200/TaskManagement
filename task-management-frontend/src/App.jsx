import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import ProjectDetails from './Components/ProjectDetails';
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
          <Route path="/project" element={
            <PrivateRoute>
              <ProjectDetails/>
            </PrivateRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
