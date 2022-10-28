from flask import  jsonify, request ,Blueprint
from flask_cors import CORS  
import psycopg2
import re
import os
import random

Local Database connection
DB_HOST = "localhost"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASS = "123456"
  
 

# Connecting postgresql database to the python
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

print("CONNECTED SUCCESSFULLY")

sellers = Blueprint('sellers', __name__)
CORS(sellers)



@sellers.route('/login',methods=['POST', 'GET'])
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
            abort="rollback"
            cursor.execute(abort)
            # query to fetch the user details
            sql = "SELECT * FROM sellers WHERE email_id ='{0}'".format(_emailid)
            cursor.execute(sql)
            row = cursor.fetchone()
          
            try:
                email = row['email_id']
                username = row['username']
                user_id = row['user_id']
                password = row['password']
                profile=row['profileimage']
                
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
                    if profile:
                        firebase = pyrebase.initialize_app(config)
                        storage = firebase.storage()
                        auth = firebase.auth()
                        email = "pavankumar.online1@gmail.com"
                        password = "1234567"
                        user = auth.sign_in_with_email_and_password(email, password)
                        url = storage.child(profile).get_url(user['idToken'])
                        cursor.close()
                        resp = jsonify({'message': 'Login Successfully','seller_id': user_id, 'email_id': email,'username':username, 'profile':url,'status': True})
                        resp.status_code = 200
                        return resp
                    else:
                        url=""
                        cursor.close()
                        resp = jsonify({'message': 'Login Successfully','seller_id': user_id, 'email_id': email,'username':username, 'profile':url,'status': True})
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
  
@sellers.route('/register',methods=['POST', 'GET'])
def register():
    _json = request.json
    # requesting values from the user to login
    _username =  _json['username']
    _emailid = _json['email_id']
    _password = _json['password']  

    if request.method == 'POST':
        if _username and _password and _emailid :
            if(re.search(email_valid, _emailid)):
                cursor = conn.cursor()
                abort="rollback"
                cursor.execute(abort)
                cursor.execute(
                            "SELECT * FROM sellers WHERE email_id ='{0}'".format(_emailid))
                        
                if cursor.fetchone() is not None:
                    resp = jsonify(
                                {'message': 'Entered email id already exist , Please login', 'alreadyexist': True, "status": False})
                    resp.status_code = 200
                    return resp
                sql = "INSERT INTO sellers (username , password , email_id)  VALUES ('{0}' ,'{1}' ,'{2}')".format(
                            _username, _password, _emailid)
           
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
        elif _username == '' or _password == '' or _emailid == '':
            resp = jsonify(
                {'message': 'Please enter missed keys', 'status': False})
            resp.status_code = 200
            return resp
    elif request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp



@sellers.route('/sellerform',methods=['POST', 'GET'])
def sellerform():
    _json = request.json
    # requesting values from the user to login
    _name =  _json['productname']
    _descrb = _json['productdescrb']
    _imageurl = _json['imgurl']  
    _price = _json['productprice']  
    _category = _json['category']
    _sellerid = _json['addedby']
    if request.method == 'POST':
        if _name and _descrb and _imageurl and _price :
            cursor = conn.cursor()
            abort="rollback"
            cursor.execute(abort)
            sql = '''INSERT INTO productdetails (productname , productdescrb , imgurl , productprice , category,addedby)  VALUES ('{0}' ,'{1}' ,'{2}','{3}','{4}','{5}')'''.format(
                            _name, _descrb, _imageurl,_price,_category,_sellerid)
           
            cursor.execute(sql)
                    
            conn.commit()
            cursor.close()
            resp = jsonify({'message': 'Product added Successfully', "status": True})
            resp.status_code = 200
            return resp

        

        # For empty values of email , password , username
        elif _name == '' or _descrb == '' or _imageurl == '' or _price == '':
            resp = jsonify(
                {'message': 'Please fill the form correctly', 'status': False})
            resp.status_code = 200
            return resp
    elif request.method == 'GET':
        resp = jsonify(
            {'message': 'Bad Request! , Please check your request method', 'status': False})
        resp.status_code = 400
        return resp


  


@sellers.route('/Porducts', methods=['POST', 'GET'])
def productlists():
    _json = request.json 
    _category =  _json['category']
    # validating the received values
    if request.method == 'POST': 
   # Bad request of invalid method 
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            if(_category=="Tshirts"):
                sql = "SELECT * FROM productdetails WHERE category='Tshirts'" 
            if(_category=="Womenstop"):
                sql = "SELECT * FROM productdetails WHERE category='Womenstop'"  
            if(_category=="Mensshirt"):
                sql = "SELECT * FROM productdetails WHERE category='Mensshirt'" 
            if(_category=="Jeanspants"):
                sql = "SELECT * FROM productdetails WHERE category='Jeanspants'" 
            if(_category=="kurta"):
                sql = "SELECT * FROM productdetails WHERE category='kurta'"
            if(_category=="womens clothing"):
                sql = "SELECT * FROM productdetails WHERE category='womens clothing'" 
            if(_category=="mens clothing"):
                sql = "SELECT * FROM productdetails WHERE category='mens clothing'"
            if(_category=="jewelery"):
                sql = "SELECT * FROM productdetails WHERE category='jewelery'"
            if(_category=="electronics"):
                sql = "SELECT * FROM productdetails WHERE category='electronics'"
            cursor.execute(sql)
         
            row = cursor.fetchall()  
            # print(row)
            # checking the token access and reseting the password
            if row:
                # if 'username' in session:
                if row != None:
                    cursor.close()
                    output = []
                    for s in row:
                        output.append({"product_id": s[0],
                                       "productdescription": s[2],
                                       "productname": s[1],
                                       "productprice": s[3],
                                       "productimgurl":s[4]
                                       })

                    # print(output)
                    return {"data" : output}

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})


@sellers.route('/Buynow', methods=['POST', 'GET'])
def Buynow():
    _json = request.json
    _productid =  _json['product_id']
    if request.method == 'POST':
        if _productid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            sql = "SELECT * FROM productdetails WHERE product_id='{0}'".format(_productid) 
            cursor.execute(sql)
            row = cursor.fetchall()
  
            if row:
                if row != None:
                    conn.commit()
                    cursor.close()
                    output = []
                    for s in row:
                        output.append({"product_id": s[0],
                                       "productdescription": s[2],
                                       "productname": s[1],
                                       "productprice": s[3],
                                       "productimgurl":s[4]
                                       })

                    # print(output)
                    return {"data" : output,"status":True}

     
        else:
            return jsonify({'message': 'Product ID is missing', 'status': False})
        
            # checking the token access and reseting the password
           

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})



@sellers.route('/Removecart', methods=['POST', 'GET'])
def RemoveCart():
    _json = request.json
    _productid =  _json['product_id']
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if request.method == 'POST':
        if _productid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            sql = "UPDATE productdetails SET addcart = 'False' WHERE product_id='{0}';".format(_productid) 
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


@sellers.route('/SellerProductsList', methods=['POST', 'GET'])
def ProductsList():
    _json = request.json
    _sellerid =  _json['seller_id']
    if request.method == 'POST':
        if _sellerid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            sql = "SELECT *  FROM productdetails WHERE addedby='{0}'".format(_sellerid) 
            cursor.execute(sql)
            row = cursor.fetchall()
         
            if row:
                if row != None:
                    conn.commit()
                    cursor.close()
                    output = []
                    count=0
                    for s in row:
                        count = count+1
                        output.append({"product_id": s[0],
                                       "productdescription": s[2],
                                       "productname": s[1],
                                       "productprice": s[3],
                                       "productimgurl":s[4],
                                       "productcategory":s[5]
                                       })

                    # print(output)
                    return {"data" : output,"productscount":count,"status":True}
            else:
                return {"message" : "SllerId not found","status":False}


     
        else:
            return jsonify({'message': 'Product ID is missing', 'status': False})
        
            # checking the token access and reseting the password
           

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})

@sellers.route('/UpdateProduct',methods=['POST', 'GET'])
def UpdateProducDetails():
    _json = request.json
    _productid = _json['product_id'] 
    _productname = _json['product_name'] 
    _productprice =_json['product_price'].replace('$','')
    _productdescb = _json['product_descrb']
    if request.method == 'POST':
        if _productid and _productname and _productprice and _productdescb:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            sql = "UPDATE productdetails SET  productname='{0}',productprice='{1}', productdescrb='{2}' WHERE product_id={3};".format(_productname,_productprice,_productdescb,_productid)   
                
            cursor.execute(sql)
            conn.commit()
            cursor.close()
            resp = jsonify({'message': 'Updated Success !', 'status': True})
            resp.status_code = 200
            return resp
                     
        if _productid == '' or _productname == '' or _productprice == '' or _productdescb=='':
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


@sellers.route('/RemoveProduct',methods=['POST', 'GET'])
def RemvoveProductSeller():
    _json = request.json
    _productid = _json['product_id']  
    if request.method == 'POST':
        if _productid:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            abort="rollback"
            cursor.execute(abort)
            sql = "DELETE FROM productdetails WHERE product_id={0};".format(_productid)   
                 
            cursor.execute(sql)
            conn.commit()
            cursor.close()
            resp = jsonify({'message': 'Deleted Success !', 'status': True})
            resp.status_code = 200
            return resp
                     
        if _productid == '':
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


@sellers.route('/EditProductDetails', methods=['POST', 'GET'])
def EditProduct():
    _json = request.json 
    _productid =  _json['product_id']
    # validating the received values
    if request.method == 'POST': 
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        abort="rollback"
        cursor.execute(abort)
        sql = "SELECT productname , productprice , category , productdescrb , imgurl , product_id from productdetails WHERE product_id='{0}'".format(_productid) 
        cursor.execute(sql)
        row = cursor.fetchall() 
        # print(row)   
        if row:
            if row != None:
                cursor.close()
                output = []
                for s in row:
                    output.append({
                                    "product_name": s[0],
                                    "product_price": s[1],
                                    "catergory":s[2],
                                    "product_desc":s[3],
                                    "productimgurl":s[4],
                                    "product_id":s[5]
                                    })
                return {"data" : output ,"status":True}

    # For invalid method
    elif request.method == 'POST':
        return jsonify({'message': 'Bad Request! , Please check your request method', 'status': False})
