// import express from 'express'
// import cors from 'cors'
// import authRouter from './routes/auth.js'
// import departmentRouter from './routes/department.js';

// import connectToDatabase from './db/db.js'
// connectToDatabase()
// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use('/api/auth',authRouter)
// app.use('/api/department',departmentRouter)


// app.listen(process.env.PORT, ()=>{
//     console.log(`server is running on port${process.env.PORT}`)
// })    



import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import connectToDatabase from './db/db.js';

connectToDatabase(); // Connecting to the database

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);

// Define the server port and listen
const PORT = process.env.PORT || 5002; // Fallback to port 5000 if not specified in environment variables
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
