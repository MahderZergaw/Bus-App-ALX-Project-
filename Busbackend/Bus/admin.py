from django.contrib import admin
from .models import Bus, Seat, Schedule, Booking, Terminal, WaitingList

admin.site.register(Bus)
admin.site.register(Seat)
admin.site.register(Schedule)
admin.site.register(Booking)
admin.site.register(Terminal)
admin.site.register(WaitingList)
