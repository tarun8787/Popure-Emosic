from django.shortcuts import render, redirect
import subprocess
from django.http import HttpResponse
import numpy as np
import cv2
import tensorflow as tf
import webbrowser
import os
from django.conf import settings
import speech_recognition as sr
import logging

logger = logging.getLogger(__name__)

def login(request):
    return render(request, 'tarun_login.html')

def signup(request):
    return render(request, 'tarun_signup.html')

def main(request):
    return render(request, 'main.html')

def emoji_generator(request):
    return render(request, 'emoji_generator.html')

def emotion_by_face(request):
    return render(request, 'emotion_by_face.html')  

def podcast(request):
    return render(request, 'tarun_podcast.html')

def result(request):
    return render(request, 'result.html')

def forgot(request):
    return render(request, 'forgot.html')

def voice_recog(request):
    return render(request, 'voice_recog.html')

def search(request):
    return render(request, 'search.html')

def about(request):
    return render(request, 'about.html')

def logout(request):
    return render(request, 'tarun_login.html')


# def execute_script(request):
#     try:
#         subprocess.run(["python", "/tarun.py"], check=True)
#         return HttpResponse("Script executed successfully", status=200)
#     except Exception as e:
#         return HttpResponse(f"Failed to execute script: {str(e)}", status=500)


def emotion_detection(request):
    # Load the cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Load the emotion detection model
    emotion_model = tf.keras.models.load_model('emotion_model.hdf5')

    # Load the age detection model

    age_net = cv2.dnn.readNetFromCaffe('age_deploy.prototxt', 'age_net.caffemodel')

    # Define the emotion labels
    emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

    # Define the age labels
    ageList = ['(0-6)', '(6-12)', '(12-18)', '(18-30)', '(30-45)', '(45-60)', '(60-100)']

    # Define the function for emotion detection
    def detect_emotion(img):
        # Preprocess the image for emotion detection
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_img = cv2.resize(gray_img, (64, 64))
        gray_img = gray_img.astype("float32") / 255.0
        gray_img = np.expand_dims(gray_img, 0)
        gray_img = np.expand_dims(gray_img, -1)

        # Predict the emotion
        emotion = emotion_model.predict(gray_img)[0]
        emotion = emotion_labels[np.argmax(emotion)]
        return emotion

    # Load the video capture object
    cap = cv2.VideoCapture(0)

    # Create a directory to store the captured frames
    frames_dir = os.path.join(settings.MEDIA_ROOT, 'frames')
    os.makedirs(frames_dir, exist_ok=True)

    while True:
        # Read a frame from the video capture object
        ret, frame = cap.read()

        # Detect the faces in the frame
        faces = face_cascade.detectMultiScale(frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Draw a rectangle around the faces and detect emotions and age
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)
            roi_color = frame[y:y+h, x:x+w]

            # Detect the emotion
            emotion = detect_emotion(roi_color)

            # Add the emotion and age labels to the frame
            blob = cv2.dnn.blobFromImage(roi_color, 1.0, (227, 227), (78.4263377603, 87.7689143744, 114.895847746), swapRB=False)
            age_net.setInput(blob)
            age_preds = age_net.forward()
            # age = age_preds[0][0]*100
            age = ageList[age_preds[0].argmax()]
            
            cv2.putText(frame, "Emotion: " + emotion, (x, y-60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(frame, "Age: " + age, (x, y-30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        # Show the frame
        cv2.imshow('Face and Emotion Detection', frame)

        # Exit the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
        # Get the current age and emotion
            age_list = []
            emotion_list = []
            for (x, y, w, h) in faces:
                roi_color = frame[y:y+h, x:x+w]
                blob = cv2.dnn.blobFromImage(roi_color, 1.0, (227, 227), (78.4263377603, 87.7689143744, 114.895847746), swapRB=False)
                age_net.setInput(blob)
                age_preds = age_net.forward()
                # age = age_preds[0][0]*100
                age = ageList[age_preds[0].argmax()]
                age_range = age.split('-')
                min_age = int(age_range[0][1:])
                max_age = int(age_range[1][:-1])
                age = (min_age + max_age) // 2

                age_list.append(int(age))
                emotion = detect_emotion(roi_color)
                emotion_list.append(emotion)
            
            # Print and store the results
            print("Age:", age_list)
            print("Emotion:", emotion_list)
            if emotion_list[0] == 'happy':
                query = 'happy mood songs playlist for ' + str(age_list[0]) + ' year person'
            elif emotion_list[0] == 'sad':
                query = 'happy mood songs playlist for ' + str(age_list[0]) + ' year person'
            elif emotion_list[0] == 'angry':
                query = 'soothing mood songs playlist for ' + str(age_list[0]) + ' year person'
            elif emotion_list[0] == 'surprise':
                query = 'jolly mood songs playlist for ' + str(age_list[0]) + ' year person'
            elif emotion_list[0] == 'disgust':
                query = 'love mood songs playlist for ' + str(age_list[0]) + ' year person'
            elif emotion_list[0] == 'fear':
                query = 'calm mood songs playlist for ' + str(age_list[0]) + ' year person'
            else:
                query = 'neutral mood songs playlist for ' + str(age_list[0]) + ' year person'
            break

    webbrowser.open('https://www.youtube.com/results?search_query=' + query)

    # Release the video capture object and close all windows
    cap.release()
    cv2.destroyAllWindows()

    return redirect('emotion_by_face.html')


def voice(request):
    
    # Initialize the recognizer
    r = sr.Recognizer()

    # Use the default microphone as the audio source
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)

    try:
        # Recognize speech using Google Speech Recognition
        query = r.recognize_google(audio)
        print("You said:", query)
        logger.info('query')

        # Search on YouTube using the query
        search_url = 'https://www.youtube.com/results?search_query=' + query
        webbrowser.open(search_url)

    except sr.UnknownValueError:
        print("Speech Recognition could not understand audio.")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))

    return redirect('voice_recog.html')
    
