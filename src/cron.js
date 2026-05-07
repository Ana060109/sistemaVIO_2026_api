const cron = require("node-cron");
const cleanUpEvents = require("./services/cleanUpEventsServices");

// Agendando uma ação
cron.schedule("*/30 * * * * *", async() => {
    try {
        await cleanUpEvents();
    } catch (error) {
        console.error("Erro ao executar a Limpeza automática", error);
    }
});