// /* eslint-disable no-console */
// const express = require('express');
// const passport = require('passport');
// const mongoose = require('mongoose');

// const API_PORT = process.env.API_PORT || 4000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0-kdhxs.mongodb.net/Cluster0?retryWrites=true&w=majority';

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());

// app.use('/auth', require('./routes/auth-routes.js'));
// app.use(require('./routes/profile-routes.js'));
// app.use(require('./routes/blog-routes.js'));
// app.use(require('./routes/post-routes.js'));
// app.use(require('./routes/comment-routes.js'));
// app.use(require('./routes/user-routes.js'));

// mongoose.set('debug', true);
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })
//   .then(() => {
//     console.log('MongoDB connection successful');
//     app.listen(API_PORT, () => console.log(`App listening on port ${API_PORT}`));
//   })
//   .catch((err) => console.log('MongoDB connection error: ', err));
