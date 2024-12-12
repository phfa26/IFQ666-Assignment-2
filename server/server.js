const fs = require('fs');
const path = require('path');
const app = require('./src/app');
const os = require('os');

const PORT = process.env.PORT || 3007;

// Function to get the local IP address
const getLocalIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const net of networkInterfaces[interfaceName]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address; // Return the first external IPv4 address
            }
        }
    }
    return 'localhost'; // Fallback to localhost if no external IP is found
};

const localIp = getLocalIpAddress();

// Write the IP to the .env file
const envFilePath = path.resolve(__dirname, '../daily-reflection-client/.env');
const envVar = `SERVER_ENDPOINT=${localIp}:${PORT}`;

fs.writeFile(envFilePath, envVar, { flag: 'w' }, (err) => {
    if (err) {
        console.error('Error SERVER_ENDPOINT writing to .env file:', err);
    } else {
        console.log(`IP address ${localIp} written to .env file at ${envFilePath} as SERVER_ENDPOINT`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://${localIp}:${PORT}`);
});
