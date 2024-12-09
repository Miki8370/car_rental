from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Car(models.Model):
    name = models.CharField(max_length=250)
    model = models.CharField(max_length=250)
    decription = models.TextField()
    ability = models.CharField(max_length=50)
    is_rented = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='car_images/', null=True, blank=True)

    def __str__(self):
        return self.name

class Rental(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')  # Can be 'pending', 'active', 'completed', etc.
    
    def __str__(self):
        return f"Rental of {self.car.name} by {self.user.username}"

    @property
    def rental_duration(self):
        return (self.end_date - self.start_date).days
    
    def save(self, *args, **kwargs):
        if not self.price:
            self.price = (self.end_date - self.start_date).days * self.car.price_per_day
        super().save(*args, **kwargs)
    