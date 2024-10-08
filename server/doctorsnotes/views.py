from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DoctorNote
from .serializers import DoctorNoteSerializer
import zipfile
import io
from io import StringIO
import csv
from django.http import HttpResponse

@api_view(['GET'])
def get_doctor_notes(request):
    email = request.session.get('email')
    notes = DoctorNote.objects.filter(
        patient_email=email)
    serializer = DoctorNoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def delete_doctor_notes(request):
    ids = request.data.get('ids', [])
    DoctorNote.objects.filter(id__in=ids).delete()
    return Response({'status': 'success'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def save_doctor_notes(request):
    ids = request.data.get('ids', [])
    notes = DoctorNote.objects.filter(id__in=ids)

    # Create an in-memory output file for CSV data
    output = StringIO()
    writer = csv.writer(output)
    
    # Write the header row
    writer.writerow(['ID', 'Doctor', 'Date', 'Note', 'Status', 'Advice'])

    # Write data rows
    for note in notes:
        writer.writerow([
            note.id,
            note.doctor,
            note.date,
            note.note,
            note.status,
            note.advice,
        ])

    # Get the CSV data
    output.seek(0)
    
    # Create the HTTP response
    response = HttpResponse(output, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="doctor_notes.csv"'
    return response
