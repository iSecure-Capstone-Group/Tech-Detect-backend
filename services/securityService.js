const SecurityModel = require('../models/Security');

const getSecurityFeatures = async () => {
  try {
    // Logic to fetch security features from the database
    const securityFeatures = await SecurityModel.findAll();
    return securityFeatures;
  } catch (error) {
    throw new Error(`Error fetching security features: ${error.message}`);
  }
};

const updateSecurityFeature = async (featureId, updateData) => {
  try {
    // Logic to update a security feature in the database
    const updatedFeature = await SecurityModel.update(updateData, {
      where: { id: featureId }
    });
    return updatedFeature;
  } catch (error) {
    throw new Error(`Error updating security feature: ${error.message}`);
  }
};

module.exports = {
  getSecurityFeatures,
  updateSecurityFeature
};