   
#! /bin/bash
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection users --drop --file users.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection products --drop --file products.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection roles --drop --file roles.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection categorys --drop --file categories.json --jsonArray;
