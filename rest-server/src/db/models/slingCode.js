import mongoose from 'mongoose';

const slingCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  }
});

const SlingCode = mongoose.model('SlingCode', slingCodeSchema);

export default SlingCode;
