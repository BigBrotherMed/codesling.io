import mongoose from 'mongoose';

const slingCommitCodeSchema = mongoose.Schema({
  // id: {
  //   type: ObjectId,
  //   required: true,
  // },
  text: {
    type: String,
    required: true,
  },
});

const SlingCommitCode = mongoose.model('SlingCommitCode', slingCommitCodeSchema);

export default SlingCommitCode;
