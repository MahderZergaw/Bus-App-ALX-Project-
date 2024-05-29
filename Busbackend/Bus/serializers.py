from rest_framework import serializers
from .models import Bus, Seat, Schedule, ScheduleSeat, Booking, Terminal, WaitingList


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'seat_number']


class ScheduleSeatSerializer(serializers.ModelSerializer):
    seat = SeatSerializer()

    class Meta:
        model = ScheduleSeat
        fields = ['id', 'seat', 'is_available']


class ScheduleSerializer(serializers.ModelSerializer):
    schedule_seats = ScheduleSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'departure_time', 'arrival_time', 'schedule_seats']


class BusSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Bus
        fields = ['id', 'driver', 'platenumber', 'start_location',
                  'destination', 'price', 'schedules']


class BookingSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'schedule', 'schedule_seat', 'is_boarded', 'is_alighted'] 


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = '__all__'


class WaitingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingList
        fields = '__all__'
