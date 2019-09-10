import mongoose from 'mongoose';
export async function connect() {
    try {
        mongoose.connect('mongodb://localhost/ts-app-tutorial', {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        console.log('database connected');
    } catch {
        console.log('Error Mongodb');
    }
}

export default connect;