# Phonebook Backend & Database

NB: It's recommended to do all of the exercises from this part into a new dedicated git repository, and place your source code right at the root of the repository. Otherwise you will run into problems in exercise 3.10.

NB: Because this is not a frontend project and we are not working with React, the application is not created with create-react-app. You initialize this project with the npm init command that was demonstrated earlier in this part of the material.

- Live link: https://phonebookappz.herokuapp.com/

## Steps

### Phonebook Backend
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
- Step 11: Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.

### Commandline Database
- Step 12: Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas. Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.
  
### Phonebook Database
- Step 13: Change the fetching of all phonebook entries so that the data is fetched from the database.
- Step 14: Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.
- Step 15: Change the backend so that deleting phonebook entries is reflected in the database.
- Step 16: Move the error handling of the application to a new error handler middleware.
- Step 17: If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.
- Step 18: Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.


## Start the Application

To start an application, do the following :

```
# Install dependencies
$ npm install
# Start the application
$ npm start
```
Application can be accessed on [http://localhost:3000/](localhost)