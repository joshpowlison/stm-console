const moduleFunctions = {
	"log": log,
	"logCommand": logCommand,
	"logComment": logComment,
	"logError": logError,
	"clear": clear,
};

module.LoadModule(moduleFunctions);

var counters = [];
var container = document.getElementById("container");
var logCount = 0;
var maxLogs = 15;

function writeLog(message, className = '')
{
	// Remove older logs
	logCount ++;
	if(logCount > maxLogs)
	{
		var elFirstLog = container.firstChild;
		container.removeChild(elFirstLog);
		logCount --;
	}

	// Add the new log element on
	var el = document.createElement('p');
	el.innerHTML = message;
	el.className = className;
	container.appendChild(el);
}

async function log(name, event)
{
	// If it's straight text, use it
	if(typeof(event) == 'string')
	{
		writeLog(event);
		return;
	}

	var text = '';

	if('from' in event)
	{
		var userStyle = 'color:' + event?.color;
		text += '<span style="' + userStyle + '">@' + event.from + '</span>'
			+ ' ';
	}
	
	console.log(event);
	text += event.message;
	writeLog(text);
}

async function logCommand(name, event)
{
	var userStyle = 'color:' + event.color;
	var packageStyle = 'color:' + '#ffffff';
	var functionStyle = 'color:' + '#e9db27';
	var valueStyle = 'color:' + '#ffffff';

	console.log(event);
	var text = '<span style="' + userStyle + '">@' + event.from + '</span>'
		+ ' '
		+ '<span style="' + packageStyle + '">' + event.packageName + '</span>'
		+ '.'
		+ '<span style="' + functionStyle + '">' + event.functionName + '('
		+ '<span style="' + valueStyle + '">' + event.valueText + '</span>'
		+ ');</span>'
	;
	writeLog(text, 'command');
}

async function logComment(name, event)
{
	// If it's straight text, use it
	if(typeof(event) == 'string')
	{
		writeLog('// ' + event, 'comment');
		return;
	}

	writeLog('// ' + event.message, 'comment');
}

async function logError(name, event)
{
	// If it's straight text, use it
	if(typeof(event) == 'string')
	{
		writeLog('Error: ' + event, 'error');
		return;
	}
	
	var userStyle = 'color:' + event.color;
	var text = '<span style="' + userStyle + '">@' + event.from + '</span>'
		+ ' Error: '
		+ event.message
	;
	
	writeLog(text, 'error');
}

async function clear(name, event)
{
	Utility.clearChildren(container);
}