import requests
from django.http import JsonResponse
import json

def analyze_data(request):
    access_token = "eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC02OTUwMDBCMEY5IiwiaWQiOiJJQk1pZC02OTUwMDBCMEY5IiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiY2MyNDhiZDctODdhMy00NjI4LTgzZDYtNjA2MDVmNTI0ZDgyIiwiaWRlbnRpZmllciI6IjY5NTAwMEIwRjkiLCJnaXZlbl9uYW1lIjoiR0lMQkVSVCIsImZhbWlseV9uYW1lIjoiS0lQTEFOR0FUIiwibmFtZSI6IkdJTEJFUlQgS0lQTEFOR0FUIiwiZW1haWwiOiJnaWxiZXJ0a2V0ZXI3NTlAZ21haWwuY29tIiwic3ViIjoiZ2lsYmVydGtldGVyNzU5QGdtYWlsLmNvbSIsImF1dGhuIjp7InN1YiI6ImdpbGJlcnRrZXRlcjc1OUBnbWFpbC5jb20iLCJpYW1faWQiOiJJQk1pZC02OTUwMDBCMEY5IiwibmFtZSI6IkdJTEJFUlQgS0lQTEFOR0FUIiwiZ2l2ZW5fbmFtZSI6IkdJTEJFUlQiLCJmYW1pbHlfbmFtZSI6IktJUExBTkdBVCIsImVtYWlsIjoiZ2lsYmVydGtldGVyNzU5QGdtYWlsLmNvbSJ9LCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiJjNDI2M2I1YmNhZTA0YWI0YmU4MjhiNzZkMWU5Y2VmZCIsImZyb3plbiI6dHJ1ZX0sImlhdCI6MTcyODQ2MjcwNCwiZXhwIjoxNzI4NDY2MzA0LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.caE60_nxVzVXIcz_4icFfuyvGm_oIa9u_v3jeE-MrPC7yrPIBUU_Lxv94Ph3UgJUad9K4nwZZafnAvbFCezH83Iv8iPpOJq226ThLcGDpallS87LZPds9BnZQWgOlH0UfV0Ahjz9RUnue5rk2clGRnM2v2NHxL7bQfMhj8x1JBoZjSe_CY1F_HPY2L_aF7TMYQA6z4OSWMA89_O04-056zQKnz5-HkCScpo-6TvVhVYYsLoJA6Hp530HKKMVMFtf2gnEl0wPWMSIK2NevOiKdwpvBEEgQH7vW6YNvj1LYGkifQbS3KnI4pLEUviHj1CfgHL7t9Lolx9RTPkMvFQrrg"  # Replace with your actual access token

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
