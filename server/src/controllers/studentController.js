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

export async function registerStudent(req, res) {
  try {
    const { name, email, address, city, personNumber, phoneNumber, class: className, firebaseUid } = req.body;

    // Validate required fields
    if (!firebaseUid) {
      return res.status(400).json({ error: "firebaseUid is required" });
    }

    const student = new Student({
      name,
      email,
      address,
      city,
      personNumber,
      phoneNumber,
      class: className,
      firebaseUid,
    });

    await student.save();
    res.status(201).json(student);

  } catch (err) {
    console.error("registerStudent error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// NEW: Student can fetch THEIR OWN profile
export async function getMyStudentProfile(req, res) {
  try {
    const firebaseUid = req.user.uid;

    const student = await Student.findOne({ firebaseUid });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    console.error("getMyStudentProfile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};