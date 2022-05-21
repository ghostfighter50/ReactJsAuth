import mongoose = require('mongoose');
import * as fs from 'fs'
import { Logger } from '../Utilities/Logger'
mongoose.set('debug', true);

const DBconnect = () => {
  mongoose.connect('mongodb+srv://Ghostfighter50:ghostfighter50@website.jbukl.mongodb.net/ReactExpressLogin?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => Logger({ type: 'DATABASE', content: 'Connected to the Database' }))

  const ModelsPath = (__dirname + '/../models')
  fs.readdirSync(ModelsPath).forEach(function (file) {
    if (file.indexOf('.js') > 0) {
      require(ModelsPath + '/' + file)
    }
  })
}
export default DBconnect
