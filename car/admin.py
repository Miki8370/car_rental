from django.contrib import admin
from .models import Car

# Register your models here.
@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'model',
        'decription',
        'ability',
        'is_rented',
    ]