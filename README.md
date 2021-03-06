# Portofolio API

Portofolio API using Typescript with ECMAScript 2017 (ES8) and GraphQL

> Please be aware that this project is still on progress, i will continue to work on it gradually over time. You can check every update that i'll implement on Issues tab and Issue that i'm currently working on Project Tab.
> 
> If you're an employer who want to know my capabilities, feel free to request a feature and submit an issue.

## Requirement

* Node.js: `^10.15.0`
* NPM: `^6.4.1`
* MySQL

## Installation

* After cloning the project into your local workspace, use `npm install` to install all dependencies
* Import portofolio database on `./database` directory to local MySQL database

## Project Build
* Build the entire project by `npm run build`
* If you decide to build binary files, run `npm run binary-win` for windows or `npm run binary-linux` for linux after building the entire project

## Configuration
* Configure the application configuration by editting `.portofoliorc` files
* If you decide to create binary build, you can copy `.portofoliorc` to your binary directory and rename it to `portofolio.config.json`

## Starting the API
* Run the API on your local workspace by `npm start`
* If you using binary build, simple execute it
* Go to `localhost:5000/status` or [Click Here](http://localhost:5000/status) to check if the service has been liftoff

## Development & Debugging Run

* use `npm run dev` to build the entire project and run it on develop mode
* use `npm run debug` to build the entire project and run it on debugging mode
