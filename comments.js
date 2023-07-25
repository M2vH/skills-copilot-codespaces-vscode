// create a web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
const { parse } = require('querystring');
var comments = require('./comments.js');
var skills = require('./skills.js');
var members = require('./members.js');

// create the server
http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var extname = String(path.extname(filename)).toLowerCase();

    // if the request is for a file, read it
    if (extname === '.html') {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    // if the request is for a member
    } else if (q.pathname === '/members') {
        // if the request is for a specific member
        if (q.query.name) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(members.getMember(q.query.name));
            return res.end();
        // if the request is for all members
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(members.getAllMembers());
            return res.end();
        }
    // if the request is for a skill
    } else if (q.pathname === '/skills') {
        // if the request is for a specific skill
        if (q.query.skill) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(skills.getSkill(q.query.skill));
            return res.end();
        // if the request is for all skills
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(skills.getAllSkills());
            return res.end();
        }
    // if the request is for a comment
    } else if (q.pathname === '/comments') {
        // if the request is for a specific comment
        if (q.query.name) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(comments.getComment(q.query.name));
            return res.end();