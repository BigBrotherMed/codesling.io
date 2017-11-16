import mongoose from 'mongoose';

const slingHistory = mongoose.Schema({
  slingCodeId: {
    type: String,
    required: true
  },
  slingSourceId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: false
  },
  codeName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

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
    type: [slingHistory],
    required: false
  }
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;
