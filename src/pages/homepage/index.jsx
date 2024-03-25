import Search from "../../components/search";
import Header from "../../components/header/header";
import { React, useState } from "react";
import "./style.css";
import RecipeItem from "../../components/recipeItem/recipe";

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);

  //save results that we receive from api
  const [receipes, setRecipes] = useState([]);

  //get fav state
  const [fav, setFav] = useState([]);

  const getDataFromSearch = (getData) => {
    //keep the loading state as true before we call api
    setLoadingState(true);

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=55821a029d474b59b5354db19900a958&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set loading state as false
        setLoadingState(false);
        setRecipes(results);
      }
    }

    getRecipes();
  };

  console.log(loadingState, receipes, "loading state and recipes");


  const addToFav = (getCurrentRecipeItem) =>{
    let copyFav = [...fav]; 
    
    //checking if its already present 
    const index = copyFav.findIndex(item => item.id === getCurrentRecipeItem.id);
    console.log(index, "index");

    if(index === -1){
      //if not present then add to fav
      copyFav.push(getCurrentRecipeItem);
      setFav(copyFav);

      //save fav in local storage
      localStorage.setItem("favourites", JSON.stringify(copyFav));
      
    } else{
      alert("Already added to favourites")
    }
  };

  console.log(fav, "fav");

  return (
    <div className="Homepage">
      <Header />
      <Search getDataFromSearch={getDataFromSearch} />

      {/* show laoding state */}
      {loadingState && <div className="Loading">Loading recipes...</div>}

      {/* map  show recipes */}
      <div className="items">
        {receipes && receipes.length > 0
          ? receipes.map((item) => {
              return <RecipeItem addToFav={()=>addToFav(item)} 
              id={item.id} image={item.image} title={item.title} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Homepage;