var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var CommitSchema = new Schema({	
	nodeId: {
		type: String,
        required: true,
        unique: true
	},
	meta: {
        type: Schema.Types.Mixed,
        required: true
    },
    created: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Commit', CommitSchema);
