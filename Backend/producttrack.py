
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
            abort="rollback"
            cursor.execute(abort)
            sql = "SELECT COUNT(*) , SUM(productprice)  FROM productdetails  WHERE addedby='{0}';".format(_sellerid)  
            cursor.execute(sql)
            row = cursor.fetchone()
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
            abort="rollback"
            cursor.execute(abort)
            sql= "SELECT COUNT(*) ,SUM(productprice) from orders o inner join users u on o.user_id=u.user_id inner join productdetails p on o.product_id=p.product_id where addedby='{0}';".format(_sellerid)  
            cursor.execute(sql)
            row = cursor.fetchone()
           
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
            abort="rollback"
            cursor.execute(abort)
            sql = "INSERT INTO orders (user_id , product_id , address ,email_id )  VALUES ('{0}' ,'{1}','{2}','{3}')".format(_userid, _productid,_address,_emailid)   
                    
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

@producttrackCustomer.route('/OrderProducts', methods=['POST', 'GET'])
def orderproductlists():
    _json = request.json 
    _userid =  _json['user_id']
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    # validating the received values
    if request.method == 'POST': 
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        abort="rollback"
        cursor.execute(abort)
        sql = "select p.productname , p.productprice , p.productdescrb , p.imgurl , p.product_id , o.order_date , o.ship_date , o.address , o.is_delivered , o.order_id , o.email_id from orders o inner join productdetails p on o.product_id= p.product_id where user_id='{0}';".format(_userid) 
        cursor.execute(sql)
        row = cursor.fetchall() 
         
        if row:
            if row != None:
                cursor.close()
                output = []
                for s in row:
                    output.append({
                                    "product_name": s[0],
                                    "product_price": s[1],
                                      "product_describtion":s[2],
                                    "product_imgurl":s[3],
                                    "product_id": s[4],
                                    "order_date":s[5],
                                    "ship_date":s[6],
                                    "product_address":s[7],
                                    "product_delivered":s[8],
                                    "order_id":s[9],
                                    "user_email":s[10]
                                  
                
                                    })
                return {"data" : output}

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})

@producttrackCustomer.route('/trackorder', methods=['POST', 'GET'])
def trackproductorder():
    _json = request.json 
    _orderid =  _json['order_id']
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    # validating the received values
    if request.method == 'POST': 
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        abort="rollback"
        cursor.execute(abort)
        sql = "select p.productname , p.productprice , p.imgurl , p.product_id , o.order_date , o.ship_date , o.address , o.is_delivered , o.order_id , o.email_id , p.productdescrb from orders o inner join productdetails p on o.product_id= p.product_id where o.order_id='{0}' ;".format(_orderid) 
        cursor.execute(sql)
        row = cursor.fetchall() 
        
        if row:
            if row != None:
                cursor.close()
                output = []
                for s in row:
                    output.append({
                                    "product_name": s[0],
                                    "product_price": s[1],
                                    "product_imgurl":s[2],
                                    "product_id": s[3],
                                    "order_date":s[4],
                                    "ship_date":s[5],
                                    "product_address":s[6],
                                    "product_delivered":s[7],
                                    "order_id":s[8],
                                    "user_email":s[9],
                                    "product_description":s[10]
                                    })
                return {"data" : output,"status":True}

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})

