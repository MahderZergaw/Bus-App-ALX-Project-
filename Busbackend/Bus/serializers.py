from rest_framework import serializers
from .models import Bus, Seat, Schedule, ScheduleSeat, Booking, Terminal, WaitingList
from datetime import timedelta


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
    # schedules = ScheduleSerializer(many=True, read_only=True)
    schedules = serializers.SerializerMethodField()

    class Meta:
        model = Bus
        fields = ['id', 'driver', 'platenumber', 'start_location',
                  'destination', 'price', 'schedules']


    def get_schedules(self, obj):
        preferred_time = self.context.get('preferred_time')

        if preferred_time:
            start_time_range = preferred_time - timedelta(minutes=30)
            end_time_range = preferred_time + timedelta(minutes=30)

            filtered_schedules = obj.schedules.filter(
                departure_time__gte=start_time_range,
                departure_time__lte=end_time_range
            )
            return ScheduleSerializer(filtered_schedules, many=True).data

        return ScheduleSerializer(obj.schedules.all(), many=True).data


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
