


import pyrebase
import os


config = {
    "apiKey": "AIzaSyB1QbSomFK8Z7BxuwL7XTCnHLd21fGu6qk",
 "authDomain": "shopperz-85b8e.firebaseapp.com",
 "projectId": "shopperz-85b8e",
 "databaseURL": "https://shopperz-85b8e.firebaseio.com",
 "storageBucket": "shopperz-85b8e.appspot.com",
 "messagingSenderId": "792087668774",
 "appId": "1:792087668774:web:f807c66c66d4dd49cbdee7",
 "measurementId": "G-81H8RPM9RJ"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
my_image = "myself.jpg"

# Upload Image
storage.child(my_image).put(my_image)
print("uploaded success")

# Download Image
# storage.child(my_image).download(filename="logoforwebsite.jpg", path=os.path.basename(my_image))

# Get url of image
# auth = firebase.auth()
# email = "pavankumar.online1@gmail.com"
# password = "1234567"
# user = auth.sign_in_with_email_and_password(email, password)
# url = storage.child(my_image).get_url(user['idToken'])
# print(url)