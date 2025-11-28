import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    address: { type: String, required: true, minlength: 3 },
    personNumber: { type: String, required: true, minlength: 10 },
    phoneNumber: { type: String, required: true, minlength: 10 },
    email: { type: String, required: true, minlength: 3 },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;