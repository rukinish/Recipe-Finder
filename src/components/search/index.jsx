import React, {useState} from 'react'
import './style.css'

const Search = (props)=> {

  const {getDataFromSearch} = props;

  const [inputValue, setInputValue] = useState('')

  const handleInputVal = (event) => {
    const {value} = event.target;

    //set the updated state
    setInputValue(value)
  }

  console.log(inputValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearch(inputValue);
    console.log('form submitted');
  }


  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='Search'>
        <input name="search" onChange={handleInputVal} value={inputValue} placeholder="Search Recipes" id="search"/>
        <img src="https://img.icons8.com/ios/50/E36397/search--v1.png" alt="search"/>
        <button type="submit">Search</button>
    </form>
    </div>
  )
}

export default Search
