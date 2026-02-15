from django.db import models

class Page(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200, blank=True, default="")
    content_json = models.JSONField(default=dict)
    html = models.TextField(blank=True, default="")
    css = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.slug

class ActivationCode(models.Model):
    code = models.CharField(max_length=32, unique=True)
    course_slug = models.SlugField(default="course-1")
    is_used = models.BooleanField(default=False)
    used_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.code
