import "./recipe.css";

const RecipeItem = (props) => {
  const { id, image, title, addToFav } = props;

  return (
    <div key={id} className="recipe-item">
      <div>
        <img className="recipe-image" src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFav}>add to favourites</button>
    </div>
  );
};

export default RecipeItem;
