from .serializers import ContactSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings


@api_view(['POST'])
def ContactView(request):
    data = request.data
    serializer = ContactSerializer(data=data)
    if serializer.is_valid():
        # Save the contact form data
        serializer.save()
        message = f'''Name: {serializer.validated_data['name']}
        \nEmail: {serializer.validated_data['email']}
        \nSubject: {serializer.validated_data['subject']}
        \nMessage: {serializer.validated_data['message']}'''
        # Send email notification
        send_mail(
            subject='New Contact Form Submission',
            message=message,
            from_email=serializer.validated_data["email"],
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        return Response({'message': 'Contact form submitted successfully!'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)