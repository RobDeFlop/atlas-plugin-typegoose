# Typegoose Plugin for Atlas Framework

> A simple typegoose integration for Atlas Framework

## Installation

### Installation via GitHub:

```
npm install --save robdeflop/atlas-typegoose-plugin

OR

yarn add robdeflop/atlas-typegoose-plugin
```
### Installation via npmjs.com
> coming soon 

### Environmental variables:
In order to use the database connection you need to add the following environmental variables in your `.env`:

```dotenv
MONGODB_USER=YOUR_USERNAME
MONGODB_SCHEMA=YOUR_SCHEMA
MONGODB_PASSWORD=YOUR_PASSWORD
MONGODB_PORT=27017
MONGODB_HOST=YOUR_HOST_ADDRESS
MONGODB_CONNECTION_STRING=OR_USE_THE_CONNECTION_STRING
```

If the connection credentials are set correctly, the server will automatically establish the connection to your 
MongoDB on server start.

## Usage

I won't give any in-depth usage guide about typegoose. For more information checkout the official documentations of
[**typegoose**](https://typegoose.github.io/typegoose/) and [**mongoose**](https://mongoosejs.com/docs/guide.html).

Typegoose works like a wrapper around mongoose. Therefore, you can declare your models as classes.

```typescript
export class User {
  @prop()
  firstName: string;

  @prop()
  lastName: string
}
```

You can save an object of the class above with:

```typescript
const userObj = getModelForClass(User);
const userDoc = new userObj({
  firstName: 'Foo',
  lastName: 'Bar'
});

userDoc.save().then((document) => {
  //handle the success
}).catch((err) => {
  //handle the error
})

userObj.findOne()
```
