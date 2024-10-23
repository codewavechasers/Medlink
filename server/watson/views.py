import requests
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from healthRecords.models import MedicalIssue
import requests
import time
import os
from patients.models import Patient
from bookAppointments.models import Appointment
from timelines.models import Timelines
from doctorsnotes.models import DoctorNote
from medication.models import Medication
from django.utils.dateparse import parse_time
import random
from doctorsnotes.serializers import DoctorNoteSerializer
from medication.serializers import MedicationSerializer

@csrf_exempt
@require_http_methods(["GET"])
def get_advice(request, record_id=None):
    if record_id is None:
        try:
            data = json.loads(request.body)
            record_id = data.get('id')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    if not record_id:
        return JsonResponse({'error': 'No ID provided'}, status=400)

    try:
        health_record = MedicalIssue.objects.get(id=record_id)
        
        # Prepare input data for Watson
        input_data = f"Please provide medical advice for a patient with a {health_record.bodyPart} issue and symptom '{health_record.symptom}'. Give a concise recommendation."

        # Watson API call
        advice = call_watson_api(input_data)

        return JsonResponse({
            'advice': advice,
            'bodyPart': health_record.bodyPart,
            'symptom': health_record.symptom,
        })
    except MedicalIssue.DoesNotExist:
        return JsonResponse({'error': 'Health record not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def call_watson_api(input_data):
    api_key = os.environ.get('WATSON_API_KEY')
    # api_key = ""
    valid_token = get_valid_token(api_key)

    access_token = valid_token
    
    url = "https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    body = {
        "input": input_data,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 200,
            "repetition_penalty": 1.0
        },
        "model_id": "meta-llama/llama-3-70b-instruct",
        "project_id": "4e533532-f043-4916-b9f3-cac2feafe48d"
    }

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        result = response.json()
        # Extract the generated text from the Watson response
        advice = result.get('results', [{}])[0].get('generated_text', '')
        return advice
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        raise
    except Exception as err:
        print(f"Other error occurred: {err}")
  

def get_token(api_key):
    url = "https://iam.cloud.ibm.com/identity/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": api_key
    }
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def get_valid_token(api_key):
    global token_data
    current_time = time.time()
    
    if 'token_data' not in globals() or current_time >= token_data['expiration'] - 300:  # Refresh if within 5 minutes of expiring
        token_data = get_token(api_key)
        token_data['expiration'] = current_time + token_data['expires_in']
    
    return token_data['access_token']



def get_response(request):
    patient_email = request.session.get('email')
    patient_data = Patient.objects.get(email=patient_email)
    patient_name = patient_data.name
    data = json.loads(request.body)
    patient_input = data.get('message')
    input = f"My name is {patient_name} and I hope you answer these medical questions for me. Please be clear: {patient_input}" 
     
    # print("input:", patient_input)
    try:
        
        # Watson API call
        watson_response = call_watson_api(input)

        return JsonResponse({
            'watson': watson_response
        }, status=200)
    except MedicalIssue.DoesNotExist:
        return JsonResponse({'message': 'An error occured while getting you an answer'}, status=404)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)


#watson assistant APIs below

# Function to calculate the health score based on severity of symptoms
def calculate_health_score(body):
    health_score = 0
    if body.get('headache'):
        health_score += body['headache']
    if body.get('chestPain'):
        health_score += body['chestPain']
    if body.get('breathingDifficulty'):
        health_score += body['breathingDifficulty']
    if body.get('leftLegPain'):
        health_score += body['leftLegPain']
    if body.get('rightLegPain'):
        health_score += body['rightLegPain']
    if body.get('leftHandPain'):
        health_score += body['leftHandPain']
    if body.get('rightHandPain'):
        health_score += body['rightHandPain']
    
    return health_score

# Function to assign images based on the body part
def assign_image_by_body_part(body_part):
    image_mapping = {
        'Head': '/human/head.png',
        'Torso': '/human/Torso.png',
        'LeftLeg': '/human/LeftLeg.png',
        'RightLeg': '/human/RightLeg.png',
        'LeftHand': '/human/LeftHand.png',
        'RightHand': '/human/RightHand.png'
    }
    return image_mapping.get(body_part, '/human/default.png')

@csrf_exempt
def report_health_issues(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            email = body.get('email')

            # Assign image based on body part
            body_part = body.get('bodyPart')
            image = assign_image_by_body_part(body_part)

            # Initialize fields for the model
            kwargs = {
                'email': email,
                'bodyPart': body_part,
                'symptom': body.get('symptom'),
                'date': body.get('date'),
                'image': image,
            }

            # Add specific fields based on body part
            if body_part == 'Head':
                kwargs['headache'] = body.get('headache')
                kwargs['visionIssues'] = body.get('visionIssues')
            elif body_part == 'Torso':
                kwargs['chestPain'] = body.get('chestPain')
                kwargs['breathingDifficulty'] = body.get('breathingDifficulty')
            elif body_part == 'LeftLeg':
                kwargs['leftLegPain'] = body.get('leftLegPain')
            elif body_part == 'RightLeg':
                kwargs['rightLegPain'] = body.get('rightLegPain')
            elif body_part == 'LeftHand':
                kwargs['leftHandPain'] = body.get('leftHandPain')
            elif body_part == 'RightHand':
                kwargs['rightHandPain'] = body.get('rightHandPain')

            # Calculate the health score based on symptoms severity
            # health_score = calculate_health_score(body)
            # kwargs['health_score'] = health_score

            # Create the MedicalIssue object with the data
            issue = MedicalIssue.objects.create(**kwargs)
            
            return JsonResponse({'message': 'Health issue reported successfully.', 'id': issue.id}, status=201)
        
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def get_health_score(request):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            
            data = MedicalIssue.objects.filter(email=email)
            
            if not data.exists():
                return JsonResponse({"success": False, "message": "No records found for this email.", "overall_health_score":50}, status=200)
            
            total_health_score = sum(item.health_score for item in data)
            record_count = data.count()
            
            max_health_score = 100  # Adjust this if your max score is different
            overall_health_score = (total_health_score / (record_count * max_health_score)) * 100
        
            return JsonResponse({"success": True, "overall_health_score": overall_health_score}, status=200)
    
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)
        
        
@csrf_exempt
def add_timeline(request):
    data = json.loads(request.body)
    patient_email = data.get('email')
    # print("My email", patient_email)
    patientData = Patient.objects.get(email=patient_email)
    patient_name = patientData.name
    if request.method == 'POST':
        try:
            date = data.get('date')
            time_str = data.get('time')  
            long_description = data.get('long_description')
            description = data.get('description')

            time = parse_time(time_str)
            if time is None:
                return JsonResponse({'status': 'error', 'message': 'Invalid time format. Use HH:MM format.'}, status=400)

            existing_reminder = Timelines.objects.filter(patient_email=patient_email, date=date, time=time).first()
            if existing_reminder:
                return JsonResponse({'status': 'error', 'message': 'You already have a reminder at this time.'}, status=403)

            Timelines.objects.create(
                patient_email=patient_email,
                patient_name=patient_name,
                description=description,
                date=date,
                time=time,
                long_description=long_description
            )
            return JsonResponse({'status': 'success', 'message': 'You have successfully added a timeline. You will be reminded!'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid Data'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)

    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)


@csrf_exempt
def get_timelines(request):
    data = json.loads(request.body)
    email=data.get('email')
    if request.method == 'GET':
        reminders = Timelines.objects.filter(patient_email=email) 
        reminders_list = list(reminders.values('date', 'time', 'description', 'patient_name', 'patient_email', 'long_description'))
        return JsonResponse(reminders_list, safe=False)
    
@csrf_exempt
def edit_appointment(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)

            email =data.get('email')
            date = data.get('date')
            id = data.get('id')
            time = data.get('time')
            consultation_type = data.get('consultationType')
            period = data.get('period')
            # Find the appointment
            appointment = Appointment.objects.filter(id=id, patient_email=email).first()


            if appointment:
                # Update the appointment details
                appointment.time = time or appointment.time
                appointment.period = period or appointment.period
                appointment.consultation_type = consultation_type or appointment.consultation_type
                appointment.date = date or appointment.date
                appointment.problem_description = appointment.problem_description
                appointment.save()

                return JsonResponse({
                    'status': 'success',
                    'message': 'Appointment updated successfully.'
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Appointment not found.'
                }, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)


@csrf_exempt
def get_appointments(request):
    data = json.loads(request.body)
    email = data.get('email')
    if request.method == 'GET':
        appointments = Appointment.objects.filter(patient_email=email) 
        appointments_list = list(appointments.values('id','doctor_name', 'date', 'time', 'doctor_image', 'speciality', 'problem_description', 'patient_email'))
        return JsonResponse(appointments_list, safe=False)

@csrf_exempt
def delete_appointment(request):
    data = json.loads(request.body)
    email = data.get('email')
    if request.method == 'DELETE':
        try:
           
            id= data.get('id')

            # Find and delete the specific appointment
            appointment = Appointment.objects.filter(
               id=id,
               patient_email=email
            ).first()

            if appointment:
                appointment.delete()
                return JsonResponse({
                    'status': 'success',
                    'message': 'Appointment deleted successfully.'
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Appointment not found.'
                }, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

DOCTORS = [
    {"name": "Dr. John Smith", "speciality": "Cardiology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Emily Davis", "speciality": "Dermatology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Michael Brown", "speciality": "Neurology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Sarah White", "speciality": "Pediatrics", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Anne Johnson", "speciality": "Cardiology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Robert Wilson", "speciality": "Orthopedics", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Jessica Miller", "speciality": "Gastroenterology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Mark Taylor", "speciality": "Ophthalmology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Laura Brown", "speciality": "Oncology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. James Martin", "speciality": "Psychiatry", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Olivia Clark", "speciality": "General Surgery", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. William Lee", "speciality": "Endocrinology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Sophia Green", "speciality": "Nephrology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Henry Harris", "speciality": "Rheumatology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Emma Hall", "speciality": "Pulmonology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. David King", "speciality": "ENT (Otolaryngology)", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Mia Young", "speciality": "Urology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Noah Perez", "speciality": "Neurology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Ava Adams", "speciality": "Obstetrics & Gynecology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Ethan Parker", "speciality": "Cardiothoracic Surgery", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Lucas Evans", "speciality": "Hematology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Isabella Thompson", "speciality": "Dermatology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Mason Garcia", "speciality": "Plastic Surgery", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Amelia Robinson", "speciality": "Neurosurgery", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Jacob Walker", "speciality": "Pediatrics", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Evelyn Scott", "speciality": "Geriatrics", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Benjamin Turner", "speciality": "Infectious Diseases", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Grace Edwards", "speciality": "Allergy and Immunology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Samuel Bennett", "speciality": "Orthodontics", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Harper Reed", "speciality": "Dentistry", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Alexander Murphy", "speciality": "Ophthalmology", "image": "../../doctors/doc-1.jpeg"},
    {"name": "Dr. Elizabeth Gonzalez", "speciality": "Pediatric Surgery", "image": "../../doctors/doc-1.jpeg"}
]


def get_doctor_by_speciality(speciality):
    # Filter doctors by the given speciality
    available_doctors = [doc for doc in DOCTORS if doc['speciality'].lower() == speciality.lower()]
    if not available_doctors:
        return None
    # Randomly select a doctor if more than one is available
    return random.choice(available_doctors)

@csrf_exempt
def book_appointment(request):
    if request.method == 'POST':
       
        try:
            data = json.loads(request.body)

            # Extract data from the session
            patient_email = data.get('email')
            patientData = Patient.objects.get(email=patient_email)
            patient_name = patientData.name
            phonenumber=patientData.phone_number
            if  not patient_email:
                return JsonResponse({'status': 'error', 'message': 'You are not authenticated'}, status=401)

            speciality = data.get('speciality')
            date = data.get('date')
            time = data.get('time')
            period = data.get('period')
            consultation_type = data.get('consultationType')
            problem_description = data.get('problemDescription')
            
            # doctor_name = data.get('doctorName')
            # doctor_image = data.get('doctor_image')
              # Get doctor details by speciality
            doctor = get_doctor_by_speciality(speciality)

            if not doctor:
                return JsonResponse({
                    'status': 'error',
                    'message': f'No doctors found with the speciality: {speciality}'
                }, status=404)

            doctor_name = doctor['name']
            doctor_image = doctor['image']
            
            existing_appointment = Appointment.objects.filter(
                doctor_name=doctor_name,
                date=date,
                time=time,
                patient_email=patient_email
            ).first()

            if existing_appointment:
                return JsonResponse({
                    'status': 'error',
                    'message': 'You already have an appointment with this doctor at this time.'
                }, status=400)

            
            doctor_appointment = Appointment.objects.filter(
                doctor_name=doctor_name,
                date=date,
                time=time
            ).exists()

            if doctor_appointment:
                return JsonResponse({
                    'status': 'error',
                    'message': 'The doctor is not available at this time. Please choose another time slot.'
                }, status=400)

            
            appointment = Appointment.objects.create(
                doctor_name=doctor_name,
                speciality=speciality,
                date=date,
                time=time,
                period=period,
                consultation_type=consultation_type,
                problem_description=problem_description,
                patient_name=patient_name, 
                patient_email=patient_email,
                doctor_image=doctor_image,
                phonenumber= phonenumber,
            )

            return JsonResponse({
                'status': 'success',
                'appointment_id': appointment.id,
                'message': 'You have successfully booked an appointment!'
            })

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@csrf_exempt
def get_doctor_notes(request):
    data = json.loads(request.body)
    email = data.get('email')
    notes = DoctorNote.objects.filter(
        patient_email=email)
    serializer = DoctorNoteSerializer(notes, many=True)
    return JsonResponse({"success":True, "data":serializer.data})

@csrf_exempt
def get_medication(request):
    data = json.loads(request.body)
    email = data.get('email')
    try:
        medications = Medication.objects.filter(email=email)
        serializer = MedicationSerializer(medications, many=True)
        return JsonResponse({"success":True, "data":serializer.data}, status=200)
    except Medication.DoesNotExist:
        return JsonResponse({"success":True, "message":"No medication found for this account"}, status=200)

    
    
