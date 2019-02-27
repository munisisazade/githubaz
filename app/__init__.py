from flask import Flask
from instance.config import app_config
from instance import BASE_DIR
import os


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile(os.path.join(BASE_DIR, 'instance/config.py'))

    from flask import render_template, jsonify, request
    import time
    import subprocess

    @app.route("/", methods=["GET"])
    def index_page():
        context = {"data": [1,2,3,4]}
        return render_template("home/index.html", **context)

    @app.route("/execute", methods=["POST"])
    def run_code_snipped():
        code = request.data.decode("utf-8")
        this_time = time.time()
        compiler_file = os.path.join(BASE_DIR, "compiler/tmp", str(this_time) + ".py")
        file = open(compiler_file, "w")
        print()
        execution = """import traceback, sys
try:
    {}
except:
    exc_type, exc_obj, exc_tb = sys.exc_info()
    print("LINE:"+str(exc_tb.tb_lineno))
    print("ERROR:"+traceback.format_exc())""".format("\n    ".join(code.split("\n")))
        file.write(execution)
        file.close()
        cmd = subprocess.Popen(".venv/bin/python " + compiler_file,shell=True,
                               stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        result = cmd.stdout.read().decode("utf-8")
        print("Birinci ele => ",result.split("\n")[0])
        if len(result.split("LINE:")) > 1:
            line = result.split("LINE:")[1].split("\n")[0]
        else:
            line = result.split("LINE:")[0].split("\n")[0]
        line = int(line) - 3 if line != "" else None
        os.remove(compiler_file)
        return jsonify({
            "result": result.split("ERROR:")[1].replace("line {}".format(line+2),"line {}".format(line)),
            "line": line
        })

    return app
