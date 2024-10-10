import requests
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from healthRecords.models import MedicalIssue

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
    access_token = "eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC02OTUwMDBCMEY5IiwiaWQiOiJJQk1pZC02OTUwMDBCMEY5IiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiN2FmN2RlYzgtN2MxYi00N2RhLTkzMWItNjVlNjRkYjBkODNhIiwiaWRlbnRpZmllciI6IjY5NTAwMEIwRjkiLCJnaXZlbl9uYW1lIjoiR0lMQkVSVCIsImZhbWlseV9uYW1lIjoiS0lQTEFOR0FUIiwibmFtZSI6IkdJTEJFUlQgS0lQTEFOR0FUIiwiZW1haWwiOiJnaWxiZXJ0a2V0ZXI3NTlAZ21haWwuY29tIiwic3ViIjoiZ2lsYmVydGtldGVyNzU5QGdtYWlsLmNvbSIsImF1dGhuIjp7InN1YiI6ImdpbGJlcnRrZXRlcjc1OUBnbWFpbC5jb20iLCJpYW1faWQiOiJJQk1pZC02OTUwMDBCMEY5IiwibmFtZSI6IkdJTEJFUlQgS0lQTEFOR0FUIiwiZ2l2ZW5fbmFtZSI6IkdJTEJFUlQiLCJmYW1pbHlfbmFtZSI6IktJUExBTkdBVCIsImVtYWlsIjoiZ2lsYmVydGtldGVyNzU5QGdtYWlsLmNvbSJ9LCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiJjNDI2M2I1YmNhZTA0YWI0YmU4MjhiNzZkMWU5Y2VmZCIsImZyb3plbiI6dHJ1ZX0sImlhdCI6MTcyODU2MDg1NCwiZXhwIjoxNzI4NTY0NDU0LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.U8JmEvmhiTnoZ4I-qpwrzgQ_eHZAAFdBoRjO7EJ0BXJYmCDsELGyHwP7GRfSuHu7xCciskFzLoGPHF_rPqJOOm64z3Z6fVDZ0UNSYUbzbYcI0v7SDDhLez488r1RTqt9YNl3qcWx8miQPgmmyMrMfp6kvFYEQlX8GsqY_32BxQ6F6uWpvr39iPfdfbJ4jbJLOv6LVOC07i2KdxKUc24ewHuylFXgVsr3p2XkYn_8VXukmQIo8lrbT7ReDphETrtG1sNNUGTs_Yh64O1PacAqufDo_tk7MHhUFUkiQEOE7gHwoVoSgrQtw1V0cQpA7cCwrxx5rZrql47hHpsAQ3tEEw" 
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
  
  
  
def analyze_data(request):
    access_token = "my token"  # Replace with your actual access token

    # Load the JSON data from the request body
    data = json.loads(request.body)

    # Extract the patient data from the request payload
    patient_data = data.get('patients', [])

    if not patient_data:
        return JsonResponse({'error': 'No patient data provided.'}, status=400)

    # Prepare the input data for Watson API
    input_data = "Please analyze the following patient data and return health insights as numerical values, including overall health score and individual health scores for each body part.:\n" + \
                 "\n".join([f"{patient['name']}: " + 
                             ", ".join([f"{symptom['symptom']} (body part: {symptom['bodyPart']}, date: {symptom['date']})" for symptom in patient['symptoms']]) 
                             for patient in patient_data])

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
        return JsonResponse(response.json(), status=200)
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        if response is not None:
            print(f"Response body: {response.text}")
        return JsonResponse({"error": str(http_err)}, status=response.status_code)
    except Exception as err:
        print(f"Other error occurred: {err}")
        return JsonResponse({"error": str(err)}, status=500)
