$(function(){
    var ws = new WebSocket("ws://localhost:8000/repl");

    var $console = $('#console').jqconsole('', '>>> ');
    var startPrompt = function(){
        $console.Prompt(true, function(input){
            ws.send(input);
            startPrompt();
        }, function(){
            return false;
        });
    };
    startPrompt();

    ws.onmessage = function(event){
        var data = event.data;
        if(data.substr(0, 8) === "<prompt>"){
            $console.SetPromptLabel(data.substr(8).trim() + " ");
            $console.SetPromptText("");
        }else{
            $console.Write(event.data, 'jqconsole-output');
        }
    }
});
