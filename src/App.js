import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {
  
  //API ID and KEY required to make authenticated and verified queries
  const APP_ID = '975eb510';
  const APP_KEY = '3fd5ce701d54aca41a85f9e7170dc191';

  
  const [recipes, setRecipes] = useState([]);//This state will hold the array of recipe objects retrieved from the query
  const [search, setSearch] = useState(""); //This is the state for the search bar
  const [query, setQuery] = useState('chicken'); //This is the default state for the search

  //This will generate the actual queries and return JSON formatted response. The recipes state will then be set to an array of JSON objects
  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    };
  
  //This will update the search value when the user is typing through the onChange EventListener
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  //This will change the query state to whatever the new search value is and reset search to empty
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  //React Lifecylce method to only rerender when the query value changes. This will only happen upon form submit
  useEffect(() => {
    getRecipes();
    console.log("Refreshed");
  }, [query]);

  

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type = "submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
      <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients}/>))}
      </div>
    </div>
  );
}

export default App;
