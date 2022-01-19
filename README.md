# Logistics Inventory

### Project description
The goal of this project is to serve as an inventory web tracking application for a logistics company.

### Technology overview
|                          | Technology/Tool                                                                                                                                                                                                                                                                                                                       
| ------------------------ | ------------------------ 
| Frontend                 | React + Typescript + Material UI
| Backend                  | Typescript + NodeJs + Express + Tsyringe + Jest + MySQL + Sequelize

## Project Setup

Prerequisites:

- NodeJS (version 12 or above)
- Typescript
- MySQL

Setup:
1. Clone the git repository.
2. Run `npm install` in the frontend folder to install all the dependencies.
3. Run `npm install` in the backend folder to install all the dependencies.
4. Create a schema called "inventory" in your local database (eg.: using MySQL Workbench).
5. Open backend/src/main/config.js. Notice the comments to enter your credentials for your local SQL database. Enter your credentials in the sqeuelize.ts file as well.
6. Change directory into backend/src/main and run the command `npx sequelize-cli db:migrate`. This will create the necessary tables in your schema to run the project.
7. Run `npm run dev`. This will start the server on port 3000.
8. Change directory into the frontend folder and run `npm start`. It will most likely tell you that something is already running on port 3000 (the backend server) and ask if you want to run the app on another port. Press on "y".
9. The application is good to go!
10. (Optional) If desired, change directory into the backend folder and run "npm test" to run a few tests I wrote.

Note: The item collection page will not show if you do not have any items/collections created.
