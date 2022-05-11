#Twilio phone number: +12093912524
#Note: Can only be ran by operator(either the Dr or a member for the team)
#REMINDERS

import schedule
import time
import firebase_admin
from firebase_admin import credentials, firestore

# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

#connecting to firebaseDB
cred = credentials.Certificate("C:/Users/demola.asim/Documents/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
print("the hell is going on")

db = firestore.client()
print(db)

db_collection_users = db.collection('signup-users') #similar to table in mySQL
print(db_collection_users)
doc2 = db_collection_users
doc = db_collection_users.document("adamobbl123@gmail.com")

print("\n\n")
print(doc.get()) #get() method retrieves data 
##print(doc2.get())

def getPhoneNumbers():
    
    #Pseudeocode
    #Step 1. Get all users from firebase db collection 
    #Step 2. Output all the numbers
    #Step 3. Isolate the phone numbers for each user in the collection and store it in a table
    #Step 4. Return the table (assign the table to a variable)
    
    phoneList = []

    for i in doc2.get():
        for k, v in i.to_dict().items():
            if k == "phone":
                print(k, v)
                #print(i.to_dict())
                phoneList.append(v)

    print(phoneList)
    return phoneList

#SMS 
def sendMessageToNumbers():

    phoneNumbers = getPhoneNumbers()

    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure

    account_sid = os.environ['TWILIO_ACCOUNT_SID'] # os.environ = checking within the operating system for certain environmental variables
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    
    client = Client(account_sid, auth_token)

    for i in phoneNumbers:
        try:

            print(account_sid)
            message = client.messages.create(
                                        body='REMINDER: Please login to your account and fill out your questionnaire at http://127.0.0.1:5500/dist/index.html',
                                        from_='+12093912524',
                                        to='+1'+ i #numbers
                                    )

            print(message.sid) 

        except:
            
            print("ERROR.. Line 91, messages sent to " + i + " were not successfully sent.")


#sendMessageToNumbers()

schedule.every().day.at("19:48").do(sendMessageToNumbers)

while True:

    schedule.run_pending()
    time.sleep(1)
 
#once u are able to collect all the users, 
print("\n\n\n\n")








