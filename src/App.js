import AuthForm from './AuthForm';
import RegForm from './RegForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/registration" element={<RegForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
