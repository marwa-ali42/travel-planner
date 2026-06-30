import express from "express";
import healthRoutes from "./routes/health.routes.js";
import placesRoutes from "./routes/places.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";
import cors from 'cors'; 

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/places", placesRoutes);
app.use("/itinerary", itineraryRoutes);

export default app;