from django.contrib import admin

from .models import (
    User,
    RiskType,
    Risk
)

admin.site.register(User)
admin.site.register(RiskType)
admin.site.register(Risk)
