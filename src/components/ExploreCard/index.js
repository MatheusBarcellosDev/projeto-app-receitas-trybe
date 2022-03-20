import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyContext';
import './styles.css';

export default function ExploreCard({ index, name, src, type }) {
  const { setIngredient } = useContext(MyContext);
  const route = type === 'foods' ? '/foods' : '/drinks';
  const color = ['#373B45', '#F2AA6B', '#734E40', '#F27B50', '#A69F7C'];

  const LIMIT_NUMBER = 5;

  const sortColor = () => {
    const random = Math.floor(Math.random() * LIMIT_NUMBER);
    return color[random];
  };

  const formatName = name.trim().split(' ')[0];

  return (

    <div className="container__exploreIngredients">
      <Link
        className="link__exploreIngredients"
        onClick={ () => setIngredient({
          type,
          title: name,
        }) }
        to={ route }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
          className="cardIngredients__img"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ src }
            alt="imagem"
          />
        </div>
        <div
          style={ { backgroundColor: sortColor() } }
          className="cardIngredients__name"
        >
          <p
            data-testid={ `${index}-card-name` }
          >
            {formatName}
          </p>
        </div>
      </Link>
    </div>

  );
}

ExploreCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
