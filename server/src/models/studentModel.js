import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, minlength: 3 },
    address: { type: String, required: true, minlength: 3 },
    city: { type: String },
    personNumber: { type: String, required: true, minlength: 10 },
    phoneNumber: { type: String, required: true, minlength: 10 },
    class: { type: String },
    firebaseUid: { type: String, required: true, unique: true },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;