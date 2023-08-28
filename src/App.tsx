import React from 'react'
import './styles/reset.css'
import './styles/App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <div className="wrapper">
        <main className="main">
          <BurgerIngredients />
          <BurgerConstructor />
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
