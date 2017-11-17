import mongoose from 'mongoose';

const slingHistorySchema = mongoose.Schema({
  // id: {
  //   type: Type.ObjectId,
  //   required: true,
  // },
  id_SlingCode: {
    type: String,
    required: true,
  },
  id_SlingHistorySource: {
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
  id_User: {
    type: String,
    required: true,
  },
});

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
  slingHistory: {
    type: [slingHistorySchema],
    required: true,
  },
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;
