import mongoose from 'mongoose';

const slingSchema = mongoose.Schema({
  slingId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  commits: {
    type: Array,
    required: true
  }
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;
