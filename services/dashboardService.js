
const getDashboardData = async () => {
    try {
      // Logic to fetch dashboard data from the database or an external API
      const dashboardData = await DashboardModel.findAll();
      return dashboardData;
    } catch (error) {
      throw new Error(`Error fetching dashboard data: ${error.message}`);
    }
  };
  
  module.exports = {
    getDashboardData
  };