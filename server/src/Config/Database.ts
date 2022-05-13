import mongoose = require('mongoose');
import * as fs from 'fs';
import {Logger} from '../Utilities/Logger';

const DBconnect = () => {
mongoose.connect(`mongodb+srv://Ghostfighter50:ghostfighter50@website.jbukl.mongodb.net/ReactExpressLogin?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>  Logger({type : `DATABASE`, content: `Connected to the Database`}))


var models_path=(__dirname+`/../models`)
fs.readdirSync(models_path).forEach(function(file) {
    if (file.indexOf(`.js`)>0) {
        require(models_path+`/`+file);
    }
}) 
}
export default DBconnect