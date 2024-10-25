const envMode = () => {
    if (import.meta.env.MODE === "development") {
        console.log("Running in development mode");
        return "http://localhost:3000"
    } else if (import.meta.env.MODE === "production") {
        console.log("Running in production mode");
        return "https://email-marketing-platform-backend.vercel.app/"
    }
}

export default envMode;