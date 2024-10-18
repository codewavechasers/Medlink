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
            "max_new_tokens": 50,
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
    input = f"My name is {patient_name} and I hope you answer this question for me. Please be clear. {patient_input}" 
     
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



  
# def analyze_data(request):
#     access_token = "my token"  # Replace with your actual access token

#     # Load the JSON data from the request body
#     data = json.loads(request.body)

#     # Extract the patient data from the request payload
#     patient_data = data.get('patients', [])

#     if not patient_data:
#         return JsonResponse({'error': 'No patient data provided.'}, status=400)

#     # Prepare the input data for Watson API
#     input_data = "Please analyze the following patient data and return health insights as numerical values, including overall health score and individual health scores for each body part.:\n" + \
#                  "\n".join([f"{patient['name']}: " + 
#                              ", ".join([f"{symptom['symptom']} (body part: {symptom['bodyPart']}, date: {symptom['date']})" for symptom in patient['symptoms']]) 
#                              for patient in patient_data])

#     url = "https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
#     headers = {
#         "Accept": "application/json",
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {access_token}"
#     }

#     body = {
#         "input": input_data,
#         "parameters": {
#             "decoding_method": "greedy",
#             "max_new_tokens": 200,
#             "repetition_penalty": 1.0
#         },
#         "model_id": "meta-llama/llama-3-70b-instruct",
#         "project_id": "4e533532-f043-4916-b9f3-cac2feafe48d"
#     }

#     try:
#         response = requests.post(url, headers=headers, json=body)
#         response.raise_for_status()
#         return JsonResponse(response.json(), status=200)
#     except requests.exceptions.HTTPError as http_err:
#         print(f"HTTP error occurred: {http_err}")
#         if response is not None:
#             print(f"Response body: {response.text}")
#         return JsonResponse({"error": str(http_err)}, status=response.status_code)
#     except Exception as err:
#         print(f"Other error occurred: {err}")
#         return JsonResponse({"error": str(err)}, status=500)
