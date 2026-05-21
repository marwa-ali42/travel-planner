import express from "express";
import healthRoutes from "@/routes/health.routes.js";
import placesRoutes from "@/routes/places.routes.js";
import itineraryRoutes from "@/routes/itinerary.routes.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/places", placesRoutes);
app.use("/itinerary", itineraryRoutes);

export default app;