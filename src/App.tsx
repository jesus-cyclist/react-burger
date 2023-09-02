import React, { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import ModalOverlay from './components/ModalOverlay/ModalOverlay'
import { request } from './utils/request'

function App() {
  const [ingredientsApiData, setIngredientsApiData] = useState('')
  const [clickedElement, setClickedElement] = useState('')

  useEffect(() => {
    request(setIngredientsApiData)
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      e.key === 'Escape' && setClickedElement('')
    })
    return () => {
      document.removeEventListener('keyup', (e) => {
        e.key === 'Escape' && setClickedElement('')
      })
    }
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <div className="wrapper">
        <main className="main">
          {ingredientsApiData.length === 0 ? (
            <h2>loading</h2>
          ) : (
            <>
              <BurgerIngredients
                ingredientsApiData={ingredientsApiData}
                setClickedElement={setClickedElement}
              />
              <BurgerConstructor
                ingredientsApiData={ingredientsApiData}
                setClickedElement={setClickedElement}
              />
            </>
          )}

          {clickedElement && (
            <ModalOverlay
              clickedElement={clickedElement}
              setClickedElement={setClickedElement}
            />
          )}
        </main>
      </div>
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  )
}

export default App
