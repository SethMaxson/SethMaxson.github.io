interface IDirTreeNode
{
	type: "file" | "folder";
	name: string;
	path: string;
	children?: IDirTreeNode[];
};

var fs = require('fs'),
    path = require('path');

function fileList(filename: string): string[] {
	var stats = fs.lstatSync(filename);
    var list: string[] = [];

    if (stats.isDirectory()) {
		return fs.readdirSync(filename).map(function (child: string)
		{
			const childFileName = filename + '/' + child;
			const childStats = fs.lstatSync(childFileName);
			if (childStats.isDirectory())
			{
				// TODO: Need to find a way to make this return subdirectory files without creating a child array inside the return stuff
				return fileList(childFileName);
			}
			else
			{
				return childFileName;
			}
        });
    } else {
		return [ filename ];
    }

    return list;
}

if (module.parent == undefined) {
    // node fileList.js ~/foo/bar
	var util = require('util');
	try {
		// fs.writeFileSync('~/dnd/res/directory/img/races/file-tree-test.json', JSON.stringify(fileList(process.argv[2])));
		fs.writeFileSync(path.resolve(__dirname, '../../data/directory/img/races/snes.json'), JSON.stringify(fileList(process.argv[2])));
		// file written successfully
	  } catch (err) {
		console.error(err);
	  }
    // console.log(util.inspect(fileList(process.argv[2]), false, null));
}