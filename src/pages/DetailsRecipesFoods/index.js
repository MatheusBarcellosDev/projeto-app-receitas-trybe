import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Details from '../../components/Details';
import Recomendation from '../../components/Recomendation';
import doneRecipes from '../../services/others/doneRecipesInLocalStorage';
import { fetchFoodById,
  fetchForDrinkRecommendations } from '../../services/foods/fetchApiFood';
import getmeasureAndIngredients from '../../services/others/measureAndIngredients';
import recipesInProgress from '../../services/others/recipesInProgress';
import './styles.css';

const TYPE = 'meals';

function DetailsRecipesFoods() {
  const [useFoods, setUseFoods] = useState([]);
  const [useMeasureAndIngredients, setUseMeasureAndIngredients] = useState([]);
  const [useRecommended, setUseRecommended] = useState([]);
  const [useCopyVisible, setUseCopyVisible] = useState(false);
  const [done, setDone] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const { id } = useParams();
  const { pathname } = useLocation();
  const NUMBER_RECOMMENDED = 6;

  async function getDetailsRecipesFoods() {
    const response = await fetchFoodById(id);
    if (response) {
      setUseFoods(response.meals);
    }
  }

  async function getDetailsRecipesRecomendationDrinks() {
    const response = await fetchForDrinkRecommendations();
    response.drinks.splice(NUMBER_RECOMMENDED);
    setUseRecommended(response.drinks);
  }

  const CopyLocationClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setUseCopyVisible(true);
  };

  useEffect(() => {
    if (useFoods[0] !== undefined) {
      setUseMeasureAndIngredients(getmeasureAndIngredients(useFoods[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useFoods]);

  useEffect(() => {
    getDetailsRecipesFoods();
    getDetailsRecipesRecomendationDrinks();
    setDone(doneRecipes.get());
    setInProgress(recipesInProgress.getAllFromType(TYPE));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {useFoods[0] !== undefined
      && <Details
        src={ useFoods[0].strMealThumb }
        title={ useFoods[0].strMeal }
        category={ useFoods[0].strCategory }
        nationality={ useFoods[0].strArea }
        id={ useFoods[0].idMeal }
        instructions={ useFoods[0].strInstructions }
        measureAndIngredients={ useMeasureAndIngredients }
        video={ useFoods[0].strYoutube }
        copyUrl={ CopyLocationClipboard }
        copyVisible={ useCopyVisible }
        pathname={ pathname }
        type="food"
        recipesInProgressfromType={ inProgress }
        recipesDone={ done }
      />}
      <div className="container__recomendation">
        <div className="teste">
          {useFoods[0] !== undefined
        && useRecommended.map((recomendation, index) => (
          <div
            key={ index }
            className="card__recomendation"

          >
            <Recomendation
              src={ recomendation.strDrinkThumb }
              title={ recomendation.strDrink }
              id={ index }
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsRecipesFoods;
