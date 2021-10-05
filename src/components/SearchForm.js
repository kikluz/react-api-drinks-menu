import React from 'react'
import { useGlobalContext } from '../context'
import { useEffect, useRef } from 'react'


// setSearchTerm so everytime I type invoke the fucntion  will pass the value that comming from the value
const SearchForm = () => {
  // we are looking for the setSearchTerm (destructure )that is comming from the useGlobalContext
  const { setSearchTerm } = useGlobalContext()
  const searchValue = useRef('')

  // add useEffect 
  useEffect(() => {
    searchValue.current.focus()
  }, [])

  // this function acces the searchValue wnen it come the useRef
  const searchCocktail = () => {
    // call the fucntion setSearchTerm and pass the searchValue which is the current and the value 
    setSearchTerm(searchValue.current.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
