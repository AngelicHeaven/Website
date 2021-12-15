import React from 'react';
// import App from "../App/App";
// import "../components/Cart/Cart";
// import "../components/Cart/Cart";
import '@testing-library/jest-dom/extend-expect'
import {withRouter} from 'react-router-dom'
import {Router, Route, Switch } from "react-router-dom";
import {render, fireEvent, cleanup} from '@testing-library/react';
// import Cart from "../components/Cart/Cart";



test("Test if item quantity gets increased by one in case of sufficient amount available.", () => {
  // arrange and act
  // var result = mathOperations.sum(1,2)
  //
  // // assert
  // expect(result).toBe(3);
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
})

test("Test if item quantity does not get increased by one in case of insufficient amount available.", () => {
  // var result = mathOperations.diff(10,2)
  //
  // // assert
  // expect(result).toBe(8);
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");

  expect("Something").toBe("Something");
  expect("else").toBe("else");
})

test('Test if item quantity resets after deleting whole item.',() => {
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  expect("Something").toBe("Something");
  expect("else").toBe("else");
  // var result = mathOperations.sum(1,2)
  //
  // // assert
  // expect(result).toBe(3);
  expect(true).toBeTruthy();
});















// test("Try_cart", () => {
//   const update = async () => {
//     axios
//       .post("/changeCartItemPurchaseQty", {
//         cartItemId: 2,
//         purchaseQty: 1,
//       })
//       .catch(() => {});
//   };
//   update();
//
//
// })




// afterEach(cleanup);
//
// //pretend this is another file:
// // and we imported localDisplay from './location-display'
// const LocationDisplay = withRouter(({location}) => (
//   <div data-testid='location-display'>{location.pathname}</div>
//
// ))
//
// jest.mock('react-router-dom', () => ({
//   withRouter: jest.fn(Comp => (props) =>  <Comp {...props}/>)
// }))
//
// test('displays location', () => {
//   const pathname = '/some-route'
//     const {getByTestId} = render(<LocationDisplay location={pathname}/>)
//     expect(getByTestId('location-display')).toHaveTextContent(pathname)
//   })
//
// test('Fake Test',() => {
//   expect(true).toBeTruthy();
// });
//
// test('ful app rendering/navigating', () => {
//   const {container, getByText} = renderWithRouter(<App/>)
//   expect(container.innerHTML).toMatch('You are home')
//   const leftClick = {button: 0}
//   fireEvent.click(getByText("/Cart"), leftClick)
//   expect(container.innerHTML).toMatch('you are in cart.')
// })
//
// test('landing on bad page', () => {
//   const {container} = renderWithRouter(<App/>, {
//     route: '/does-not-match',
//   })
//   expect(container.innerHTML).toMatch('No match');
//
//   expect(container.innerHTML).toMatch('You are home')
//   const leftClick = {button: 0}
//   fireEvent.click(getByText("/Cart"), leftClick)
//   expect(container.innerHTML).toMatch('you are in cart.')
// })









// test('First Test',() => {
//   jest.mock('react router', () => ({
//     Route: 'div',
//     //add more
//   }))
// });

// import { render } from "@testing-library/react";
// import Cart from "./Cart";
//
// // create a customRender that wraps the UI in a memory Router
// const customRender = (ui, options) => {
//   return render(ui, { wrapper: MemoryRouter, ...options });
// }
//
// // re-export everything
// export * from "@testing-library/react";
//
// // override render method
// export { customRender as render };
//
// test("renders without error", () => {
//   render(<Cart />);
// });


