from django.urls import path
from .views import (
    AvailableBusesView,
    ScheduleSeatDetailsView,
    BookSeatView,
    ViewPassengersView
)

urlpatterns = [
    path('available-buses/', AvailableBusesView.as_view(), name='available-buses'),
    path('schedule/<int:schedule_id>/seats/', ScheduleSeatDetailsView.as_view(),
         name='schedule-seat-details'),
    path('book-seat/', BookSeatView.as_view(), name='book-seat'),
    path('view-passengers/<int:schedule_id>/', ViewPassengersView.as_view(), name='view-passengers'),
]
