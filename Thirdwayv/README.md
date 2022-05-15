# Documentation
> Description

The system is a prove of concept that simulated receiving data from temperature sensors and a web view to
show the sensors' reported values.

The application is designed and implemented using cutting edge technologies such as:
- Angular 
- Node.js 
- Express.js
- MongoDB

> Installation 

Follow the commands below to install the application.

```bash 
git clone 
```
### back-end
``` bash
cd thirdwayv/thirdwayv-server

npm install

touch .env "use the env variables below"

nodemon Or node index.js
```

### front-end
``` bash
cd thirdwayv/thirdwayv

npm install

ng serve
```

> Environment variables

``` bash
ENV= "develpoment or production"
PORT= "Port to run the app on"
DOMAIN= "Domain for the application"
MONGO_URI= "mongo database URL"
```

