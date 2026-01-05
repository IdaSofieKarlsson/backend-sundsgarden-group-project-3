import csv from "csv-parser";
import { Readable } from "stream";
import admin from "../firebase.js";
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

export async function importStudentsCsv(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No CSV file uploaded" });
  }

  const results = [];
  const stream = Readable.from(req.file.buffer);

  stream
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", async () => {
      let created = 0;
      let updated = 0;
      let skipped = 0;

      for (const row of results) {
        try {
          const {
            name,
            email,
            address,
            city,
            personNumber,
            phoneNumber,
            class: className,
          } = row;

          if (!email) {
            skipped++;
            continue;
          }

          // 1. Find Firebase user by email
          const fbUser = await admin.auth().getUserByEmail(email);

          // 2. Upsert student in MongoDB
          const existing = await Student.findOne({ firebaseUid: fbUser.uid });

          if (existing) {
            existing.name = name;
            existing.address = address;
            existing.city = city;
            existing.personNumber = personNumber;
            existing.phoneNumber = phoneNumber;
            existing.class = className;
            await existing.save();
            updated++;
          } else {
            await Student.create({
              name,
              email,
              address,
              city,
              personNumber,
              phoneNumber,
              class: className,
              firebaseUid: fbUser.uid,
            });
            created++;
          }
        } catch (err) {
          console.error("CSV row failed:", row, err.message);
          skipped++;
        }
      }

      return res.json({
        message: "CSV import finished",
        created,
        updated,
        skipped,
      });
    });
};

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;

    const updated = await Student.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        phoneNumber: req.body.phoneNumber,
        class: req.body.class,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateStudent error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
