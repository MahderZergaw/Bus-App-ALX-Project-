from django.urls import path
from .views import (
    AvailableBusesView,
    ScheduleSeatDetailsView,
    BookSeatView,
    ViewPassengersView,
    DeleteBookingView,
    DriverSchedulesView,
    UpdateBookingStatusView,
    ScanPassengerView
)

urlpatterns = [
    path('available-buses/', AvailableBusesView.as_view(), name='available-buses'),
    path('schedule/<int:schedule_id>/seats/', ScheduleSeatDetailsView.as_view(),
         name='schedule-seat-details'),
    path('book-seat/', BookSeatView.as_view(), name='book-seat'),
    path('driver-schedules/<str:date>/', DriverSchedulesView.as_view(), name='driver-schedules'),
    path('view-passengers/<int:schedule_id>/', ViewPassengersView.as_view(), name='view-passengers'),
    path('delete-booking/<uuid:booking_id>/', DeleteBookingView.as_view(), name='delete-booking'),
    path('update-booking-status/<uuid:booking_id>/', UpdateBookingStatusView.as_view(), name='is-boarded'),
    path('scan-passenger/', ScanPassengerView.as_view(), name='scan-passenger'),
]
