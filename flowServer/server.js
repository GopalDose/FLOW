const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flow",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Exit the process if the connection fails
  }
  console.log("Connected to MySQL database");
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length > 0) {
        res.status(400).json({ message: "Username or email already exists" });
        return;
      }

      // Insert new user into database
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password],
        (err, result) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ message: "Internal server error" });
            return;
          }

          res.status(201).json({ message: "Registration successful" });
        }
      );
    }
  );
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }

      res.status(200).json({ message: "Login successful" });
    }
  );
});

// User data endpoint
app.get("/user/:username", (req, res) => {
  const { username } = req.params;

  db.query(
    "SELECT username, email FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const { username, email } = results[0];
      res.status(200).json({ username, email });
    }
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "profile"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});
const upload = multer({ storage: storage });

// Update profile endpoint
app.post("/saveProfile", upload.single("file"), (req, res) => {
  const {
    username,
    name,
    dateOfBirth,
    gender,
    mobile,
    email,
    linkedin,
    instagram,
    github,
    facebook,
    skills,
  } = req.body;
  const profile_photo = req.file ? req.file.filename : "";
  const sql = `UPDATE users SET
              name=?, dob=?, gender=?, mobile_no=?, email=?,
              linkedin_link=?, github_link=?, instagram_link=?, facebook_link=?, skills=?, profile_photo=?, profile_complete=true
              WHERE username=?`;

  db.query(
    sql,
    [
      name,
      dateOfBirth,
      gender,
      mobile,
      email,
      linkedin,
      github,
      instagram,
      facebook,
      skills,
      profile_photo,
      username,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "Profile saved successfully" });
    }
  );
});


app.use(express.static(path.join(__dirname, "profile")));


// User data endpoint
app.get("/getuser/:username", (req, res) => {
  const { username } = req.params;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userData = results[0];
      res.json(userData);
    }
  );
});
  

// Save personal task endpoint
app.post("/savePersonalTask", (req, res) => {
    const { username, title, description, subtasks, priority, dueDate } = req.body;
  
    // Convert subtasks array to string
    const subtasksString = JSON.stringify(subtasks);

    // Insert new task into database
    db.query(
      "INSERT INTO personal_tasks (username, title, description, subtasks, priority, dueDate) VALUES (?, ?, ?, ?, ?, ?)",
      [username, title, description, subtasksString, priority, dueDate],
      (err, result) => {
        if (err) {
          console.error("Error saving task:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        res.status(201).json({ message: "Task saved successfully" });
      }
    );
  });
  
// Get personal tasks for a specific username
app.post("/getPersonalTasks", (req, res) => {
    const { username } = req.body;
    db.query(
      "SELECT * FROM personal_tasks WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        // console.log(results)
        res.status(200).json(results);
      }
    );
  });
  
  
  // Task details endpoint
app.get("/getTaskDetails/:taskId", (req, res) => {
    const { taskId } = req.params;
  
    db.query(
      "SELECT * FROM personal_tasks WHERE id = ?",
      [taskId],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ message: "Task not found" });
          return;
        }
  
        const taskDetails = results[0];
        // console.log(taskDetails);
        res.status(200).json(taskDetails);
      }
    );
  });


  
  // Task details endpoint
app.get("/getTeamTask/:taskId", (req, res) => {
  const { taskId } = req.params;

  db.query(
    "SELECT * FROM team_tasks WHERE id = ?",
    [taskId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      const taskDetails = results[0];
      console.log(taskDetails);
      res.status(200).json(taskDetails);
    }
  );
});


  // Update subtasks endpoint
app.put("/updateSubtasks/:id", (req, res) => {
  const { id } = req.params;
  const { subtasks } = req.body;
  const subtasksString = JSON.stringify(subtasks);

  db.query(
    "UPDATE personal_tasks SET subtasks = ? WHERE id = ?",
    [subtasksString, id],
    (err, result) => {
      if (err) {
        console.error("Error updating subtasks:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json({ message: "Subtasks updated successfully" });
    }
  );
});


app.get('/getUsernames', (req, res) => {
  db.query('SELECT username FROM users', (err, result) => {
    if (err) {
      console.error('Error fetching usernames:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const usernames = result.map(row => row.username);
      res.json(usernames);
    }
  });
});
  
// Save team task endpoint
app.post("/saveTeamTask", (req, res) => {
  const { username, title, description, subtasks, priority, dueDate } = req.body;

  // Convert subtasks array to JSON string
  const subtasksString = JSON.stringify(subtasks);

  // Insert new task into database
  db.query(
    "INSERT INTO team_tasks (username, title, description, subtasks, priority, dueDate) VALUES (?, ?, ?, ?, ?, ?)",
    [username, title, description, subtasksString, priority, dueDate],
    (err, result) => {
      if (err) {
        console.error("Error saving task:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "Task saved successfully" });
    }
  );
});

// Update subtasks endpoint
app.put("/updateSubtasks/:id", (req, res) => {
  const { id } = req.params;
  const { subtasks } = req.body;
  const subtasksString = JSON.stringify(subtasks);

  db.query(
    "UPDATE team_tasks SET subtasks = ? WHERE id = ?",
    [subtasksString, id],
    (err, result) => {
      if (err) {
        console.error("Error updating subtasks:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json({ message: "Subtasks updated successfully" });
    }
  );
});

// Endpoint to get team tasks
app.post("/getTeamTasks", (req, res) => {
  const { username } = req.body;

  db.query(
    "SELECT * FROM team_tasks",
    (err, results) => {
      if (err) {
        console.error("Error fetching team tasks:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      // console.log(results)
      res.status(200).json(results);
    }
  );
});


  // Task details endpoint
  app.get("/getTaskDetails11/:taskId", (req, res) => {
    const { taskId } = req.params;
  
    db.query(
      "SELECT * FROM team_tasks WHERE id = ?",
      [taskId],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ message: "Task not found" });
          return;
        }
  
        const taskDetails = results[0];
        console.log(taskDetails);
        res.status(200).json(taskDetails);
      }
    );
  });


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
