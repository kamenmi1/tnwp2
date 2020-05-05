// TODO: we need to change variables.
module.exports = {
  port: process.env.PORT || 3030,
  db: process.env.MONGODB || 'mmongodb+srv://dbAdmin:dbAdmin@cluster0-c3fee.azure.mongodb.net/test?retryWrites=true&w=majority',
  // db: process.env.MONGODB || 'mongodb://127.0.0.1:27017/products',
  SECRET_TOKEN: 'extreme_secret_code',
}
