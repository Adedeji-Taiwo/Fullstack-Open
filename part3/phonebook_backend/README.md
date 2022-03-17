# Phonebook Backend

NB: It's recommended to do all of the exercises from this part into a new dedicated git repository, and place your source code right at the root of the repository. Otherwise you will run into problems in exercise 3.10.

NB: Because this is not a frontend project and we are not working with React, the application is not created with create-react-app. You initialize this project with the npm init command that was demonstrated earlier in this part of the material.


## Steps

- Step 1: Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.
- Step 2: Implement a page at the address http:// localhost:3001/info that shows the time that the request was received and how many entries are in the phonebook at the time of processing the request.
- Step 3: Implement the functionality for displaying the information for a single phonebook entry. 
- Step 4: Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
- Step 5: Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
- Step 6: Implement error handling for creating new entries. The request is not allowed to succeed, if:
  * The name or number is missing
  * The name already exists in the phonebook
- Step 7: Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.
- Step 8: Configure morgan so that it also shows the data sent in HTTP POST requests.
- Step 9: Make the backend work with the frontend from the previous part.
- Step 10: Deploy the backend to the internet.


## Start the Application

To start an application, do the following :

```
# Install dependencies
$ npm install
# Start the application
$ npm start
```
Application can be accessed on [http://localhost:3000/](localhost)