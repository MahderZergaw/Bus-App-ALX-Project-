from django.contrib import admin
from .models import CustomUser, DriverProfile, UserProfile

admin.site.register(CustomUser)
admin.site.register(DriverProfile)
admin.site.register(UserProfile)
