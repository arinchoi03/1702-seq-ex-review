# Cats and Owners - a Sequelize/Express Review
### (by Julie Busch!)


### Start it up

* `$ createdb catstravaganza` (first time setup only)
* `$ npm install`
* `$ npm start`

### Check out those routes!

* You'll need to use the post route a few times or just add info directly in Postico because there is no seed file. But you're here to learn about routes anyway, so I don't feel bad about making you do that.
* I highly recommend downloading the Postman tool for testing routes
    * You can use Postman to send all types of requests to your localhost and see the responses

### Try adding your own mathods and routes!

* See if you can use the methods given to you by the "Owner has many cats" relation!
    * Create an owner instance method called `adopt` that is a function that can be passed the id of a cat and then associates that cat with its new owner! (Have the owner adopt a random cat if no id is passed in.)
    * Then make a PUT route in the owner routes that will allow an owner to adopt a cat!

### That's it! Happy Studying!
