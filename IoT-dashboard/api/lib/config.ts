export const config = {
    port: process.env.PORT || 3100,
    supportedDevicesNum: 17,
    databaseUrl: process.env.MONGODB_URI || "mongodb+srv://admin2:admin@twiot.mqc6ovh.mongodb.net/IoT?retryWrites=true&w=majority&appName=TWIoT",
    JwtSecret: "secret",
};
