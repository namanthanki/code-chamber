import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        mongoose.connection.on("connected", () => {
            console.log("Connected to database");
        });

        mongoose.connection.on("error", (error) => {
            console.error("Error connecting to database: ", error);
            process.exit();
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from database");
        });
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
}