﻿﻿# PV_assignmentRest

## Task1
build API endpoints (RESTful API) for the a model named ‘user’, those endpoints
should handle all the CRUD operations needed for this model.
The user model schema is as following:
id UUID, username String Unique trimmed string,
required
email String Valid email string
password String 6 characters at least
firstName String Not nullable
lastName String Not Nullable
avatar String Relative path to an uploaded
file - only accept png or jpg,
the file shouldn’t exceed
300KB

## Task2
Validate the endpoints request body with appropriate error messages and status codes.

## Task3
Build an point protected by jwt authentication to let the user change his/her own profile data.

## Task4
Write unit tests for each module

## Usage

To run the project, please use a command line the following:
 - npm start
    - It will run the server at port 3001
    
To run the unit test, please use a command line the following:
 - npm test
