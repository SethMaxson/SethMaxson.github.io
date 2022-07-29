interface IDirTreeNode
{
	type: "file" | "folder";
	name: string;
	path: string;
	children?: IDirTreeNode[];
};

var fs = require('fs'),
    path = require('path');

function dirTree(filename: string) {
	var stats = fs.lstatSync(filename);
    var info: IDirTreeNode = {
            type: "file",
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child: string) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2]), false, null));
}