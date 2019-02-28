var editor;
var embedded_editor;
$(function() {
    if (typeof ace !== "undefined") {
        ace.config.set("workerPath", "static/build/src-min");
        editor = ace.edit("ace_editor_demo");
        editor.container.style.opacity = "";
        editor.setTheme("ace/theme/monokai");

        editor.setOptions({
            fontSize: "22px",
            maxLines: 30,
            mode: "ace/mode/python",
            autoScrollEditorIntoView: true
        });


       /* editor.getSession().on('change', function() {
            var code = editor.getValue();
            $.ajax({
                url: "/execute",
                type: "POST",
                data: code,
                processData: false,
                contentType: false,
                success: function (response) {
                    var result_code = $(".code-result");
                    result_code.text(response.result);
                    if (response.line) {
                        editor.getSession().setAnnotations([{
                          row: response.line,
                          column: 0,
                          text: response.result, // Or the Json reply from the parser
                          type: "error" // also warning and information
                        }]);
                        result_code.css("color", "red");
                    }
                    else {
                        editor.getSession().clearAnnotations();
                        result_code.css("color", "#555");
                    }
                },
                error: function (xhr, err, traceback) {
                    console.log(xhr, err, traceback);
                }
            })
        });*/

        ace.config.loadModule("ace/ext/emmet", function() {
            ace.require("ace/lib/net").loadScript("https://cloud9ide.github.io/emmet-core/emmet.js", function() {
                editor.setOption("enableEmmet", true);
            });
        });

        ace.config.loadModule("ace/ext/language_tools", function() {

            editor.setOptions({
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            });
        });
    } else {
        document.body.insertAdjacentHTML("afterbegin", '<div class="bs-docs-example">\
            <div class="alert alert-error">\
              <button type="button" class="close" data-dismiss="alert">\xd7</button>\
              <strong>Oh No!</strong> Couldn\'t load <code>build/src/ace.js</code>.<br>\
                You can build it by running <code>npm install ; node Makefile.dryice.js</code><br>\
                Or download older version by running <code>git submodule update --init --recursive</code><br>\
            </div>\
          </div>');
        console.log("error");
    }

    $(".execute-button").click(function (e) {
       e.preventDefault();
       var code = editor.getValue();
            $.ajax({
                url: "/execute",
                type: "POST",
                data: code,
                processData: false,
                contentType: false,
                success: function (response) {
                    var result_code = $(".code-result");
                    result_code.html(response.result.replace("\n","<br>"));
                    if (response.line) {
                        editor.getSession().setAnnotations([{
                          row: response.line,
                          column: 0,
                          text: response.result, // Or the Json reply from the parser
                          type: "error" // also warning and information
                        }]);
                        result_code.css("color", "red");
                    }
                    else {
                        editor.getSession().clearAnnotations();
                        result_code.css("color", "#555");
                    }
                },
                error: function (xhr, err, traceback) {
                    console.log(xhr, err, traceback);
                }
            })
    });

});