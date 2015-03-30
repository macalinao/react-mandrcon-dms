import mongoose from 'mongoose';

let CaseSchema = new mongoose.Schema({
  patientName: String,
  patientId: String,
  datesOfService: String,
  datesDenied: String,
  denialReason: String,
  pages: Number,
  caseType: String,
  strength: String,
  file: String,
  body: String,
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  assignedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  dateAssigned: Date,
  dateSubmitted: Date,
  dateReviewed: Date
});

let Case = mongoose.model('Case', CaseSchema);
export { Case };
