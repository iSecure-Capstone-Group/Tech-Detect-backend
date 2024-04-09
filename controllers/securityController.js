const SecurityFeature = require('../models/SecurityFeature');

exports.enableFeature = async (req, res, next) => {
    try {
        const { name } = req.body;
        const feature = await SecurityFeature.findOne({ where: { name } });
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        feature.enabled = true;
        await feature.save();
        res.status(200).json({ message: 'Feature enabled successfully' });
    } catch (error) {
        next(error);
    }
};