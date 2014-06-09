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
        var data = JSON.parse(event.data);
        if(data.type === "prompt"){
            $console.SetPromptLabel(data.s);
            $console.SetPromptText("");
        }else{
            $console.Write(data.s, 'jqconsole-output');
        }
    };

    ws.onclose = function(event){
        if(event.code === 1006){
            $console.Write("Failed to connect, has the try-pharen server been started?",
                    'jqconsole-output jqconsole-error');
        }
    }
});
