import mongoose from 'mongoose';

const { Schema } = mongoose;

const BlogSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const BlogMongo = mongoose.model('Blog', BlogSchema);

export default BlogMongo;
