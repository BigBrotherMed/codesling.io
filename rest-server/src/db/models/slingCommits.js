import mongoose from 'mongoose';

const slingCommits = mongoose.Schema({
  password: {
    type: String,
    required: true,
  }
});

const SlingCommit = mongoose.model('Commit', slingCommits);

export default SlingCommit;
