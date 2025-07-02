import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';  // Make sure .js is included


// Initializing the environment configurations required for the project
dotenv.config();

// Connecting to the database
import './config/dbConfig.js';

const app = express();

const port = process.env.PORT || 3005;

// Helper middlewares
app.use(express.json());
app.use(cookieParser());

// Adding CORS security
app.use(
  cors({
    origin: process.env.ACCEPTED_ORGINS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use('/api', routes );

// 404 Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found'
  });
});

// Use error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
