const mongoose = require('mongoose');

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
  assignedTo: User,
  dateAssigned: Date,
  dateSubmitted: Date,
  body: String,
  dateReviewed: Date
});

module.exports = mongoose.model('Case', CaseSchema);
