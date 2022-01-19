# Swordhealth-API


Recruitment project for Swordhealth

This is a docker container running MySql Redis and Node

<h6> With a Websocket Server on port 8100. </h6>
<h6> And the API on port 3000 w/ user Authentication and Authorization.</h6>

* Endpoints:
  * Login
    - POST:
      * Returns Authorization header if sucessful;
  * Tasks (Must provide auth token in header)
    - GET: 
       - Logged in as MANAGER <br>  => Returns all Tasks;
       - Logged in as TECHNICIAN: technicianID <br> => Returns Tasks created by that Technician;
    - POST:
       - Logged in as TECHNICIAN: TaskObject <br> => If no taskId is provided it will create a new task else it will update the one with the same id;
    - DELETE:
       - Logged in as MANAGER: taskID <br> => Deletes task with same id;

* WebSocket:
   - Connect to WebSocket then emit message with authToken.
   - If token is invalid or no permission from the user that has the token, the socket will send code 401 and close else it will notify MANAGER when a new Task as been created
