import { initializeApp } from 'firebase/app'
import {
    getFirestore, //tpye of database
    collection, //same as a column for mysql 
    onSnapshot, //same as getDocs but it does it without the need to reload page 
    getDocs, //read documents in collections
    query, //get certain sections in database 
    where, //an event to find things in getDocs 
    serverTimestamp, //gets the time when user does stuff
    addDoc, // add documents to collections with auto ids 
    setDoc, // for custom ids 
    doc, //for custom ids 
} from 'firebase/firestore'

import {
    getAuth, //login/logout in authentication 
    signInWithPopup, //the pop up will appear
    GoogleAuthProvider, // sign up with google 
    signOut, //loging out users 
    onAuthStateChanged, //checks when the user logs in and out 
} from 'firebase/auth'

import {
    getAnalytics,
    logEvent //events logged to firebase analytics 
} from "firebase/analytics";


//Copy of 491 project 
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}


// init firebase
const app = initializeApp(firebaseConfig)

// computer's current time  
const today = new Date()
var h = today.getHours()

// init services
const db = getFirestore(app)
const auth = getAuth(app) // authentication
const provider = new GoogleAuthProvider(app)
const analytics = getAnalytics(app)

// collection ref
const colRef = collection(db, 'signup-users')

//real time data collection,post automatically to firestore database 
onSnapshot(colRef, (snapshot) => {
    let userdata = []
    snapshot.docs.forEach(doc => {
        userdata.push({...doc.data(), id: doc.id })
    })
})

//get current url 
function getUrl() {

    //console.log(window.location.pathname)
    var fullUrl = window.location.pathname.split("/");
    var url = fullUrl[1] //the name.html, part 
        //console.log(url)
    return url
}

var url = getUrl();
//console.log(url)

//Custom logEvents 
window.onunload = () => {
    //console.log("words: " + url)

    if (url == "/Lesson1.html") {
        console.log(url)
        logEvent(analytics, 'les1_clicks', {})
    }
    if (url == "Lesson2.html") {
        logEvent(analytics, 'les2_clicks', {})
    }
    if (url == "Lesson3.html") {
        logEvent(analytics, 'les3_clicks', {})
    }
    if (url == "Lesson4.html") {
        logEvent(analytics, 'les4_clicks', {})
    }
    if (url == "Lesson5.html") {
        logEvent(analytics, 'les5_clicks', {})
    }
    if (url == "Lesson6.html") {
        logEvent(analytics, 'les6_clicks', {})
    }
    if (url == "Lesson7.html") {
        logEvent(analytics, 'les7_clicks', {})
    }
    if (url == "Lesson8.html") {
        logEvent(analytics, 'les8_clicks', {})
    }
    if (url == "Lesson9.html") {
        logEvent(analytics, 'les9_clicks', {})
    }
    if (url == "Lesson10.html") {
        logEvent(analytics, 'les10_clicks', {})
    }
}


// Version3: signup new users, check is user already have an accnount  
const addSignupForm = document.querySelector('.add')

if (addSignupForm) {

    addSignupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        signInWithPopup(auth, provider) //Redirect does not work nothing saves to db 

        .then((result) => {
            const user = result.user
                //console.log(user)

            var getGender = addSignupForm.gender.value

            if (getGender == "Other") { //When user picks other as a gender 
                var otherGender = addSignupForm.other.value //holds the real gender of user 
                getGender = otherGender
                    //console.log("GENDER:",getGender) //error check
            } else {
                //console.log("GENDER NOT OTHER")//error check
            }

            const docData = {
                phone: addSignupForm.phone.value,
                age: addSignupForm.age.value,
                annual_income: addSignupForm.annual_income.value,
                comorbid_conditions: addSignupForm.comorbid_conditions.value,
                current_employment_status: addSignupForm.current_employment_status.value,
                current_health_insurance_status: addSignupForm.current_health_insurance_status.value,
                current_marital_status: addSignupForm.current_marital_status.value,
                education: addSignupForm.education.value,
                ethnicity: addSignupForm.ethnicity.value,
                gender: getGender,
                general_self_rated_health: addSignupForm.general_self_rated_health.value,
                health_literacy: addSignupForm.health_literacy.value,
                height: addSignupForm.height.value,
                weight: addSignupForm.weight.value,

                social_isolaton_1: addSignupForm.social_isolaton_1.value,
                social_isolaton_2: addSignupForm.social_isolaton_2.value,
                social_isolaton_3: addSignupForm.social_isolaton_3.value,
                social_isolaton_4: addSignupForm.social_isolaton_4.value,
                social_isolaton_5: addSignupForm.social_isolaton_5.value,
                social_isolaton_6: addSignupForm.social_isolaton_6.value,
                social_isolaton_7: addSignupForm.social_isolaton_7.value,
                social_isolaton_8: addSignupForm.social_isolaton_8.value,
                social_isolaton_9: addSignupForm.social_isolaton_9.value,
                social_isolaton_10: addSignupForm.social_isolaton_10.value,
                social_isolaton_11: addSignupForm.social_isolaton_11.value,
                social_isolaton_12: addSignupForm.social_isolaton_12.value,
                social_isolaton_13: addSignupForm.social_isolaton_13.value,
                social_isolaton_14: addSignupForm.social_isolaton_14.value,
                social_isolaton_15: addSignupForm.social_isolaton_15.value,
                social_isolaton_16: addSignupForm.social_isolaton_16.value,
                social_isolaton_17: addSignupForm.social_isolaton_17.value,
                social_isolaton_18: addSignupForm.social_isolaton_18.value,
                social_isolaton_19: addSignupForm.social_isolaton_19.value,
                social_isolaton_20: addSignupForm.social_isolaton_20.value,

                risk_for_opioid_misuse_1: addSignupForm.risk_for_opioid_misuse_1.value,
                risk_for_opioid_misuse_2: addSignupForm.risk_for_opioid_misuse_2.value,
                risk_for_opioid_misuse_3: addSignupForm.risk_for_opioid_misuse_3.value,
                risk_for_opioid_misuse_4: addSignupForm.risk_for_opioid_misuse_4.value,
                risk_for_opioid_misuse_5: addSignupForm.risk_for_opioid_misuse_5.value,
                risk_for_opioid_misuse_6: addSignupForm.risk_for_opioid_misuse_6.value,
                risk_for_opioid_misuse_7: addSignupForm.risk_for_opioid_misuse_7.value,
                risk_for_opioid_misuse_8: addSignupForm.risk_for_opioid_misuse_8.value,
                risk_for_opioid_misuse_9: addSignupForm.risk_for_opioid_misuse_9.value,
                risk_for_opioid_misuse_10: addSignupForm.risk_for_opioid_misuse_10.value,
                risk_for_opioid_misuse_11: addSignupForm.risk_for_opioid_misuse_11.value,
                risk_for_opioid_misuse_12: addSignupForm.risk_for_opioid_misuse_12.value,
                risk_for_opioid_misuse_13: addSignupForm.risk_for_opioid_misuse_13.value,

                createdAt: serverTimestamp(),
                name: user.displayName,
            }
            var email = user.email
            var emailType = provider.providerId //for logEvent

            //Check if user already have ancount ? 
            const q = query(collection(db, 'signup-users'), where("createdAt", "!=", ""))
            getDocs(q).then((docSnap) => {
                let oldUserEmail = [];
                docSnap.forEach((doc) => {
                        oldUserEmail.push(doc.id)
                    })
                    //console.log(oldUserEmail)
                var sameCount = 0
                for (let i = 0; i < oldUserEmail.length; i++) {
                    if (email == oldUserEmail[i]) { //found one old email thats the same as new email 
                        sameCount = 1
                    }
                }
                if (sameCount != 1) {
                    //console.log('SNED: '+email)
                    logEvent(analytics, 'sign_up', {
                        method: emailType
                    })
                    setDoc(doc(db, 'signup-users/', email), docData) //makes custom ids as emails 
                } else {
                    //console.log('NOT SEND: '+email)
                    alert("You already have an account")
                }
            })

            //var phoneNum = addSignupForm.phone.value
            //setDoc(doc(db,'signup-users/',phoneNum),docData) //makes custom ids as phone numbers 
            addSignupForm.reset() //clears the page 
        })
    })
}


//Version 3: add Morning form question, now with analytics
const unsubAuthMorning = onAuthStateChanged(auth, (user) => {
    if (user != null) {
        const morningForm = document.querySelector('.morningAdd')
        morningForm.addEventListener('submit', (e) => {
            e.preventDefault()

            var timeStamp = String(new Date()) //date off user computer 
            var email = user.email

            logEvent(analytics, 'morning_submits', {
                userEmail: email
            })

            const docData = {
                createdAt: serverTimestamp(),
                quality_sleep: morningForm.sleep.value,
            }
            setDoc(doc(db, 'signup-users/', email, '/morning_questions/', timeStamp), docData) //doc(db,'collection/',id,'/subcollection',subid)

            morningForm.reset() //clears the page 

            setTimeout(function() {
                window.alert("Successfully Submitted") //alerting client they have submitted their response
            }, 10)

            setTimeout(function() {
                    signOut(auth)
                    window.location = 'index.html'
                }, 5000) // 5 sec delay
        })

    } else {
        //console.log('user status changed: ', user)//tells when the user logs in and out 
        signOut(auth)
            //window.location = 'index.html' //goes to home page 
    }
})



// Version1: logging out 
const logoutButton = document.querySelector('.logout')

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                // console.log('User signed out')//old log check
                window.location = 'index.html' //goes to home page
            })
            .catch((err) => {
                //console.log(err.message)
            })
    })
}

const registerFunction = document.querySelector('.register')

if (registerFunction) {

    registerFunction.addEventListener('click', (e) => {
        e.preventDefault()
        console.log("user pressed register")
        window.location = "signup.html"

    })
}
//Version 4: user logs into their account, logged to firebase analytics as login 
const loginFuntion = document.querySelector('.login')
loginFuntion.addEventListener('click', (e) => {
    e.preventDefault()

    signInWithPopup(auth, provider) //Redirect does not work nothing saves to db 

    .then((result) => {
        const user = result.user
            //console.log(user)

        var emailType = provider.providerId //for logEvent
        var email = user.email
        logEvent(analytics, 'login', {
            method: emailType
        })

        //Check if user already have ancount ? 
        const q = query(collection(db, 'signup-users'), where("createdAt", "!=", ""))
        getDocs(q).then((docSnap) => {
            let oldUserEmail = [];
            docSnap.forEach((doc) => {
                    oldUserEmail.push(doc.id)
                })
                //console.log(oldUserEmail)
            var sameCount = 0
            for (let i = 0; i < oldUserEmail.length; i++) {
                if (email == oldUserEmail[i]) { //found one old email thats the same as new email 
                    sameCount = 1
                }
            }
            if (sameCount == 1) {
                //console.log('SNED: '+email)
                var hour = h //using the computer time 

                if (hour < 18) { //morning 12am to 6pm
                    //if (hour = 17){
                    window.location = 'morning.html'
                }
                if (hour >= 18) { //evening 6pm  
                    window.location = 'evening.html'
                }

            } else {
                //console.log('NOT SEND: '+email)
                alert("You don't have an account.")
                signOut(auth)
            }
        })

    })
})



//Version3: add Evening form question, now with analytics
const unsubAuthEvening = onAuthStateChanged(auth, (user) => {
    if (user != null) {
        const eveningForm = document.querySelector('.eveningAdd')
        eveningForm.addEventListener('submit', (e) => {
            e.preventDefault()

            var timeStamp = String(new Date()) //date off user computer 
            var email = user.email

            logEvent(analytics, 'evening_submits', {
                userEmail: email
            })

            const docData = {
                alcohol_consumption: eveningForm.alcohol_consumption.value,
                mood: eveningForm.mood.value,

                exercise: eveningForm.exercise.value,
                arryExerciseYes1: [eveningForm.exercise_time1.value, eveningForm.exercise_description1.value, eveningForm.duration1.value],
                arryExerciseYes2: [eveningForm.exercise_time2.value, eveningForm.exercise_description2.value, eveningForm.duration2.value],
                arryExerciseYes3: [eveningForm.exercise_time3.value, eveningForm.exercise_description3.value, eveningForm.duration3.value],
                arryExerciseYes4: [eveningForm.exercise_time4.value, eveningForm.exercise_description4.value, eveningForm.duration4.value],

                medicine: eveningForm.medicine.value,
                arryMedicineYes1: [eveningForm.medicine_time1.value, eveningForm.medicine_description1.value, eveningForm.pain1.value, eveningForm.non_opioid_description1.value],
                arryMedicineYes2: [eveningForm.medicine_time2.value, eveningForm.medicine_description2.value, eveningForm.pain2.value, eveningForm.non_opioid_description2.value],
                arryMedicineYes3: [eveningForm.medicine_time3.value, eveningForm.medicine_description3.value, eveningForm.pain3.value, eveningForm.non_opioid_description3.value],
                arryMedicineYes4: [eveningForm.medicine_time4.value, eveningForm.medicine_description4.value, eveningForm.pain4.value, eveningForm.non_opioid_description4.value],
                arryMedicineYes5: [eveningForm.medicine_time5.value, eveningForm.medicine_description5.value, eveningForm.pain5.value, eveningForm.non_opioid_description5.value],
                createdAt: serverTimestamp(),
            }
            setDoc(doc(db, 'signup-users/', email, '/evening_questions/', timeStamp), docData) //doc(db,'collection/',id,'/subcollection',subid)

            eveningForm.reset() //clears the page 

            setTimeout(function() {
                window.alert("Successfully Submitted") //alerting client they have submitted their response
            }, 10)

            setTimeout(function() {
                signOut(auth)
                window.location = 'index.html'
            }, 5000)
        })

    } else {
        //console.log('user status changed: ', user)//tells when the user logs in and out 
        signOut(auth)
            //window.location = 'index.html' //goes to home page 
    }
})


//Code for Quizzes

var lessonOneAnswers = {

    answer1: 'B',
    answer2: 'False',
    answer3: 'False',
    answer4: 'B',
    answer5: 'True',
}

var lessonTwoAnswers = {

    answer1: 'A',
    answer2: 'B',
    answer3: 'B',
    answer4: 'B',
    answer5: 'A'
}

var lessonThreeAnswers = {

    answer1: 'False',
    answer2: 'True',
    answer3: 'True',
    answer4: 'False',
    answer5: 'True'
}

var lessonFourAnswers = {

    answer1: 'False',
    answer2: 'False',
    answer3: 'True',
    answer4: 'False',
    answer5: 'True'

}


function calculateScore(buttonClass, lessonClass, scoreClass, answerDictionary) {

    const submitScoreButton = document.querySelector(buttonClass) //buttonClass

    if (submitScoreButton) {

        var clicked = false
        console.log("found submit button")


        submitScoreButton.addEventListener('click', (e) => {

            //add a buffer statement here 
            if (clicked == false) {

                try {

                    clicked = true

                    e.preventDefault()
                    console.log("user pressed kerrr")

                    const lessonForm = document.querySelector(lessonClass) //lessonClass //const variables cannot be later changed/manipulated
                    const scoreText = document.querySelector(scoreClass) //scoreClass

                    console.log(scoreText)

                    const questionOne = lessonForm.drone1.value
                    const questionTwo = lessonForm.drone2.value
                    const questionThree = lessonForm.drone3.value
                    const questionFour = lessonForm.drone4.value
                    const questionFive = lessonForm.drone5.value

                    console.log(questionTwo, questionThree, questionFive)

                    var x = 0;

                    if (lessonForm) {

                        //Psuedocode; if questionOne == lessOneAnswers['answer2']: x = x + 1 print("correct answer"); make this a switch statement instead

                        if (questionOne == answerDictionary['answer1']) { //if questionTwo == answerDictionary['answer2']
                            x = x + 1;
                            console.log("correct answer")
                        } else { console.log("was wrong") }


                        if (questionTwo == answerDictionary['answer2']) { //if questionTwo == answerDictionary['answer2']
                            x = x + 1;
                            console.log("correct answer")
                        } else { console.log("was wrong") }

                        if (questionThree == answerDictionary['answer3']) {
                            x = x + 1;
                            console.log("correct answer #3")
                        } else { console.log("was wrong") }


                        if (questionFour == answerDictionary['answer4']) { //if questionTwo == answerDictionary['answer2']
                            x = x + 1;
                            console.log("correct answer")
                        } else { console.log("was wrong") }


                        if (questionFive == answerDictionary['answer5']) {
                            x = x + 1;
                            console.log("correct answer #3")
                        }

                        var score = (x / 5) * 100
                        scoreText.innerHTML = "Score: " + score + "%" + " (" + x + "/5)"
                        console.log("Score: " + x + "/5")
                            //window.alert("Score: ", x)

                        submitScoreButton.disabled = true

                        setTimeout(function() {
                                lessonForm.reset()
                                scoreText.innerHTML = ""
                                clicked = false
                                submitScoreButton.disabled = false
                            }, 6000) //6 seconds  

                    } else {
                        console.log("wrong page")
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("okkk")
            }
        })
    }
}



calculateScore(".submit_1", ".lessonOne", ".scoretext", lessonOneAnswers)
calculateScore(".submit_2", ".lessonTwo", ".scoretext", lessonTwoAnswers)




//if we want to calculateScore function on Lesson2.html we would do calculateScore(".submit_2", ".lessonTwo", etc..)

//REMINDER 
//create a function that will allow the ability submit answers dynamiallyc, no need to make 100 variables for each submit button . u can return values instead.
//Difference between var, let, and const: https://www.geeksforgeeks.org/difference-between-var-let-and-const-keywords-in-javascript/
