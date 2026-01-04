import admin from "firebase-admin";
import fs from "fs";

/*this fix makes that 
In development → Firebase Admin initializes normally
In production → Firebase Admin initializes normally
In tests → Firebase Admin is NOT initialized
No file read → no ENOENT → tests can run*/

if (process.env.NODE_ENV !== "test") {
  const serviceAccount = JSON.parse(
    fs.readFileSync("./firebaseServiceAccount.json", "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
