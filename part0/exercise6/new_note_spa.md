# Creating SPA New Note

```
title Creating SPA New Note



note over browser:
New note is created by clicking submit button
Browser sends POST request to server
The POST request contains the new note as JSON-data 
end note
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server-->browser: Status-code 201
note over browser:
The server responds with status code 201 created
SPA uses the JavaScript code it fetched from the server to:
-Creates a new note
-Adds it to the notes list 
-Rerenders the note list on the page
end note


```