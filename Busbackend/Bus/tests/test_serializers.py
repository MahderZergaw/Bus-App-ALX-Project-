from django.test import TestCase
from Bus.models import Bus, Seat, Schedule, ScheduleSeat, Terminal, WaitingList, Booking
from Bus.serializers import (SeatSerializer, ScheduleSeatSerializer, ScheduleSerializer,
                             BusSerializer, AvailableBusesSerializer,
                             BookingBusSerializer, BookingScheduleSeatSerializer, BookingScheduleSerializer,
                             BookingSerializer, ViewPassengersBookingsSerializer, TerminalSerializer, WaitingListSerializer)
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
import pytz

User = get_user_model()

class SerializerTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.driver = User.objects.create_user(username='testdriver', password='password')
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )
        nairobi_tz = pytz.timezone('Africa/Nairobi')
        self.departure_time = nairobi_tz.localize(datetime(2024, 6, 1, 8, 0))
        self.arrival_time = nairobi_tz.localize(datetime(2024, 6, 1, 12, 0))
        self.schedule = Schedule.objects.create(
            bus=self.bus,
            departure_time=self.departure_time,
            arrival_time=self.arrival_time
        )

        self.seat = Seat.objects.create(bus=self.bus, seat_number='1A')
        self.schedule_seat = ScheduleSeat.objects.create(schedule=self.schedule, seat=self.seat)
        self.terminal = Terminal.objects.create(name='Terminal A', address='123 Main St')
        self.waiting_list = WaitingList.objects.create(
            customer=self.user,
            start_terminal=self.terminal,
            end_terminal=self.terminal,
            preferred_departure_time=datetime(2024, 6, 1, 8, 0, tzinfo=pytz.UTC)
        )

    def test_seat_serializer(self):
        serializer = SeatSerializer(self.seat)
        self.assertEqual(serializer.data['seat_number'], '1A')

    def test_schedule_seat_serializer(self):
        serializer = ScheduleSeatSerializer(self.schedule_seat)
        self.assertEqual(serializer.data['seat']['seat_number'], '1A')
        self.assertTrue(serializer.data['is_available'])

    def test_schedule_serializer(self):
        serializer = ScheduleSerializer(self.schedule)

        nairobi_tz = pytz.timezone('Africa/Nairobi')
        expected_departure_time = self.departure_time.astimezone(nairobi_tz)
        expected_arrival_time = self.arrival_time.astimezone(nairobi_tz)

        self.assertEqual(serializer.data['departure_time'], expected_departure_time.isoformat())
        self.assertEqual(serializer.data['arrival_time'], expected_arrival_time.isoformat())

    def test_bus_serializer(self):
        serializer = BusSerializer(self.bus)
        self.assertEqual(serializer.data['platenumber'], 'ABC123')

    def test_available_buses_serializer(self):
        serializer = AvailableBusesSerializer(self.bus, context={'preferred_time': self.schedule.departure_time})
        self.assertEqual(serializer.data['platenumber'], 'ABC123')

    def test_booking_bus_serializer(self):
        serializer = BookingBusSerializer(self.bus)
        self.assertEqual(serializer.data['platenumber'], 'ABC123')

    def test_booking_schedule_seat_serializer(self):
        serializer = BookingScheduleSeatSerializer(self.schedule_seat)
        self.assertEqual(serializer.data['seat']['seat_number'], '1A')

    def test_booking_schedule_serializer(self):
        serializer = BookingScheduleSerializer(self.schedule)
        self.assertEqual(serializer.data['bus']['platenumber'], 'ABC123')

    def test_booking_serializer(self):
        booking = Booking.objects.create(user=self.user, schedule=self.schedule, schedule_seat=self.schedule_seat)
        serializer = BookingSerializer(booking)
        self.assertEqual(serializer.data['schedule']['bus']['platenumber'], 'ABC123')

    def test_view_passengers_bookings_serializer(self):
        booking = Booking.objects.create(user=self.user, schedule=self.schedule, schedule_seat=self.schedule_seat)
        serializer = ViewPassengersBookingsSerializer(booking)
        self.assertEqual(serializer.data['schedule_seat']['seat']['seat_number'], '1A')

    def test_terminal_serializer(self):
        serializer = TerminalSerializer(self.terminal)
        self.assertEqual(serializer.data['name'], 'Terminal A')

    def test_waiting_list_serializer(self):
        serializer = WaitingListSerializer(self.waiting_list)
        self.assertEqual(serializer.data['customer'], self.user.id)
