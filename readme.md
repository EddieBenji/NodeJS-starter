# NodeJS-starter
This project is an intent of a nodejs starter. For running this app, do the following:

## Install dependencies
After cloning this repo, run `npm i`

## Docker and Docker-compose
For running the mongodb, you need to install docker and docker-compose if you haven't already.

## Development server
In both of the following tasks, the docker-compose will start a mongodb container where all the data will be stored.

Run `npm run restart:dev:server` (so the nodemon starts listening for any change in your code)

Run `npm run restart:server` (so the node starts a server using your code)