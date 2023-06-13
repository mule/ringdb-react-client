### Yet another ringsdb client

Small react spa app that allows user to browse decklist and hero card data from https://ringsdb.com using public API described here https://digital.ringsdb.com/api/doc.

The app tries to implement the design described here https://www.figma.com/file/mg1loDP3Z7XjfF6fC60CL3/RingsDB-Wireframe?type=design&node-id=0-1


### How to run the app
npm install
npm start

The app will need a .env file to be present but there should be .env.development file included in the repo. Anyways it needs to be like this:

REACT_APP_ENV=development
REACT_APP_API_URL=http://digital.ringsdb.com/api

### How to run tests

npx playwright test



#### Notes to reviewers

So as you might have already guessed that this is my solution to OPTION 1 of your programming assignment. :-D

I liked the assignment and enjoyed coding it. But as you might see from the commits and the backlog I spent more than the recommended 2-3 hours implementing it. Even then I had to cut it short somewhat. The HeroCardDetails component only some of the card details. I figured it's getting close enough so I might as well add you guys to the project at this point.

I had some additional goals of my own for this project:

- Learn how to use githubs projects and CI pipeline better.It's always azure devops at work :-( so I wanted to more experience with it.

- Learn playwright (I've heard good things about it).

- Learn react-query

- Brush up on my react skills. I'm no "React Wiz kid" I must admit but I've used it ever since the beginning of it.

But anyways with these additional goals. Things took somewhat longer than the expected time.

Here is the "backlog" for the app if you want to see how the work progressed.

https://github.com/users/mule/projects/1

### Implementation challenges

- The instructions talk about deck's id but in the API the deck endpoint is not public but the decklist is. So I boldly assumed that it is the decklist endpoint that we want to use.

- CORS headers headache. Somehow when hitting an id that is not there or causes some error the CORS header is different. I couldn't get 404 or some other status because the call was blocked. Hate that CORS stuff, I always struggle with it.

- Flaky tests. Generally Playwright tests worked locally except the firefox tests started failing. I don't whats that about. I'll look into it later. 

- Tests working locally but not in the CI-pipeline. Have look into those later too.

- Learning curve for react-query and playwright


Thats about it. Thanks for reading. :-)






