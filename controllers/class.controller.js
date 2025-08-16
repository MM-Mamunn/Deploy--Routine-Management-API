import pool from "../db.js";

//authorizeentication

const classEntry = async (req, res) => {
  const { session, section, code, faculty, room, day, slot,id } = req.body;
  try {
    // Check for existing class
    const checkExist = await pool.query(
      `SELECT * FROM class 
       WHERE session = $1 AND sec = $2 AND code = $3 AND faculty = $4 AND room = $5 AND day = $6 AND slot = $7`,
      [session, section, code, faculty, room, day, slot]
    );

    if (checkExist.rows.length > 0) {
      // Found duplicate row
      return res.status(400).json({ error: "Class entry already exists with these details." });
    }

    // Insert new class if not exists
    const newClass = await pool.query(
      `INSERT INTO class(session, sec, code, faculty, room, day, slot,by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [session, section, code, faculty, room, day, slot,id]
    );

    res.json(newClass.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export { classEntry };
