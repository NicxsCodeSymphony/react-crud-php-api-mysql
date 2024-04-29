import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CreateUser from './components/CreateUser';
import ListUser from './components/ListUser';
import EditUser from './components/EditUser';
import Photo from './components/Photo';

function App() {
  return (
    <div className="App">
      <h5>React Crud operations using PHP API and MySQL</h5>
     <Router>
      <nav>
        <ul>
          <li><Link to="/">List User</Link></li>
          <li><Link to="user/create">Create User</Link></li>
        </ul>
      </nav>
      <Route exact path="/" component={ListUser} />
      <Route path="/user/create" component={CreateUser} />
      <Route path="/react/:id/edit" component={EditUser} />
      <Route path="/photo" component={Photo} />
     </Router>
    </div>
  );
}

export default App;
