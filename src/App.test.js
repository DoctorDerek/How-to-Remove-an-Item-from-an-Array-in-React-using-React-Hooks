import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import App from "./App"

// Required enzyme configuration
configure({ adapter: new Adapter() })
// enzyme-adapter-react-17 not available yet

let app
beforeEach(() => {
  // clean up between tests
  app = shallow(<App />)
})

it("Adds a new fruit to the list when clicking `Add Random Fruit`", () => {
  const initialCount = app.find("ul.fruit-list li").length
  app.find("button.add-fruit").first().simulate("click")
  expect(app.find("ul.fruit-list li").length).toEqual(initialCount + 1)
})

it("Removes a random fruit when clicking `Remove a Random Fruit` button", () => {
  const initialCount = app.find("ul.fruit-list li").length
  app.find("button.remove-random-fruit").simulate("click")
  expect(app.find("ul.fruit-list li").length).toEqual(initialCount - 1)
})

it("Removes a fruit from the list when clicking on it", () => {
  const initialCount = app.find("ul.fruit-list li").length
  app
    .find("ul.fruit-list li")
    .first()
    .find("button.remove-fruit")
    .simulate("click")
  expect(app.find("ul.fruit-list li").length).toEqual(initialCount - 1)
})

it("Removes the right fruit from the list when clicking on it", () => {
  const aFruit = app.find("ul.fruit-list li").first()
  const initialKey = aFruit.key()
  expect(
    app.find("ul.fruit-list").findWhere((n) => n.key() === initialKey).length
  ).toEqual(1)
  aFruit.find("button.remove-fruit").simulate("click")
  expect(
    app.find("ul.fruit-list").findWhere((n) => n.key() === initialKey).length
  ).toEqual(0)
})

it("Removes all of the right fruit from the list when clicking `Remove All {fruit}`", () => {
  const fruitTR = app.find("table.fruit-index tbody tr").first()
  const fruit = fruitTR.props()["fruit"]
  expect(
    app
      .find("ul.fruit-list li")
      .findWhere((n) => n.type() === "li" && n.text() === fruit).length
  ).toEqual(1)
  fruitTR.find("button.remove-all-fruit").simulate("click")
  expect(
    app
      .find("ul.fruit-list li")
      .findWhere((n) => n.type() === "li" && n.text() === fruit).length
  ).toEqual(0)
})
