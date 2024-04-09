const Incident = require('../models/Incident');

exports.createIncident = async (req, res, next) => {
    try {
        const { title, description, severity } = req.body;
        const newIncident = await Incident.create({
            title,
            description,
            severity,
            status: 'Open',
        });
        res.status(201).json(newIncident);
    } catch (error) {
        next(error);
    }
};