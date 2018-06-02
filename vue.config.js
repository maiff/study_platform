module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      "/index.php": {
        target: "http://121.201.13.90/host/LearningFirst/",
        secure: false
      }
    }
  }
};