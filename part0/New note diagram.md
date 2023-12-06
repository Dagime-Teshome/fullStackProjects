sequenceDiagram
participant browser
participant server

    browser->>server: Post https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Data is sent as the body of the POST request.The server then pushes new note data to the notes array and sends back a redirect.
    server-->>browser:  Status 302 (redirect) : https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server
    Note right of browser: A redirect to the /notes url.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
