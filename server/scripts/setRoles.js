// server/scripts/setRoles.js
import admin from "../src/firebase.js";

async function setRoles() {
  try {
    // -----------------------------------------
    // 1. Set ADMIN ROLE for Astrid Wallin
    // -----------------------------------------
    const adminEmail = "astrid.wallin@furets-gymnasie.se";

    const adminUser = await admin.auth().getUserByEmail(adminEmail);
    await admin.auth().setCustomUserClaims(adminUser.uid, { role: "admin" });

    console.log(`Admin role set for: ${adminEmail}`);


    // -----------------------------------------
    // 2. Set STUDENT ROLE for all Class-5 users
    // -----------------------------------------
    const studentEmails = [
    "oskar.nilsson@furets-gymnasie.se",
    "yuki.kim@furets-gymnasie.se",
    "min.tanaka@furets-gymnasie.se",
    "julia.olsson@furets-gymnasie.se",
    "oskar.sjoberg@furets-gymnasie.se",
    "maja.axelsson@furets-gymnasie.se",
    "amina.mohammed@furets-gymnasie.se",
    "levi.holm@furets-gymnasie.se",
    "oskar.johannesson@furets-gymnasie.se",
    "ebba.bjork@furets-gymnasie.se",
    "julia.holm@furets-gymnasie.se",
    "wei.li@furets-gymnasie.se",
    "yuki.li@furets-gymnasie.se",
    "tarek.tesfaye@furets-gymnasie.se",
    "sara.berg@furets-gymnasie.se",
    "liya.ndlovu@furets-gymnasie.se",
    "hana.zhou@furets-gymnasie.se",
    "klara.bjork@furets-gymnasie.se",
    "anna.sjoberg@furets-gymnasie.se",
    "emil.sjoberg@furets-gymnasie.se"
    // ... add all student emails here
  ];

    for (const email of studentEmails) {
      try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { role: "student" });
        console.log(`Student role set for: ${email}`);
      } catch (e) {
        console.log(`Could NOT set role for: ${email}`, e.message);
      }
    }

    console.log("All roles applied successfully!");

  } catch (error) {
    console.error("Fatal error in setRoles():", error);
  }
}

setRoles();
