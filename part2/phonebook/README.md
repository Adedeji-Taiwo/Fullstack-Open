# Phonebook

Let's create a simple phonebook. In this part we will only be adding names to the phonebook.

## Steps
* Step 1: Let us start by implementing the addition of a person to phonebook.
* Step 2: Prevent the user from being able to add names that already exist in the phonebook. 
* Step 3: Expand your application by allowing users to add phone numbers to the phone book. You
* Step 4: Implement a search field that can be used to filter the list of people by name.
* Step 5: If you have implemented your application in a single component, refactor it by extracting suitable parts into new components.
* Step 6: Store the initial state of the application in the file db.json, which should be placed in the root of the project. Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.
* Step 7: Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
* Step 8: Extract the code that handles the communication with the backend into its own module
* Step 9: Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method:
* Step 10: Change the functionality so that if a number is added to an already existing user, the new number will replace the old number.
* Step 11: Show a notification that lasts for a few seconds after a successful operation is executed.
* Step 12: Open your application in two browsers. If you delete a person in browser 1 a short while before attempting to change the person's phone number in browser 2, you will get the following error message.
* Step 13: 

## Start the Application

To start an application, do the following :

```
# Install dependencies
$ npm install
# Start the application
$ npm start
```
Application can be accessed on [http://localhost:3000/](localhost)