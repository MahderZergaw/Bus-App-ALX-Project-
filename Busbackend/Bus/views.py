from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from datetime import timedelta
from .models import Bus, Schedule
from .serializers import BusSerializer

class AvailableBusesView(APIView):
    def post(self, request, format=None):
        start_location = request.data.get('start_location')
        destination = request.data.get('destination')
        preferred_time = request.data.get('time')

        """if not all([start_location, destination, preferred_time]):
            return Response({"error": "Missing required parameters."},
                            status=status.HTTP_400_BAD_REQUEST)"""
        if not start_location:
            return Response({"error": "Missing start location"},
                            status=status.HTTP_400_BAD_REQUEST)
        if not destination:
            return Response({"error": "Missing destination"},
                            status=status.HTTP_400_BAD_REQUEST)
        if not preferred_time:
            return Response({"error": "Missing time"},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            preferred_time = parse_datetime(preferred_time)
        except ValueError:
            return Response({"error": "Invalid time format."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Calculate the time range
        start_time_range = preferred_time - timedelta(minutes=30)
        end_time_range = preferred_time + timedelta(minutes=30)

        schedules = Schedule.objects.filter(
            bus__start_location=start_location,
            bus__destination=destination,
            departure_time__gte=start_time_range,
            departure_time__lte=end_time_range
        ).select_related('bus')

        buses = Bus.objects.filter(schedules__in=schedules).distinct()
        serializer = BusSerializer(buses, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
