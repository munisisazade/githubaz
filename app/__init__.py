from flask import Flask
from instance.config import app_config
from instance import BASE_DIR
import os


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile(os.path.join(BASE_DIR, 'instance/config.py'))

    from flask import render_template

    @app.route("/", methods=["GET"])
    def index_page():
        context = {"data": [1,2,3,4]}
        return render_template("home/index.html", **context)

    return app
