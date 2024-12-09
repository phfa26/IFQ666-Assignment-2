const app = require('./src/app');

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
