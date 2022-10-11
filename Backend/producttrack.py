
from flask import Flask, jsonify, request, session , render_template ,Blueprint
from flask_cors import CORS  
import psycopg2
import psycopg2.extras
import re
from main import conn
producttrackCustomer = Blueprint('producttrackCustomer', __name__)
CORS(producttrackCustomer)


@producttrackCustomer.route('/productsTrack',methods=['POST', 'GET'])
def TrackProduct():
    _json = request.json
    _sellerid = _json['sellerid'] 
    if request.method == 'POST':
        if _sellerid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql = "SELECT COUNT(*) , SUM(productprice)  FROM productdetails  WHERE addedby='{0}';".format(_sellerid)  
            cursor.execute(sql)
            row = cursor.fetchone()
            print(row)
            if (row == None):
                resp = jsonify(
                    {'message': 'Entered seller id does not exist', 'status': False})
                resp.status_code = 200
                return resp        
            if row:
                cursor.close()
                resp = jsonify({'totalcount': row, 'status': True})
                resp.status_code = 200
                return resp     
        elif _sellerid == '':
            resp = jsonify(
                {'message': 'Please fill your form correctly', 'status': False})
            resp.status_code = 200
            return resp
    # Bad request with invalid method
    elif request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp

@producttrackCustomer.route('/productsTrackTotalincome',methods=['POST', 'GET'])
def TrackProductincome():
    _json = request.json
    _sellerid = _json['sellerid'] 
    if request.method == 'POST':
        if _sellerid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql= "SELECT COUNT(*) ,SUM(productprice) from orders o inner join users u on o.user_id=u.user_id inner join productdetails p on o.product_id=p.product_id where addedby='{0}';".format(_sellerid)  
            cursor.execute(sql)
            row = cursor.fetchone()
            print(row)
            if (row == None):
                resp = jsonify(
                    {'message': 'Entered seller id does not exist', 'status': False})
                resp.status_code = 200
                return resp        
            if row:
                cursor.close()
                resp = jsonify({'totalcount': row, 'status': True})
                resp.status_code = 200
                return resp     
        elif _sellerid == '':
            resp = jsonify(
                {'message': 'Please fill your form correctly', 'status': False})
            resp.status_code = 200
            return resp
    # Bad request with invalid method
    elif request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp


@producttrackCustomer.route('/OrderProduct',methods=['POST', 'GET'])
def Orderproduct():
    _json = request.json
    _productid = _json['product_id'] 
    _userid = _json['user_id'] 
    _address = _json['address'] 
    _emailid = _json['email_id']
    
    if request.method == 'POST':
        if _productid and _userid and _address and _emailid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql = "INSERT INTO orders (user_id , product_id , address ,email_id )  VALUES ('{0}' ,'{1}','{2}','{3}')".format(_userid, _productid,_address,_emailid)   
            print(sql,"************")          
            cursor.execute(sql)
            conn.commit()
            cursor.close()
            resp = jsonify({'message': 'Ordered Success !', 'status': True})
            resp.status_code = 200
            return resp
                     
        if _productid == '' or _userid == '' or _address == '' or _emailid=='':
            resp = jsonify(
                {'message': 'Please enter missid feilds', 'status': False})
            resp.status_code = 200
            return resp
    # Bad request with invalid method
    if request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp
