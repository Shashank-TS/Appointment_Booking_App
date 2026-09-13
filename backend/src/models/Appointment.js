import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: [true, 'Patient name is required'],
    match: [/^[A-Za-z\s\-']+$/, 'Patient name can only contain letters, spaces, hyphens.']
  },
  mobileNumber: { 
    type: String, 
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits.']
  },
  doctorName: { 
    type: String, 
    required: [true, 'Doctor name is required'],
    match: [/^[A-Za-z\s\-']+$/, 'Doctor name can only contain letters, spaces, hyphens.']
  },
  appointmentDate: { 
    type: String, 
    required: [true, 'Appointment date is required'] 
  },
  appointmentTime: { 
    type: String, 
    required: [true, 'Appointment time is required'] 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  reasonForVisit: { type: String }, 
  aiSummary: { type: String } 
}, { timestamps: true });

const appointment = mongoose.model('Appointment', appointmentSchema);
export default appointment;