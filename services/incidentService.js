
const IncidentModel = require('../models/Incident');

const getAllIncidents = async () => {
  try {
    // Logic to fetch all incidents from the database
    const incidents = await IncidentModel.findAll();
    return incidents;
  } catch (error) {
    throw new Error(`Error fetching incidents: ${error.message}`);
  }
};

const createIncident = async (incidentData) => {
  try {
    // Logic to create a new incident in the database
    const newIncident = await IncidentModel.create(incidentData);
    return newIncident;
  } catch (error) {
    throw new Error(`Error creating incident: ${error.message}`);
  }
};

module.exports = {
  getAllIncidents,
  createIncident
};