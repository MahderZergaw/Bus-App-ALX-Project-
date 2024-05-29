from rest_framework import serializers
from .models import Bus, Seat, Schedule, Booking, Terminal, WaitingList


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class BusSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(many=True, read_only=True)
    class Meta:
        model = Bus
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = '__all__'


class WaitingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingList
        fields = '__all__'
