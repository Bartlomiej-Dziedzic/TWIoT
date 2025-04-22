export const config = {
    port: process.env.PORT || 3100,
    databaseUrl: process.env.MONGODB_URI || "mongodb+srv://admin:dbpasswd@twiot.vu2i93x.mongodb.net/?retryWrites=true&w=majority&appName=TWIoT",
    socketPort: process.env.PORT || 3000,
 };