// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "whichthemeisthat" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.whichThemeIsThat', function () {
        // The code you place here will be executed every time your command is executed

       // context.subscriptions.push(disposable);

        // create a new status bar item that we can now manage
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        context.subscriptions.push(myStatusBarItem);

        myStatusBarItem.show();

        updateStatusBarItem();

        // register some listener that make sure the status bar 
        // item always up-to-date
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(updateStatusBarItem));


    });
}


function updateStatusBarItem() {
    const theme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
    const font = vscode.workspace.getConfiguration().get('editor.fontFamily');
    myStatusBarItem.text = 'Theme: ' + theme + ' | ' +  'Font: ' + font;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;