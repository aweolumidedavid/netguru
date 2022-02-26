# netguru

To start the micro service, run sudo docker-compose up
 - set up the environment variables for the 
    - CONNECTION_STRING: I used mongodb atlas but you can use any one that you like
    - PORT=4007
    - TOKEN_SECRET=secret

The endpoint to create the movie 
POST: http://localhost:4007/movie/create

The endpoint to get all movies
GET: http://localhost:4007/movie/get-all

