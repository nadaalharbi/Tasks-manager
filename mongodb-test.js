const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Task-manager';

/* Store the genrated obj id, BUT
 no need for it just for testing cause mongodb by default print/generated it.
 */
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
//GUI: GlobalyUniqueIdentifier
console.log(`GUI id length: ${id.id.length}`); // 12
console.log(`GUI id length after converted to HEXADECIMAL: ${id.toHexString().length}`);



MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to Databse, ${databaseName}` + error);
    }
    // Store the database reference
    const db = client.db(databaseName)


    // INSERTS TO MONGODB
    /* MongoDb have collections(like tables in SQL) to store data each one has a document
      .collection () to insert new collection and name it, then pass another arg. callback to check if inserting new collection went without errors.
      .insertOne() when adding only one object.
      .insertManay() when adding more than one object.
      */

    db.collection('users').insertMany([
        {
            name: 'Nada',
            major: 'CS',
            age: 23
        }, {
            name: 'Sarah',
            major: 'IT',
            age: 22
        }, {
            name: 'Noura',
            major: 'SWE',
            age: 26
        },
        {
            name: 'Ahmed',
            major: 'CS',
            age: 25
        }], (error, result) => {
            if (error) {
                return console.log('Unable to insert user.');
            }
            console.log(`Connected Successfuly to the ${databaseName} Database`)
            console.log(result.ops); // return all docs inserted with the unique generated _id
            console.log(result.insertedCount); // return the number of docs inserted

        });

    db.collection('tasks').insertMany([
        {
            description: 'Complete Udemy course',
            completed: false
        }, {
            description: 'Send Weekly checkpoints',
            completed: true
        }], (error, result) => {
            if (error) {
                return console.log('Unable to insert user.');
            }
            console.log(result.ops);
            console.log(result.insertedCount);
        });



    // READ & QUERY STRING from MONGODB
    // .findOne() : if there's multiple user with same name it'll returns only the first one
    db.collection('users').findOne({ name: 'Nada' }, (error, result) => {
        if (error) {
            return console.log('Unable to fetch data.');
        }
        console.log('Restult of fetching user:');
        console.log(result);

    });
    db.collection('users').find({ major: 'CS' }).count((error, result) => {
        console.log('Result of number of users whose major is CS ');
        console.log(result);
    });
    const usersWithCSMajor = db.collection('users').find({ major: 'CS' }).toArray((error, result) => {
        console.log('Result of all of users whose major is CS ');
        console.log(result);
    });

    const uncompletedTasks = db.collection('tasks').find({ completed: false }).toArray((error, result) => {
        console.log('List of uncompleted tasks');
        console.log(result);
    });



    // UPDATE DOCUMENTS with Promises 
    db.collection('tasks').updateMany({ uncompletedTasks }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });



    //1- updateOne() to update only the first user whose name Sarah with only one new value
    db.collection('users').updateOne({ name: 'Sarah' }, {
        $set: {
            age: 20,
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    const newValues = {
        $set: {
            major: 'Computer Science'
        }, $inc: {
            age: 1
        }
    };

    //2- updateMany() to update all docs that its major is CS with one or many new values
    db.collection('users').updateMany({ major: 'CS' }, newValues)
        .then((result) => {
            console.log("Updated, number of docs updated: " + result.modifiedCount);
        }).catch((error) => {
            console.log("Failed updated!" + error);
        });


    // // DELETE COLLECTIONS
    //1- Delete all docs using deleteMany() and empty {} 
    db.collection('tasks').deleteMany({}).then((result) => {
        return console.log('All Documents Deleted Successfuly');
    }).catch((error) => {
        return console.log('An error occured while deleteding all documents!');
    });

    //2- Delete all docs that matched the given query
    db.collection('users').deleteMany({ major: 'Computer Science' }).then((result) => {
        return console.log('Deleted Successfuly');
    }).catch((error) => {
        return console.log('An error occured while deleteding!');
    });
    //3- Delete one document that matched query(delete the first user with age 20)
    const queryName = { name: 'Sarah' };
    db.collection('users').deleteOne(queryName).then((result) => {
        return console.log('User with name Ahmed,Deleted Successfuly');
    }).catch((error) => {
        return console.log('An error occured while deleteding!');
    });

});