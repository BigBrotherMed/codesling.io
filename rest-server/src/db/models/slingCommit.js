import mongoose from 'mongoose';

const slingCommitSchema = mongoose.Schema({
  // id: {
  //   type: Type.ObjectId,
  //   required: true,
  // },
  sourceCommitId: {
    type: String,
    required: true,
  },
  slingCodeId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const SlingCommit = mongoose.model('SlingCommit', slingCommitSchema);

export default SlingCommit;
