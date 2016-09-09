# MEAN Stack with Token-based Authentication

Prerequisites: ```node```/```npm``` and MongoDB installed on host system

Installation: ```npm install```

Run application: ```bin/www``` (serves to [localhost:3000](http://localhost:3000/))


##Authentication Flow

**MongoDB** stores user data, hashed passwords, and salts (```mongoose.js``` is used for modeling)

**Express** API defines the REST interface (```passport.js``` is the authentication middleware)

**Angular** application uses ```$http``` to send login request to the API

**Node** generates a JWT with ```jsonwebtoken```; Express passes it to Angular

Angular application:
* stores the JWT in ```LocalStorage``` to maintain the user’s session
* checks the validity of the JWT when displaying protected views
* passes the JWT back to Express for validation by ```express-jwt``` when calling protected API routes