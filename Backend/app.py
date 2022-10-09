# -*- coding: utf-8 -*-
# Main file to access all API'S
from flask import Flask
from flask_cors import CORS
from main import sellers
from user import users
from flask_mail import Mail, Message


app = Flask(__name__,template_folder='template')
app.config['SECRET_KEY'] = 'Shoppetzkey'
CORS(app)

app.register_blueprint(sellers)
app.register_blueprint(users)

if __name__ == '__main__':
     app.run(debug=True)
#     app.run(host='0.0.0.0', port=5000)