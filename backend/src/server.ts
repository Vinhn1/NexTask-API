import app from "./app";

const PORT = process.env.PORT || 5000;

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server is flying on http://localhost:${PORT}`);
})
