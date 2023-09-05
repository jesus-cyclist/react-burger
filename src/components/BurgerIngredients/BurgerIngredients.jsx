import React from 'react'
import style from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'
import PropTypes from 'prop-types'

const BurgerIngredients = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

  if (!ingredientsApiData) {
    return <h2>Loading</h2>
  }

  return (
    <div className={style.column}>
      <div className={style.title}>
        <h2>Соберите бургер</h2>
      </div>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList
          ingredientsApiData={ingredientsApiData}
          openModal={openModal}
          closeModal={closeModal}
        />
      </nav>
    </div>
  )
}

//здесь крашится, когда до этого было в useState "" и проп тайпс стринг то все работало а с нул не хочет
// BurgerIngredients.propTypes = {
//   ingredientsApiData: PropTypes.oneOfType([
//     PropTypes.bool,
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         proteins: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         carbohydrates: PropTypes.number.isRequired,
//         calories: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         image_mobile: PropTypes.string.isRequired,
//         image_large: PropTypes.string.isRequired,
//         __v: PropTypes.number.isRequired,
//       })
//     ),
//   ]).isRequired,
//   openModal: PropTypes.func.isRequired,
//   closeModal: PropTypes.func.isRequired,
// }

export default BurgerIngredients
