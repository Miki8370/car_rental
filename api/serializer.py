from rest_framework import serializers
from car.models import Car, Rental
from django.contrib.auth.models import User




class UserSerializer(serializers.ModelSerializer):
    class Meta:

        model = User
        fields = '__all__'

class AdminCarSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Car
        fields = [
            'name',
            'models',
            'description',
            'ability',
            'is_rented',
        ]

class UserCarSerializer(serializers.ModelSerializer):
    class Meta:

        model = Car
        fields = [
            'name',
            'models',
            'description',
            'ability',
            'is_rented',
        ]

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class RentalSerializer(serializers.ModelSerializer):
    car = CarSerializer()
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Rental
        fields = ['car', 'user', 'start_date', 'end_date', 'price', 'status']

    def create(self, validated_data):
        car = validated_data['car']
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']
        price = (end_date - start_date).days * car.price_per_day  # Calculate price based on car's price per day

        rental = Rental.objects.create(
            car=car,
            user=validated_data['user'],
            start_date=start_date,
            end_date=end_date,
            price=price,
            status='pending'  # Default status when created
        )
        return rental
