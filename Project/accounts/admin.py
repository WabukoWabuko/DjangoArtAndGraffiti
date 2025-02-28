from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Admin configuration for the User model, allowing plain authentication testing
    and management without sessions or tokens.
    
    Displays email, full_name, is_active, is_staff, and date_joined for easy management.
    """
    list_display = ('email', 'full_name', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('email', 'full_name')
    list_filter = ('is_active', 'is_staff')
    ordering = ('-date_joined',)
    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )
