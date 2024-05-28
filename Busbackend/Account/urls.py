from django.urls import path
from .views import CustomTokenObtainPairView, RegisterView, UserProfileView, DriverProfileView, UserProfileCreateView, DriverProfileCreateView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    # path('driver/profile/', DriverProfileView.as_view(), name='driver-profile'),
    path('user/profile/create/', UserProfileCreateView.as_view(), name='user-profile-create'),
    # path('driver/profile/create/', DriverProfileCreateView.as_view(), name='driver-profile-create'),
    path('driver/profile/', DriverProfileCreateView.as_view(), name='driver-profile-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
