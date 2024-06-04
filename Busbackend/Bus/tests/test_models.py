from django.test import TestCase
from django.contrib.auth import get_user_model
from Bus.models import Bus, Seat, Schedule, ScheduleSeat, Booking, Terminal, WaitingList
from datetime import datetime
import pytz

User = get_user_model()

class BusModelTest(TestCase):

    def setUp(self):
        self.driver = User.objects.create_user(username='testdriver',
                                               email='testdriver@email.com',
                                               password='password',
                                               is_driver=True)
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )

    def test_bus_creation(self):
        self.assertEqual(self.bus.platenumber, 'ABC123')
        self.assertEqual(self.bus.driver.username, 'testdriver')

    def test_bus_str(self):
        self.assertEqual(str(self.bus), 'ABC123: Location A - Location B')


class SeatModelTest(TestCase):

    def setUp(self):
        self.driver = User.objects.create_user(username='testdriver',
                                               email='testdriver@email.com',
                                               password='password',
                                               is_driver=True)
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )
        self.seat = Seat.objects.create(bus=self.bus, seat_number='1A')

    def test_seat_creation(self):
        self.assertEqual(self.seat.seat_number, '1A')

    def test_seat_str(self):
        self.assertEqual(str(self.seat), 'ABC123 (1A)')


class ScheduleModelTest(TestCase):

    def setUp(self):
        self.driver = User.objects.create_user(username='testdriver',
                                               email='testdriver@email.com',
                                               password='password',
                                               is_driver=True)
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )
        self.schedule = Schedule.objects.create(
            bus=self.bus,
            departure_time=datetime(2024, 6, 1, 8, 0, tzinfo=pytz.UTC),
            arrival_time=datetime(2024, 6, 1, 12, 0, tzinfo=pytz.UTC)
        )

    def test_schedule_creation(self):
        self.assertEqual(self.schedule.bus.platenumber, 'ABC123')

    def test_schedule_str(self):
        east_africa_tz = pytz.timezone('Africa/Nairobi')
        departure_time = self.schedule.departure_time.astimezone(east_africa_tz)
        arrival_time = self.schedule.arrival_time.astimezone(east_africa_tz)
        self.assertEqual(str(self.schedule), f'(ABC123) Location A - Location B ({departure_time} - {arrival_time})')


class ScheduleSeatModelTest(TestCase):

    def setUp(self):
        self.driver = User.objects.create_user(username='testdriver',
                                               email='testdriver@email.com',
                                               password='password',
                                               is_driver=True)
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )
        self.schedule = Schedule.objects.create(
            bus=self.bus,
            departure_time=datetime(2024, 6, 1, 8, 0, tzinfo=pytz.UTC),
            arrival_time=datetime(2024, 6, 1, 12, 0, tzinfo=pytz.UTC)
        )
        self.seat = Seat.objects.create(bus=self.bus, seat_number='1A')
        self.schedule_seat = ScheduleSeat.objects.create(schedule=self.schedule, seat=self.seat)

    def test_schedule_seat_creation(self):
        self.assertTrue(self.schedule_seat.is_available)

    def test_schedule_seat_str(self):
        self.assertEqual(str(self.schedule_seat), f'{self.schedule} Seat 1A')


class BookingModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                               email='testuser@email.com',
                                               password='password',
                                               is_driver=False)
        self.driver = User.objects.create_user(username='testdriver',
                                               email='testdriver@email.com',
                                               password='password',
                                               is_driver=True)
        self.bus = Bus.objects.create(
            driver=self.driver,
            platenumber='ABC123',
            start_location='Location A',
            destination='Location B',
            price=50.0
        )
        self.schedule = Schedule.objects.create(
            bus=self.bus,
            departure_time=datetime(2024, 6, 1, 8, 0, tzinfo=pytz.UTC),
            arrival_time=datetime(2024, 6, 1, 12, 0, tzinfo=pytz.UTC)
        )
        self.seat = Seat.objects.create(bus=self.bus, seat_number='1A')
        self.schedule_seat = ScheduleSeat.objects.create(schedule=self.schedule, seat=self.seat)
        self.booking = Booking.objects.create(user=self.user, schedule=self.schedule, schedule_seat=self.schedule_seat)

    def test_booking_creation(self):
        self.assertFalse(self.booking.is_boarded)
        self.assertFalse(self.booking.is_alighted)


class TerminalModelTest(TestCase):

    def setUp(self):
        self.terminal = Terminal.objects.create(name='Terminal A', address='123 Main St')

    def test_terminal_creation(self):
        self.assertEqual(self.terminal.name, 'Terminal A')

    def test_terminal_str(self):
        self.assertEqual(str(self.terminal), 'Terminal A')


class WaitingListModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                               email='testuser@email.com',
                                               password='password',
                                               is_driver=False)
        self.terminal_a = Terminal.objects.create(name='Terminal A', address='123 Main St')
        self.terminal_b = Terminal.objects.create(name='Terminal B', address='456 Market St')
        self.waiting_list = WaitingList.objects.create(
            customer=self.user,
            start_terminal=self.terminal_a,
            end_terminal=self.terminal_b,
            preferred_departure_time=datetime(2024, 6, 1, 8, 0, tzinfo=pytz.UTC)
        )

    def test_waiting_list_creation(self):
        self.assertEqual(self.waiting_list.customer.username, 'testuser')
