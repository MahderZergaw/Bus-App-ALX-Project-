from django.urls import path
from .views import AvailableBusesView

urlpatterns = [
    path('available-buses/', AvailableBusesView.as_view(), name='available-buses'),
]
