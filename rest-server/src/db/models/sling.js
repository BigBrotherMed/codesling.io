import mongoose from 'mongoose';
import { slingCommitSchema } from './slingCommit';

const slingSchema = mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.Type.ObjectId,
  //   required: true,
  // },
  slingId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  commits: {
    type: [slingCommitSchema],
    required: true,
  },
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;
