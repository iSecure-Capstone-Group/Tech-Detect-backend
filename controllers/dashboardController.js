const dashboardService = require('../services/dashboardService');

exports.getUserInfo = async (req, res, next) => {
    try {
        const userInfo = await dashboardService.getUserInfo(req.userId);
        res.status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
};