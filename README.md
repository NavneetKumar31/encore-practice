# ENCORE - practice app
practice app for ENCORE

## Prerequisites
<ul>
  <li>Mongo DB</li>
  <li>Node JS v10 or later</li>
  <li>Angular cli v9 or later</li>
</ul>

### Clone the code from current repository - https://github.com/NavneetKumar31/encore-practice.git

### Steps for server (REST API) side code
<ul>
  <li>After cloning the code</li>
  <li>Open NodeJS command prompt and hit command 'npm install' or 'npm i'</li>
  <li>Verify successfull message in cmd</li>
    <li>go to file 'database.js' (path >> pocketnote-server/configurations/databse.js) and change the only database url (mongodb://localhost:27017/) there according to your DB</li>
  <li>use 'npm start' or 'nodemon' command to run app in your local</li>
  <li>After successfull serving go to browser (chrome for best results) and navigate to 'http://localhost:3000'</li>
</ul>

#### For Swagger UI
After successfull serving go to browser (chrome for best results) and navigate to 'http://localhost:3000/api-docs/'

### Steps for client (UI) side code
<ul>
  <li>After cloning the code</li>
  <li>Open NodeJS command prompt and hit command 'npm install' or 'npm i'</li>
  <li>Verify successfull message in cmd</li>
  <li>use 'ng serve' command to run app in your local</li>
  <li>After successfull serving go to browser (chrome for best results) and navigate to 'http://localhost:4200'</li>
</ul>
