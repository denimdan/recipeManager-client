import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Recipes from './components/RecipeCards';
import AddRecipe from './components/AddRecipe';
import Home from './components/Home';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/recipes' component={Recipes} />
        <Route path='/add' component={AddRecipe} />
        <Route path='/edit' component={EditRecipe} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
