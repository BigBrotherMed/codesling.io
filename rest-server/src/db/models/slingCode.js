import mongoose from 'mongoose';

const slingCodeSchema = mongoose.Schema({
  // id: {
  //   type: ObjectId,
  //   required: true,
  // },
  text: {
    type: String,
    required: true,
  },
});

const SlingCode = mongoose.model('SlingCode', slingCodeSchema);

export default SlingCode;
