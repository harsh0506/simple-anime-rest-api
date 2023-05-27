# Anime API

This is a RESTful API built using Node.js, Express, and PostgreSQL. It provides endpoints to manage anime data.

## Requirements

- Node.js
- PostgreSQL

## Getting Started

1. Clone the repository:

git clone <repository-url>
  
2. Install the dependencies:
npm install
  
3. Set up the PostgreSQL database and configure the connection in the .env file.

4.Run the migrations to create the necessary tables:
node connection.js
  
The server will be running at (https://github.com/harsh0506/simple-anime-rest-api).

# API Endpoints
  
# Get All Animes
URL: /animes
Method: GET
Description: Retrieve all animes.
Response Format: JSON
  
# Create an Anime
URL: /animes
Method: POST
Description: Create a new anime.
Request Format: JSON
Response Format: JSON
  
# Get an Anime
URL: /animes/:id
Method: GET
Description: Retrieve an individual anime by ID.
Response Format: JSON
  
# Update an Anime
URL: /animes/:id
Method: PUT
Description: Update an individual anime by ID.
Request Format: JSON
Response Format: JSON
  
# Delete an Anime
URL: /animes/:id
Method: DELETE
Description: Delete an individual anime by ID.
