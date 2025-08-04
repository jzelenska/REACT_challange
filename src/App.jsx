
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Edit from './Pages/Edit';
import New from './Pages/New';
import Show from './Pages/Show';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <Router>
    <div className='App'>
       <Routes>
          <Route path="/products" element={<Home />} />
          <Route path="/products/edit/:id" element={<Edit />} />
          <Route path="/products/new" element={<New />} />
          <Route path="/products/show/:id" element={<Show />} />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
    </div>
  </Router> 
  );
}

export default App;


// import TodoForm from './components/Post';
// import TodoList from './components/List';