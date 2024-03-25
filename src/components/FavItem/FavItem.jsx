import "./FavItem.css";

const FavItem = (props) => {
  const { id, image, title } = props;

  return (
    <div key={id} className="fav-item">
      <div>
        <img className="recipe-image" src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button type="button">
        Remove from favourites
      </button>
    </div>
  );
};

export default FavItem;
