var constants 	= require('../utils/constants');
var cache 		= require('../utils/cacheHandler');
var async		= require('async');
var Commit 		= require('../models/Commit');

function handleError(res, err){
	var status = err.status || 500;
	res.status(status);
	return res.json({
		errors: [err]
	});
};

exports.insertCommit = function(commitDocuments){
    console.log('commit.insertCommit');

    var commits=[];
	commitDocuments.forEach(function(value,index){
        commits.push({
            nodeId: value.node_id,
            created: value.commit.committer.date,
            meta: value,
        })
    })
    return Commit.collection.insertMany(commits, { ordered: false })
    .then(function(mongooseDocuments) {
         /* ... */
         return mongooseDocuments

    })
    .catch(function(err) {
        /* Error handling */
        return Promise.reject(err);
    });
}

exports.getCommits = function(req, res, next){
    var num_res = Number.parseInt(req.query.num_results || '100');

    Commit.find({}).sort({'created':-1}).limit(num_res).exec()
    .then(function(data){
        var data = data.map(function(value){
            return {
                url: value.meta.commit.url,
                repository: value.meta.repository.full_name,
                commit_date_time: value.created,
                message: value.meta.commit.message
            }
        })
        res.json({commits:data})
    })
}