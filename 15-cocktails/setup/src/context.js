import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fecthDrinks = async () => {
    setLoading(true);
    // 1. loading 변수의 상태를 변경
    try {
      const response = await fetch(`${url}`);
      // 뒤에 ${searchTerm}이 붙은 이유는 무엇인가??
      const data = await response.json();
      const { drinks } = data;
      // 선언의 위치 사용법
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthDrinks();
  }, []);

  return (
    <AppContext.Provider value={{ loading, cocktails }}>
      {/* 왜 여기서 searchTerm만 setserchTerm까지 추가했는가? */}
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
