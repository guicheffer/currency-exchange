# 💰 [Currency Exchange Mini-App](http://currency-exchange.guicheffer.me/)

This is a mini app playground to display currency exchange in React + Redux + Redux-Saga and TypeScript.

- [The Demo version here](http://currency-exchange.guicheffer.me/)
- [The Proxy Api](http://currency-exchange-api.guicheffer.me/)
- [The Real Fake Dummy Weird Api](http://currency-exchange-fake-api.guicheffer.me/BTC)

<!-- TODO: Insert .gif here -->

## Available Scripts

In the project directory, you might run:

### `make start`

Runs the app in the development mode. 🔥<br />
Make sure you manually open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `make production` || `make serve`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

**ps**. Remember you can also use production's URL directly [here](http://currency-exchange.guicheffer.me/).

### `make test-stuff`

Launches the test runner in the interactive watch mode.

### `make i` | `make install`

Install dependencies from yarn's package.json.

### `make help`

Please execute that in order to be aware of what commands you might be able to run.

## Preview

### Balance increment
(...)

## Ideas on how to improve

- [ ] **UX** <br/>
  - I understand there's a big bug around converting from BTC to another currency;
    - This could have been handled in another time but as I didn't want to spend a long time on ther exercise I preferred to keep it simple!
- [ ] **Acessibility** <br/>
  - This application is not very acessible since I did not want to spend a lot of time improving it since I assumed my architecture skills should be taken into account more than reckon with accessibility related stuff.
- [ ] **Architectural** <br/>
  - Many things here could have been improved such as folder structures, api calls, error handling, logs, etc;
  - I think we should review peer dependencies on packages.json - we could use some sort of `Dependabot` in order to make it able to recognize security updates (even GitHub) could do that for us.
- [ ] **Performance** <br/>
  I believe there's a lot of space for performance here
- [ ] **Reusable Code** <br/>
  - I'm not very prod of the usage of styles module across the application, this could have been better refactored in order to reuse cascades and their childs in different parts of components containers.
  - I could add a [Storybook](https://storybook.js.org/) here in order to re-use components for instance the amount input or even the select box for a real world app.

## Learn More

Visit my page on the web: [guicheffer.me](http://guicheffer.me)
