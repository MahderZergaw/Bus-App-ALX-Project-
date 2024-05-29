from django.urls import path
from .views import AvailableBusesView

urlpatterns = [
    path('available-buses/', AvailableBusesView.as_view(), name='available-buses'),
    path('schedule/<int:schedule_id>/seats/', ScheduleSeatDetailsView.as_view(),
         name='schedule-seat-details'),
    path('book-seat/', BookSeatView.as_view(), name='book-seat'),
]
