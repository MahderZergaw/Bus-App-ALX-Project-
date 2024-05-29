from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Bus(models.Model):
    driver = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    platenumber = models.CharField(max_length=20, unique=True)
    start_location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    price = models.FloatField()


class Seat(models.Model):
    bus = models.ForeignKey(Bus, related_name='seats', on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=5)
    is_available = models.BooleanField(default=True)


class Schedule(models.Model):
    bus = models.ForeignKey(Bus, related_name='schedules', on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()


class Booking(models.Model):
    user = models.ForeignKey(User, related_name='bookings', on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, related_name='bookings', on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=5)
    is_boarded = models.BooleanField(default=False)
    is_alighted = models.BooleanField(default=False)


class Terminal(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()


class WaitingList(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    start_terminal = models.ForeignKey(Terminal, related_name='waiting_list_start',
                                       on_delete=models.CASCADE)
    end_terminal = models.ForeignKey(Terminal, related_name='waiting_list_end',
                                     on_delete=models.CASCADE)
    preferred_departure_time = models.DateTimeField()
