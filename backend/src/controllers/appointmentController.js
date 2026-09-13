import Appointment from '../models/Appointment.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const createAppointment = async (req, res) => {
  try {
    let aiSummary = '';
    
    // AI summary if a reason is provided
    if (req.body.reasonForVisit) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        const prompt = `Generate a very short, one-sentence professional clinical summary for a doctor's appointment based on this patient reason: "${req.body.reasonForVisit}"`;
        const result = await model.generateContent(prompt);
        aiSummary = result.response.text().trim();
      } catch (aiError) {
        console.error("AI Generation failed:", aiError);
        aiSummary = "Summary unavailable.";
      }
    }

    const appointmentData = { ...req.body, aiSummary };
    const newAppointment = new Appointment(appointmentData);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create appointment', error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update status', error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
};