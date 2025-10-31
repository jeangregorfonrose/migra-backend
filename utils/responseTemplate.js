function createResponse(status, message, data = null) {
  return {
    status,
    message,
    data,
  };
}

module.exports = { createResponse };