# LeanOnMe 

## LeanOnMe at a glance

LeanOnMe is a fullstack app for people who are looking for help with tracking their macros as they go through their fitness journey. LeanOnMe allows users to create daily nutritional goals as well as keep track of each meal they have throughout the day.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/Thereal-victorhou/lean-on-me.git
   ```

2. Install dependencies into the root of the project

      ```pipenv install
      ```
3. Install dependencies for the front end in the react app folder
      ```npm install```
4. Create a **.env** file based on the example with proper settings for your
   development environment
5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***



