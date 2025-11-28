import Student from "../models/studentModel.js";
// import the students from models and define controller functions

//can now take this function and user elsewhere
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get students", 
        });
    }
};

//function for getting student by id from db
export const getStudentByID = async (req, res) => {
    const id = req.params.id;
    
    try {
        const student = await Student.findById({ _id: id });
        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: "Ogiltig input, kan inte hitta denna student.",
        });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json(newStudent);
    } catch (error) {
        res.status(500).json({
            error: "Kunde inte registrera student", 
        });
    }
};