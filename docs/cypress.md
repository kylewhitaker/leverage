# Cypress

## Install

- create `e2e` folder workspace
- `yarn add -W -D cypress`
- `yarn cypress open`

## Configuration

- Typescript

  - Add `cypress/tsconfig.json` file
    ```json
    {
      "compilerOptions": {
        "strict": true,
        "baseUrl": "../node_modules",
        "target": "es5",
        "lib": ["es5", "dom"],
        "types": ["cypress", "node"]
      },
      "include": ["**/*.ts"]
    }
    ```
  - Configure Typescript Webpack Preprocessor

    - Install `yarn add -W -D @cypress/webpack-preprocessor webpack ts-loader`
      - Verify `yarn start` still works. Create React App (CRA) requires a specific version of Webpack. If it fails, install the specific version (ex: 4.42.0) of webpack needed for CRA with `yarn add -W -D webpack@4.42.0`
    - Create file `cypress/plugins/cypress-typescript-preprocessor.js`

      ```js
      /**
       * Typescript configuration for Cypress with Webpack
       * @source https://github.com/cypress-io/add-cypress-custom-command-in-typescript/blob/master/cypress/plugins/cy-ts-preprocessor.js
       */

      const wp = require('@cypress/webpack-preprocessor');

      const webpackOptions = {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
            },
          ],
        },
      };

      const options = {
        webpackOptions,
      };

      module.exports = wp(options);
      ```

    - Add to file `cypress/plugins/index.js`

      ```js
      const cypressTypescriptPreprocessor = require('./cypress-typescript-preprocessor');

      module.exports = (on, config) => {
        on('file:preprocessor', cypressTypescriptPreprocessor);
      };
      ```

- Cypress Customization

  - Add to root `cypress.json` file

    ```json
    {
      "baseUrl": "http://localhost:3000",
      "video": false
    }
    ```

  - Add custom commands boilerplate to `cypress/support/commands.ts`

    ```ts
    // ================================================================================================
    //  Cypress.Chainable Typescript Declaration
    // ================================================================================================

    declare namespace Cypress {
      interface Chainable {
        login: typeof login;
      }
    }

    // ================================================================================================
    //  Add new Cypress commands
    // ================================================================================================

    Cypress.Commands.add('login', login);

    // ================================================================================================
    //  Define functions (with JSDoc details) for Cypress commands added
    // ================================================================================================

    /**
     * Log in to application
     */
    function login(): Cypress.Chainable {
      return cy.visit('/');
    }
    ```

  - Enable access to environment variables in `cypress/plugins/index.js`

    ```js
    require('dotenv').config();

    module.exports = (on, config) => {
      config.env = { ...config.env, ...process.env };
      return config;
    };
    ```

## Test Execution

All tests reside in the `cypress/integration` folder.

- Open Cypress GUI. Manually select/execute tests. Observe test execution in a browser.
  - `yarn run cypress open`
- Run tests headless in terminal.
  - `yarn run cypress run`

Verify Typescript & custom configuration works by adding a sample test `cypress/integration/test.ts`

```ts
describe('test', () => {
  it('passes', () => {
    cy.login();
  });
});
```

## References

- [Cypress](https://www.cypress.io/)
- [Typescript Configuration](https://docs.cypress.io/guides/tooling/typescript-support.html)
- [Cypress Configuration](https://docs.cypress.io/guides/references/configuration.html)
