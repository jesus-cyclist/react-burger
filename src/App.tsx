import React from 'react'
import './reset.css'
import './App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className="wrapper">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
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
