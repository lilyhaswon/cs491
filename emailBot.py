#Version 4, send email automaticlly 
import smtplib # for email bot 

#pip install schedule
from schedule import every, repeat,run_pending #automatic 
import time 

from datetime import datetime #computer's date and time 

import firebase_admin 

from firebase_admin import credentials
from firebase_admin import firestore 

CURRENT_TIME = int(datetime.now().time().strftime('%H')) # get current hour off user computer 

#the placement of serviceAccountKey.json matters 
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
 
# init apps 
db = firestore.client()


#CURRENT_TIME = 10

#Version 4, now its automatic 
#Free email bot 

@repeat(every(12).hours) #every 12 hours it will run 
def mail():

    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.ehlo() #security
    smtp.starttls() 
    smtp.ehlo() #security

    ##smtp.login('email',"password")
    smtp.login('testbotok@gmail.com',"botpassword123")

    if CURRENT_TIME < 18: #morning 8am to 6pm
        subject = 'Morning Testing Bot'
        body = 'https://www.cnn.com/'
        print("Morning work:",CURRENT_TIME)
    if CURRENT_TIME >= 18: #evening 6pm 
        subject = 'Evening Testing Bot'
        body = 'Evening link to future website'
        print("Evening work:",CURRENT_TIME)


    msg = f'Subject: {subject}\n\n{body}'


    #sends email based on the hour of day  
    if CURRENT_TIME < 18: #morning 8am to 6pm
        morning_arry = []
        docs = db.collection('signup-users').where("createdAt","!=","").get()
        for doc in docs:
            i = (doc.id)
            
            # smtp.sendmail(SENDER,RECIEVER,msg)
            ## https://myaccount.google.com/lesssecureapps
            smtp.sendmail('testbotok@gmail.com',i,msg)
            morning_arry.append(i)
            print(i,'Current Hour:',CURRENT_TIME) # see all the emails in the terminal  
            smtp.quit()  

    if CURRENT_TIME >= 18: #evening 6pm 
        evening_arry = []
        docs = db.collection('signup-users').where("createdAt","!=","").get()
        for doc in docs:
            i = (doc.id)
            
            # smtp.sendmail(SENDER,RECIEVER,msg)
            ## https://myaccount.google.com/lesssecureapps
            smtp.sendmail('testbotok@gmail.com',i,msg)
            evening_arry.append(i)
            print(i,'Current Hour:',CURRENT_TIME) # see all the emails in the terminal  
            smtp.quit() 

mail()#inital run, run once 

while True:
    run_pending()
    time.sleep(1)
