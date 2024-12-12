from django.shortcuts import render
from .serializer import *
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, permissions
from car.models import Car, Rental
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.



class UserViewer(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'patch']

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.filter(is_rented=True)  # Only available cars
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Allow unauthenticated users to view available cars

    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        car = self.get_object()
        return Response({'is_rented': car.is_rented})


class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        car = serializer.validated_data['car']
        if not car.is_available:
            raise serializers.ValidationError("This car is not available for rent.")
        serializer.save()

    @action(detail=True, methods=['get'])
    def active_rentals(self, request):
        rentals = Rental.objects.filter(user=request.user, status='active')
        serializer = self.get_serializer(rentals, many=True)
        return Response(serializer.data)
