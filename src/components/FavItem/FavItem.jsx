import "./FavItem.css";

const FavItem = (props) => {
  const { id, image, title, removeFromFav } = props;

  return (
    <div key={id} className="fav-item">
      <div>
        <img className="recipe-image" src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFromFav}>
        Remove from favourites
      </button>
    </div>
  );
};

export default FavItem;
