The Exchange application provides a convenient way to exchange currency among EUR, GBP, USD currencies.

[Live Demo](https://currency-exchanger.netlify.app/ "Exchange App")

![Demo of the app](/docs/app_demo.gif?raw=true "Exchange App")

## Design decisions 

* **_State management_** : The application state is managed using context providers and useReducer()
* **_Design pattern_** : The providers, reducers and hooks are organised based on design patterns suggested in these blogs ([1](https://kentcdodds.com/blog/application-state-management-with-react), [2](https://kentcdodds.com/blog/how-to-use-react-context-effectively))
* **_Testing_** : Usecases are covered using integration tests and unit tests. Jest and react-testing-library are the main libraries used for testing
* **_Component library_** : Components and Grid system of [material-ui](https://material-ui.com/) is used
* **_Component styling_** : CSS-in-JS solution of material-ui is used
* **_Typing_** : The project uses TypeScript
* **_Linting & Formatting_** : Uses the default ESLint config of CRA. Prettier for code formatting. husky and lint-staged are used as auxiliary library

## Test cases snapshot

![Screenshot of Test cases](/docs/testcases.png)

## Further improvements
* E2E test cases can be added using Cypress ot TestCafe
* Additional features like switching to dark mode can be added

