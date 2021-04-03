/* eslint-disable no-console */
import mongoose from 'mongoose';
import './models/user-model';
import './models/blog-model';
import './models/post-model';
import './models/comment-model';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0-kdhxs.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.set('debug', true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('MongoDB connection successful');
  })
  .catch((err) => console.log('MongoDB connection error: ', err));
