# Depop Exploring
This is a simple refreshing explore feed for the Depop office.

## Setup
Because the endpoint I'm using to get the explore feed isn't set up for CORS, I'm using JSONP to get the data. That means you probably won't be able to deploy this anywhere; you'll have to run it locally.

1. `npm install`
2. `npm start`

## Todo
- Refactor the refreshing code
- Use a proper explore endpoint and paginate
- Get off of JSONP so it can be deployed
