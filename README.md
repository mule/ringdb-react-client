### Just something I use for React practice
Small react spa app that allows user to browse decklist and hero card data from https://ringsdb.com using public API described here https://digital.ringsdb.com/api/doc.


### How to run the app
npm install
npm start

The app will need a .env file to be present but there should be .env.development file included in the repo. Anyways it needs to be like this:

REACT_APP_ENV=development
REACT_APP_API_URL=http://digital.ringsdb.com/api

### How to run tests

npx playwright test








