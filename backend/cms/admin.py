from django.contrib import admin
from .models import Page, ActivationCode

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug","title","updated_at")
    search_fields = ("slug","title")

@admin.register(ActivationCode)
class ActivationCodeAdmin(admin.ModelAdmin):
    list_display = ("code","course_slug","is_used","used_at")
    search_fields = ("code","course_slug")
    list_filter = ("is_used",)
