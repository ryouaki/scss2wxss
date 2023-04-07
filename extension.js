const vscode = require('vscode');
const sass = require('sass');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

function transSassToWxss(file) {
	return file.substring(0, file.indexOf('.scss')) + '.wxss';
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.workspace.onDidDeleteFiles((e) => {
		if (e.files && Array.isArray(e.files) && e.files.length) {
			e.files.forEach((file) => {
				if (!file.path.endsWith('.scss')) {
					return;
				}
				try {
					fse.removeSync(transSassToWxss(file.path));
				} catch (e) {
					console.log(e);
				}
			})
		}
	})
	vscode.workspace.onDidSaveTextDocument((e) => {
		const fileName = e.fileName;
		const name = path.basename(fileName);
		if (!name.endsWith('.scss') || (name.startsWith('_') && name.endsWith('.scss'))) {
			return;
		}
		try {
			const root = path.dirname(fileName);
			const sassSrc = e.getText();
			const wxss = sass.compileString(sassSrc, {
				loadPaths: [root]
			});
			fs.writeFileSync(transSassToWxss(fileName), wxss.css);
		} catch (e) {
			console.error(e)
		}
	})
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
