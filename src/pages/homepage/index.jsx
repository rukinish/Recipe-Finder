import Search from "../../components/search";
import Header from "../../components/header/header";
import { React, useEffect, useState, useReducer } from "react";
import "./style.css";
import RecipeItem from "../../components/recipeItem/recipe";
import FavItem from "../../components/FavItem/FavItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavourites":
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);

  //save results that we receive from api
  const [receipes, setRecipes] = useState([]);

  //get fav state
  const [fav, setFav] = useState([]);

  //state for api is success or not
  const [apiCalledSuccess, setapiCalledSuccess] = useState(false);

  //use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState);

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
        setapiCalledSuccess(true);
      }
    }

    getRecipes();
  };

  console.log(loadingState, receipes, "loading state and recipes");

  const addToFav = (getCurrentRecipeItem) => {
    let copyFav = [...fav];

    //checking if its already present
    const index = copyFav.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    console.log(index, "index");

    if (index === -1) {
      //if not present then add to fav
      copyFav.push(getCurrentRecipeItem);
      setFav(copyFav);

      //save fav in local storage
      localStorage.setItem("favourites", JSON.stringify(copyFav));
    } else {
      alert("Already added to favourites");
    }
  };

  //remove fav
  const removeFromFav = (getCurrentId) => {
    let copyFav = [...fav];
    copyFav = copyFav.filter((item) => item.id !== getCurrentId);

    setFav(copyFav);
    localStorage.setItem("favourites", JSON.stringify(copyFav));
  };

  //user h0ok get data from local storage
  useEffect(() => {
    const extractFavFromLocal =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFav(extractFavFromLocal);
  }, []);

  const filteredFavItem = fav.filter((item) => 
  item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  return (
    <div className="Homepage">
      <Header />
      <Search
        getDataFromSearch={getDataFromSearch}
        apiCalledSuccess={apiCalledSuccess}
        setapiCalledSuccess={setapiCalledSuccess}
      />
      {/* fav search bar */}
      <div className="search-fav">
        <input
          onChange={(event) =>
            dispatch({ type: "filterFavourites", value: event.target.value })
          }
          value={filteredState.filteredValue}
          name="searchfav"
          placeholder="search favourites"
        />
      </div>
      {/* show fav */}
      <div className="fav-wrapper">
        <h1>Favourites</h1>
        <div className="favs">
          {filteredFavItem && filteredFavItem.length > 0
            ? filteredFavItem.map((item) => {
                return (
                  <FavItem
                    removeFromFav={() => removeFromFav(item.id)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                  />
                );
              })
            : null}
        </div>
      </div>

      {/* show laoding state */}
      {loadingState && <div className="Loading">Loading recipes...</div>}

      {/* map  show recipes */}
      <div className="items">
        {receipes && receipes.length > 0
          ? receipes.map((item) => {
              return (
                <RecipeItem
                  addToFav={() => addToFav(item)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Homepage;
