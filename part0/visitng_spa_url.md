# Visiting Single Page Application URL

```
title Visiting a Single Page Application URL


browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
server-->browser: spa.js

note over browser:
browser manipulates HTML page with JS code that
requests JSON data from server 
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{ content: "Hi", date: "2022-01-02" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```