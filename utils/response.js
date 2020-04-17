const generateResponse = (success, message, data = null) => {
    return data
        ? {
              success,
              message,
              data,
          }
        : {
              success,
              message,
          };
};

module.exports = {
    generateResponse,
};
