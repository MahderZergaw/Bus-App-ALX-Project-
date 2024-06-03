from datetime import timedelta
from django.db.models import Count, Q
from rest_framework import serializers
from .models import Bus, Seat, Schedule, ScheduleSeat, Booking, Terminal, WaitingList


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['seat_number']


class ScheduleSeatSerializer(serializers.ModelSerializer):
    seat = SeatSerializer()

    class Meta:
        model = ScheduleSeat
        fields = ['seat', 'is_available']


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
        fields = ['driver', 'platenumber', 'start_location',
                  'destination', 'price', 'schedules']


# Serializers for AvailableBusesView
class AvailableBusesScheduleSerializer(serializers.ModelSerializer):
    available_seats = serializers.IntegerField(read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'departure_time', 'arrival_time', 'available_seats']


class AvailableBusesSerializer(serializers.ModelSerializer):
    schedules = serializers.SerializerMethodField()

    class Meta:
        model = Bus
        fields = ['driver', 'platenumber', 'start_location',
                  'destination', 'price', 'schedules']


    def get_schedules(self, obj):
        preferred_time = self.context.get('preferred_time')

        if preferred_time:
            start_time_range = preferred_time - timedelta(minutes=30)
            end_time_range = preferred_time + timedelta(minutes=30)

            filtered_schedules = obj.schedules.filter(
                departure_time__gte=start_time_range,
                departure_time__lte=end_time_range
            ).annotate(
                available_seats=Count('schedule_seats', filter=Q(schedule_seats__is_available=True))
            )
            return AvailableBusesScheduleSerializer(filtered_schedules, many=True).data

        return AvailableBusesScheduleSerializer(
            obj.schedules.annotate(
                available_seats=Count('schedule_seats', filter=Q(schedule_seats__is_available=True))
            ), many=True
        ).data


# Serializers for BookSeatView
class BookingBusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['platenumber', 'start_location',
                  'destination', 'price']


class BookingScheduleSeatSerializer(serializers.ModelSerializer):
    seat = SeatSerializer()

    class Meta:
        model = ScheduleSeat
        fields = ['seat']


class BookingScheduleSerializer(serializers.ModelSerializer):
    bus = BookingBusSerializer()

    class Meta:
        model = Schedule
        fields = ['id', 'bus', 'departure_time', 'arrival_time']


class BookingSerializer(serializers.ModelSerializer):
    schedule = BookingScheduleSerializer(read_only=True)
    schedule_seat = BookingScheduleSeatSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'user', 'schedule', 'schedule_seat', 'is_boarded', 'is_alighted']


# Serializers for ViewPassengersBookingsView
class ViewPassengersBookingsSerializer(serializers.ModelSerializer):
    schedule_seat = BookingScheduleSeatSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'user', 'schedule_seat', 'is_boarded', 'is_alighted']


# Serializers for DriverSchedulesView
class DriverSchedulesSerializer(serializers.ModelSerializer):
    num_booked_seats = serializers.IntegerField(read_only=True)

    class Meta:
        model = Schedule
        fields = ['departure_time', 'arrival_time', 'num_booked_seats']


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = '__all__'


class WaitingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingList
        fields = '__all__'
