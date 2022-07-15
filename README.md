# Running the Node.js - React.js full-stack app:

## Backend
After cloning the repository, please at the first start up, cd into the backend folder and run: 

### `npm install`

Then, after every start/restart you can run in this same folder: 

### `npm start`
this will compile and run app.js. 

## Frontend
After cloning the repository, please at the first start up, cd into frontend and run 
### `npm install`

If you get an error, try running npm install --legacy-peer-deps (version compatibility issues).
Then, after every start/restart you can run in this same folder:
### `npm start`

When this is completed, you can view the application on [http://localhost:3001] in the browser!

## NOTE
1.
backend/constants.ts specifies that the server is running on port 3000 by default, but you can change it here if you wish.
If you do so, please also change the frontend/src/config.ts file so it also points to the desired port.

2.
By default, frontend/package.json specifies the frontend app's port as 3001, you can change it by setting the start script in package.json.

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
