const { circulationSvc } = require('../services');

module.exports = async () => {
    const circulations = await circulationSvc.getCirculations(0, 0, 'created_at', 'asc');
    let count = 0;

    for (let c of circulations.rows) {
        let status = "";
        if (new Date(c.due_date) < new Date() && c.return_date === null) {
            status = "late";
        } else {
            continue;
        }

        await circulationSvc.updateCirculationStatus(c.id, status);

        count++;
    }
    
    console.log(`INFO: ${count} Circulation status updated at ${new Date().toISOString()}`);
}