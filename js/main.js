$(function(){
    var ws = new WebSocket("ws://localhost:8000/repl");

    var $console = $('#console').jqconsole('Hi\n', '>>> ', "...");
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
        console.log(event.data);
        var data = event.data;
        if(data.substr(0, 8) === "<prompt>"){
            $console.SetPromptLabel(data.substr(8).trim() + " ");
            $console.SetPromptText("");
        }else{
            $console.Write(event.data + '\n', 'jqconsole-output');
        }
    }
});
