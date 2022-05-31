/* eslint-disable n/no-path-concat */
import mongoose = require('mongoose');
import * as fs from 'fs'
import { Logger } from '../helpers/logger.helper'

const DBconnect = () => {
  mongoose.connect('mongodb+srv://Ghostfighter50:ghostfighter50@website.jbukl.mongodb.net/Typescript-API?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => Logger({ type: 'DATABASE', content: 'Connected to the Database' })).catch(error => { Logger(null, { type: 'Database', severity: 'high', content: `Connection Error : ${error.message}` }) })

  const ModelsPath = (__dirname + '/../models')
  fs.readdirSync(ModelsPath).forEach(function (file) {
    if (file.indexOf('.js') > 0) {
      require(ModelsPath + '/' + file)
    }
  })
}
export default DBconnect
