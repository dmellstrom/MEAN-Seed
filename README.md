# MEAN Stack with Token-based Authentication

Prerequisites: ```node```/```npm``` and MongoDB installed on host system

Installation: ```npm install```

Run application: ```bin/www``` (serves to [localhost:3000](http://localhost:3000/))


## Authentication Flow

**MongoDB** stores user data, hashed passwords, and salts (```mongoose.js``` is used for modeling)

**Express** API defines the REST interface (```passport.js``` is the authentication middleware)

**Angular** application sends a login request to the API

**Node** generates a JWT with ```jsonwebtoken```

Express sets the token as an HTTP-only cookie and sends its claim (payload) to Angular

Angular stores the claim in ```LocalStorage``` to keep track of the user’s session

The cookie is then validated by ```express-jwt``` when calling a protected API route