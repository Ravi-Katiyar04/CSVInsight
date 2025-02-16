import { connect } from 'mongoose';

function connectToDB() {
    connect(process.env.DB_URL        
    ).then(() => {
        console.log("Connected to the database!");
    }).catch((error) => {
        console.log("Connection failed!", error);
    });
}

export default connectToDB;