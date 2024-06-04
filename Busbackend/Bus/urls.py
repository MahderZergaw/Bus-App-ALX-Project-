from django.urls import path
from .views import (
    AvailableBusesView,
    ScheduleSeatDetailsView,
    BookSeatView,
    ViewPassengersView,
    DriverSchedulesView
)

urlpatterns = [
    path('available-buses/', AvailableBusesView.as_view(), name='available-buses'),
    path('schedule/<int:schedule_id>/seats/', ScheduleSeatDetailsView.as_view(),
         name='schedule-seat-details'),
    path('book-seat/', BookSeatView.as_view(), name='book-seat'),
    path('view-passengers/<int:schedule_id>/', ViewPassengersView.as_view(), name='view-passengers'),
    path('driver-schedules/<str:date>/', DriverSchedulesView.as_view(), name='driver-schedules'),
]
