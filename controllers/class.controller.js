import pool from "../db.js";

//authorizeentication

const classEntry = async (req, res) => {
  //   const { section  } = req.body;
  // const section = req.params.slug;
  const { session, section, code, faculty, room, day, slot } = req.body;
  try {
    const newClass = await pool.query(
      `insert into class(session, sec,code ,faculty, room,day,slot)
values
($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
      [session, section, code, faculty, room, day, slot]
    );

    res.json(newClass.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { classEntry };
