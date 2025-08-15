import pool from "../db.js";

//authorizeentication

const personalRoutine = async (req, res) => {
  const st_id = req.user.id;

  try {
    const user = await pool.query(
      `SELECT 
    STRING_AGG(sec, ', ' ORDER BY sec) AS sec,
    STRING_AGG(code, ', ' ORDER BY code) AS code,
    STRING_AGG(faculty, ', ' ORDER BY faculty) AS faculty,
    day, 
    slot,
    STRING_AGG(room, ', ' ORDER BY room) AS room,
    STRING_AGG(class_id::TEXT, ', ' ORDER BY class_id) AS class_id
FROM (
    SELECT * 
    FROM class 
    NATURAL JOIN student_course 
    WHERE id = $1 
    ORDER BY code, faculty
) AS t
GROUP BY day, slot
ORDER BY day, slot;
`,
      [st_id]
    );
    let final = [];
    for (let i = 0; i < user.rows.length; i++) {
      let temp = user.rows[i];
      let cnt = 1;
      while (
        i + 1 < user.rows.length &&
        user.rows[i + 1].day == temp.day &&
        user.rows[i + 1].code == temp.code &&
        user.rows[i + 1].room == temp.room &&
        user.rows[i + 1].faculty == temp.faculty
      ) {
        ++i;
        ++cnt;
      }
      let temp2 = { ...temp, count: cnt };
      final.push(temp2);
    }
    return res.status(200).json({ rows: final });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const Currentpersonalclass = async (req, res) => {
  const st_id = req.user.id;
  const day = req.params.slug1;
  const slot = req.params.slug2;
  console.log("day slot ", day, slot);

  try {
    const data = await pool.query(
      `select * from
(select * from class)
as temp1
join
(select * from student_course where id = $1)
as temp2
on temp1.sec = temp2.sec and temp1.code = temp2.code
where slot = $2 and day = $3
`,
      [st_id, slot, day]
    );

    return res.status(200).json({ currentclass: data.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const Profile = async (req, res) => {
  const st_id = req.user.id;
  try {
    const data = await pool.query(
      `select id, name, sec, phone, email from student where id = $1`,
      [st_id]
    );

    return res.status(200).json(data.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const studentCourseInsert = async (req, res) => {
  const { code, section, session } = req.body;

  const st_id = req.user.id;

  try {
    const user = await pool.query(
      "SELECT * FROM class WHERE code = $1 and sec = $2 and session = $3",
      [code, section, session]
    );
    if (user.rows.length <= 0) {
      return res.status(401).json("no such class");
    }

    const Check = await pool.query(
      "SELECT * FROM student_course WHERE id = $1 and code = $2 and sec = $3 and session = $4",
      [st_id, code, section, session]
    );

    if (Check.rows.length > 0) {
      return res.status(401).json("this course already Added");
    }

    const Count = await pool.query(
      `select * from
(
select  count(*) from
(
select temp1.day,temp1.slot from
(select * from class natural join student_course where student_course.id = $1)
as temp1
join

(select * from class where code = $2 and sec = $3 and session = $4)
as temp2
on temp1.slot = temp2.slot and temp2.day = temp1.day 

) 
as temp3 
group by day,slot)
as temp4 where count = 3`,
      [st_id, code, section, session]
    );
    if (Count.rows.length > 0) {
      return res
        .status(401)
        .json("You Can't Add more than 3 course in the same slot of the day");
    }

    const NewUser = await pool.query(
      `insert into student_course(id, code,sec,session)
values
($1,$2,$3,$4) RETURNING *;`,
      [st_id, code, section, session]
    );

    res.json(NewUser.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export { personalRoutine, Profile, studentCourseInsert, Currentpersonalclass };
