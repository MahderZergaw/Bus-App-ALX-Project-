from datetime import datetime, timedelta
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date, parse_datetime
from django.utils.timezone import make_aware
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bus, Booking, Schedule, ScheduleSeat
from .serializers import (
    AvailableBusesSerializer,
    ScheduleSerializer,
    BookingSerializer,
    ViewPassengersBookingsSerializer,
    DriverSchedulesSerializer
)


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
        serializer = AvailableBusesSerializer(buses, many=True, context={'preferred_time': preferred_time})

        return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleSeatDetailsView(APIView):
    def get(self, request, schedule_id):
        try:
            schedule = Schedule.objects.get(id=schedule_id)
            # schedule_seats = schedule.schedule_seats.all()
            serializer = ScheduleSerializer(schedule)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)


class BookSeatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        schedule_id = request.data.get('schedule_id')
        seat_number = request.data.get('seat_number')

        if not schedule_id or not seat_number:
            return Response({"error": "Missing schedule ID or seat number"},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            schedule = Schedule.objects.get(id=schedule_id)
            schedule_seat = ScheduleSeat.objects.get(schedule=schedule,
                                                     seat__seat_number=seat_number)

            if not schedule_seat.is_available:
                return Response({"error": "Seat is already booked"},
                                status=status.HTTP_400_BAD_REQUEST)

            booking = Booking.objects.create(user=user, schedule=schedule,
                                             schedule_seat=schedule_seat)
            schedule_seat.is_available = False
            schedule_seat.save()

            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)
        except ScheduleSeat.DoesNotExist:
            return Response({"error": "Seat not found or not available"},
                            status=status.HTTP_404_NOT_FOUND)


class ViewPassengersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, schedule_id, format=None):
        user = request.user
        
        schedule = get_object_or_404(Schedule.objects.select_related('bus'), id=schedule_id)

        if schedule.bus.driver != user:
            return Response({"error": "You are not authorized to view this schedule."},
                            status=status.HTTP_403_FORBIDDEN)

        bookings = Booking.objects.filter(schedule=schedule)
        serializer = ViewPassengersBookingsSerializer(bookings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DriverSchedulesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, date, format=None):
        user = request.user

        if user.is_driver:
            try:
                bus = Bus.objects.get(driver=user)
            except Bus.DoesNotExist:
                return Response({"error": "Bus not found."}, status=status.HTTP_404_NOT_FOUND)
            
            try:
                date = parse_date(date)
                if date is None:
                    raise ValueError("Invalid date format.")
            except ValueError:
                return Response({"error": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)
            
            start_of_day = make_aware(datetime.combine(date, datetime.min.time()))
            end_of_day = start_of_day + timedelta(days=1)

            schedules = Schedule.objects.filter(
                bus=bus,
                departure_time__gte=start_of_day,
                departure_time__lt=end_of_day
            ).annotate(num_booked_seats=Count('bookings'))
            serializer = DriverSchedulesSerializer(schedules, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "You are not authorized to view this page."},
                         status=status.HTTP_403_FORBIDDEN)