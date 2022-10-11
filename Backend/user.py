
from flask import Flask, jsonify, request, session , render_template ,Blueprint
from flask_cors import CORS  
import psycopg2
import psycopg2.extras
import re
from main import conn
users = Blueprint('users', __name__)
CORS(users)


@users.route('/userlogin',methods=['POST', 'GET'])
def login():
    _json = request.json
    # requesting values from the user to login
    _emailid = _json['email_id']
    _password = _json['password']  

    # validating the received values
    if request.method == 'POST':
        if _emailid and _password:
            # check user exists
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            # query to fetch the user details
            sql = "SELECT * FROM users WHERE email_id ='{0}'".format(_emailid)
    
            cursor.execute(sql)
            row = cursor.fetchone()
            try:
                email = row['email_id']
                user_id = row['user_id']
                password = row['password']
            except:
                pass 
            if (row == None):
                resp = jsonify(
                    {'message': 'Entered email id does not exist, Please register', 'status': False})
                resp.status_code = 200
                return resp
            # checking the user password is correct or not
            if row:
                if (_password==password):
                    cursor.close()
                    resp = jsonify({'message': 'Login Successfully',
                                   'user_id': user_id, 'email_id': email, 'status': True})
                    resp.status_code = 200
                    return resp

                # for invalid password
                else:
                    resp = jsonify(
                        {'message': 'Please enter correct password', 'status': False})
                    resp.status_code = 200
                    return resp

            # invalid email
            else:
                resp = jsonify(
                    {'message': 'Enter valid email', 'status': False})
                resp.status_code = 200
                return resp

        # empty values of email , password
        elif _emailid == '' or _password == '':
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


email_valid = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@users.route('/userregister',methods=['POST', 'GET'])
def register():
    _json = request.json
    # requesting values from the user to login
    _emailid = _json['email_id']
    _password = _json['password']  

    if request.method == 'POST':
        if _password and _emailid :
            if(re.search(email_valid, _emailid)):
                cursor = conn.cursor()
                cursor.execute(
                            "SELECT * FROM users WHERE email_id ='{0}'".format(_emailid))
                        
                if cursor.fetchone() is not None:
                    resp = jsonify(
                                {'message': 'Entered email id already exist , Please login', 'alreadyexist': True, "status": False})
                    resp.status_code = 200
                    return resp
                sql = "INSERT INTO users (password , email_id)  VALUES ('{0}' ,'{1}')".format(_password, _emailid)
           
                cursor.execute(sql)
                    
                conn.commit()
                cursor.close()
                resp = jsonify(
                            {'message': 'Account Created Successfully', "status": True})
                resp.status_code = 200
                return resp

            # For checking the invalid email
            else:
                resp = jsonify(
                    {'message': 'Please enter valid email id', 'status': False})
                resp.status_code = 200
                return resp

        # For empty values of email , password , username
        elif _password == '' or _emailid == '':
            resp = jsonify(
                {'message': 'Please enter missed keys', 'status': False})
            resp.status_code = 200
            return resp
    elif request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp


@users.route('/User_Addtocart', methods=['POST', 'GET'])
def AddtoCart():
    _json = request.json
    _productid =  _json['product_id']
    _emailid =  _json['email_id']
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if request.method == 'POST':
        if _productid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql = "INSERT INTO usersaddcart (email_id , product_id)  VALUES ('{0}' ,'{1}')".format(_emailid,_productid)
            cursor.execute(sql)
            conn.commit()
            cursor.close()
            return jsonify({'message': 'Added to cart Successfully', 'status': True})

     
        else:
            return jsonify({'message': 'Product ID is missing', 'status': False})
        
            # checking the token access and reseting the password
           

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})



@users.route('/UsercartIteams', methods=['POST', 'GET'])
def GetCart():
    _json = request.json
    _email=_json['email_id']


    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    # validating the received values
    if request.method == 'POST':
   # Bad request of invalid method
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql = ''' select p.product_id,productname,productdescrb,productprice,category,imgurl,email_id from productdetails p inner join usersaddcart c on p.product_id=c.product_id where email_id='{}'  '''.format(_email)
            cursor.execute(sql)
            row = cursor.fetchall()
            print(row)
            # checking the token access and reseting the password
            if row:
                # if 'username' in session:
                if row != None:
                    conn.commit()
                    cursor.close()
                    output = []
                    for s in row:
                        output.append({"product_id": s[0],
                                       "productdescription": s[2],
                                       "productname": s[1],
                                       "productprice": s[3],
                                       "productimgurl":s[5]
                                       })

                    # print(output)
                    return {"data" : output }
            else:
                return jsonify({'message': 'Add to cart is empty , Add your favorite items first.', 'status': False})


    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})


@users.route('/UserRemovecart', methods=['POST', 'GET'])
def RemoveCart():
    _json = request.json
    _productid =  _json['product_id']
    _email =  _json['email_id']
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if request.method == 'POST':
        if _productid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            sql = "DELETE FROM usersaddcart WHERE product_id ='{0}' AND email_id='{1}'".format(_productid,_email) 
            cursor.execute(sql)
            conn.commit()
            cursor.close()
            return jsonify({'message': 'Removed from cart', 'status': True})

     
        else:
            return jsonify({'message': 'Product ID is missing', 'status': False})
        
            # checking the token access and reseting the password
           

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})
