const { eventSvc } = require('../services');
const detStatus = require('../utils/det_event_status');

module.exports = async () => {
    const events = await eventSvc.getEventsPublic('id', 'desc', 0, 10, '');
    let count = 0;
    for (let event of events.rows) {
        let status = detStatus(event.start_date, event.end_date, event.start_reg_date, event.end_reg_date);
        if (event.status === status) continue;

        await eventSvc.updateEvent(
            event.id, event.title, event.program_id, event.type,
            status,
            event.thumbnail_id, event.poster_id, event.banner_id, event.description, event.start_date, event.end_date, event.location, event.location_url, event.registration_link, event.start_reg_date, event.end_reg_date, event.contact, event.tag1, event.tag2, event.tag3, event.tag4, event.tag5, event.scope,
            {}
        );

        count++;
        console.log(`INFO: Update event ${event.id} status from ${event.status} to ${status}`);
    }

    console.log(`INFO: ${count} Event status updated at ${new Date().toISOString()}`);
}