module.exports = {
  ping: async (request, response, next) => {
    response.status(200).json({message:'pong'})
  }
}