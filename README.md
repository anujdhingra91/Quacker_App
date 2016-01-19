# Quacker
Quacker is a Twitter clone that allows users to sign up
and create quacks.  Other signed-up users can see a list
of all quacks and mark individual quacks as read.

## Models
This is a list of models and the properties they contain

* `User`
 * username - for logging in; unique and immutable
 * password - for logging in
 * email - just because
 * avatar - link to an image that displays for the user

* `Quack`
 * user - `_id` of the creator of the quack
 * message - text content of the quack
 * images - array of up to 3 images associated with the
  quack (by `_id`)
 * readers - array of `_id`s of users who have marked the
  quack as read
 * date - automatically-recorded date the quack was created

* `Image`
 * src - link to the image source
 * caption - text describing the image

## API Routes
List of routes that the API provides. You can use this for
RESTful communication with the server and CRUD operations
for users and quacks.

### Unauthorized routes
These routes do not require authorization / user login
in order to user.

* `GET /authorize` - check login
 * Always returns 200.  If the user is logged in, returns
  the user in the session.  Otherwise returns `false`.

* `POST /authorize` - log user in
 * Body: `{username, password}`
 * Returns 200 if and the user if username+password matches
  * Also logs the user into the session
 * Returns 401 if there is a mismatch

* `POST /users` - create a new user
 * Body: `{username, password, email, avatar}`
 * Returns 500 if there is an error creating the user. Usernames
  must be unique
 * Returns 201 if the user is created successfully. Returns
  the created user in the body of the response

### Authorized Routes
The user must log in with `POST /authorize` as above in
order to create a session and use these routes.

Attempting to use these routes when the user has not been
logged in will return a 403 status.

* `PATCH /users` - update the logged in user's information
 * Body: `{password, email, avatar}`
 * Returns 500 if there is an error
 * Returns 200 and the updated user if successful.

* `GET /user/:id` - retrieve a specific user's information
 * Returns 404 if the user does not exist
 * Returns 200 plus user information in the body of the
  response (ignore the fact tht you get the plain text
  password back)

* `DELETE /authorize` - log the user out
 * Always returns 200

#### Quacks
These routes deal specifically with quacks

* `GET /quacks` - get all quacks
 * Returns 500 if there is an error
 * Returns 200 with the list of quacks.  Each quack has
  its properties as well as the `image` properties populated
  with their `src` and `caption` data and
  an additional `read` boolean property (for whether it
  has been read or not by the logged-in user). The creator's
  information is also populated in the `user` property.

* `POST /quacks` - create a new quack
 * Body: `{message, images[{src, caption}]}`
 * Returns 500 if there is an error
 * Returns 201 with the new quack if successful

* `POST /quacks/:id/read` - mark a quack as read for the
 logged-in user
 * Body: `{read<true,false>}`
 * Returns 500 if there is an error
 * Returns 200 if successful

* `DELETE /quacks/:id` - delete a quack that the logged-in
 user owns
 * Returns 500 if there is an error
 * Returns 403 if attempting to delete a quack the logged-in
  user does not own
 * Returns 200 and the deleted quack if successful
