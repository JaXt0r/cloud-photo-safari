from flask import Flask
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)


from . import endpoints


api.add_resource(endpoints.Index, '/')
