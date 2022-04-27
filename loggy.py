from os import path
from flask import Flask, render_template, abort, redirect, url_for, send_from_directory


####################################################################################################################################
# Build log data
import json

log_data = {}
def load_json_data():
    with open("./config/config.json", "r") as jsonfile:
        return json.load(jsonfile)
log_data = load_json_data()

####################################################################################################################################
# Flask app

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html', log_json=log_data)

@app.route('/logs/<app>/<file>')
def get_log(app: str, file):
    file_path = f'./logs/{app}/{file}'

    # Little bit of sanitization
    is_dodgy = False
    if '/' in app or '/' in file:
        is_dodgy = True
    elif '..' in app or '..' in file:
        is_dodgy = True

    if not path.isfile(file_path) or is_dodgy:
        abort(404)
    with open(file_path, 'r') as f:
        return render_template('log.html', logs=f.readlines())

@app.route('/reload')
def reload():
    global log_data
    log_data = load_json_data()
    return redirect(url_for('root'))

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
            path.join(app.root_path, 'static'),
            'favicon.ico',
            mimetype='image/vnd.microsoft.icon'
        )