# capstone-project-3900-w14b-three-days-to-see
## Installation of prerequisite environments and packages
  
  
  

## Getting Start for front-end
### Backend

If you are in not in CSE Vlab environment, please go to https://www.python.org/downloads/ and peoperly install the 3.7.8 version python3 if needed. If your are in CSE Vlab envirnoment, then change to the directory `capstone-project-3900-w14b-three-days-to-see`

Run `$ cd backend`

and run command below after you successfully install the required packages:

Run `$ python3 -m pip install -r requirements.txt`

Therefore packages will be successfully installed.
  
### Frontend

If your are not in CSE Vlab environment, please go to https://nodejs.org/en/download/ and download the lastest version of node.js. Therefore, user can use Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system. **Please notice that the latest version of node.js is always the best option.**

If you are in CSE Vlab environment, then change to the directory of `capstone-project-3900-w14b-three-days-to-see` to prepare the environment of frontend. And the next step, run the command

Run `$ cd frontend`

`$ yarn install` in the terminal and install all the frontend related packages in `package.json`.

## How do I start running the program

### Backend

Change to the directory `capstone-project-3900-w14b-three-days-to-see/backend`, and run `python3 server.py` or `python server.py` if you are not in CSE Vlab environment.

It's worth noting that our database cloud sometimes has slow data transmission. If an error occurs, it's probably because the data hasn't keep pace with your operation, so we suggest you to restart the backend server.

Run  `$python3 server.py`

### Frontend

Change to the directory `capstone-project-3900-w14b-three-days-to-see/frontend`, and run `yarn start` to start the frontend. After the webpack is built, click the http://localhost:8000 to visit the website.

Run  `$yarn start`

click the http://localhost:8000
