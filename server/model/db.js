/**
 * Created by metalheart on 15.08.2016.
 */

var mongoose = require('mongoose');


var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
    var groupScheme = new mongoose.Schema({
        parent: { type: mongoose.Schema.Types.ObjectId, default: null, required: false, ref: 'Group'},
        description: { type: String, required: true},
    });
    mongoose.model('Group', groupScheme);

    var deviceSchema = new mongoose.Schema({
        group: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Group'},
        description: { type: String, required: true},
        serial: { type: String, required: true},
        lastSeen: { type: Date, default: null, required: false }
    });
    mongoose.model('Device', deviceSchema);

    var taskScheduleSchema = new mongoose.Schema({
        device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true},
        type: { type: String, enum: ['schedule', 'sleep', 'restart'], required: true},
        content: String, //content to be played or executed
        date: { type: Date, default: Date.now, required: true }, //scheduled date
        void: Boolean //task became void and should be deleted
    });
    mongoose.model('TaskSchedule', taskScheduleSchema);

    var deviceConfigSchema = new mongoose.Schema({
        device: String, //device serial
        config: String, //json string with settings
        date: { type: Date, default: Date.now } //change date
    });
    mongoose.model('DeviceConfig', deviceConfigSchema);
});

mongoose.connect('mongodb://localhost/pmbox');
