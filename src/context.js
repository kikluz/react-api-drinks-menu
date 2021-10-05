import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  // search term, think about form so in form typing somethig and grab the value
  // and add to fetch, fetting differnts values when typing
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      // here get me the url but seems im looking for the name so I hev to have the parameter on the url 
      // so get the parameter setSearchTerm 
      // in the useEffect will refetch the new drinks that match  the setSearchTerm that comming from the inputs
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      const { drinks } = data;
      console.log(data)
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions } = item;
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass, instructions: strInstructions }
        })
        setCocktails(newCocktails)
      }
      else {
        setCocktails([])
      }
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }, [searchTerm])
  // we fetchDrinks where the value will changes
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks])

  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>
    {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
