import React, { useState } from "react"
import "./styles.css"

// In this example, we have 8 fruit emoji that we will choose from:
const FRUIT_EMOJI = ["🍌", "🍉", "🍓", "🥝", "🍍", "🍑", "🥭", "🍒"]

// Initial state is an array with [fruit, key] for each fruit, so we need
// to generate a random key for each fruit in the list. That's because you
// shouldn't use index as the React key prop for dynamic lists of items.
const initialFruitsWithKeys = FRUIT_EMOJI.map((fruit) => [fruit, Math.random()])

const App = () => {
  const [fruits, setFruits] = useState(initialFruitsWithKeys)

  const addFruit = () => {
    // Add a random fruit to React State using the useState hook
    const randomIndex = Math.floor(Math.random() * FRUIT_EMOJI.length)
    const randomFruit = FRUIT_EMOJI[randomIndex]
    const randomFruitWithKey = [randomFruit, Math.random()]
    setFruits((fruits) => [...fruits, randomFruitWithKey])
  }

  // Remove a single fruit by looking it up in React State by its unique key.
  const removeFruit = (targetKey) => {
    setFruits((fruits) => fruits.filter(([fruit, key]) => key !== targetKey))
  }
  // For large sets of data, you'd want to use a different data structure,
  // like the ES6 Map class, since what we really have here is a "hash map";
  // the .filter() method will have worse performance for looking up items.

  // Remove all of a fruit by filtering the React State by fruit and not key.
  const removeAllOfThisFruit = (targetFruit) => {
    setFruits((fruits) =>
      fruits.filter(([fruit, key]) => fruit !== targetFruit)
    )
  }

  // Remove a fruit from the array in React state at random
  const removeRandomFruit = () => {
    const randomIndex = Math.random() * fruits.length
    // Make a working copy of the array in React State:
    const newFruits = Array.from(fruits)
    // Remove one fruit at the selected random index:
    newFruits.splice(randomIndex, 1)
    // Update React state using the useState hook:
    setFruits((fruits) => newFruits)

    // Alternative approach that would work the same:
    /**
     * setFruits((fruits) => {
     *   fruits.splice(randomIndex, 1)
     *   return fruits
     * })
     **/
    // This would work because the callback function passed to
    // the useState hook gives us a working copy we can modify.
  }

  return (
    <div className="App">
      <h1>How to Remove an Item from an Array in React State using Hooks</h1>
      <h2>Current Fruit List</h2>
      <button className="add-fruit" onClick={() => addFruit()}>
        Add a Random Fruit
      </button>{" "}
      <button
        className="remove-random-fruit"
        onClick={() => removeRandomFruit()}
      >
        Remove a Random Fruit
      </button>
      <ul className="fruit-list">
        <h3>Click any fruit to remove it</h3>
        {fruits.map(([fruit, key]) => (
          <li key={key}>
            <button className="remove-fruit" onClick={() => removeFruit(key)}>
              {fruit}
            </button>
          </li>
        ))}
      </ul>
      <h2>Fruits Index & Counts</h2>
      <table className="fruit-index">
        <tbody>
          {FRUIT_EMOJI.map((fruit) => (
            <tr key={Math.random()} fruit={fruit}>
              <td>
                <strong>
                  {
                    fruits.filter(
                      ([fruitInState, key]) => fruitInState === fruit
                    ).length
                  }{" "}
                </strong>
                {fruit}
              </td>
              <td>
                <button
                  className="remove-all-fruit"
                  onClick={() => removeAllOfThisFruit(fruit)}
                >
                  Remove All {fruit}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
