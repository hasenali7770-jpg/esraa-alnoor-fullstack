from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone

from .models import Page, ActivationCode
from .serializers import PageSerializer

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all().order_by("-updated_at")
    serializer_class = PageSerializer

    @action(detail=False, methods=["get"], url_path=r"by-slug/(?P<slug>[-a-zA-Z0-9_]+)")
    def by_slug(self, request, slug=None):
        page = Page.objects.filter(slug=slug).first()
        if not page:
            return Response({"detail":"not found"}, status=404)
        return Response(PageSerializer(page).data)

    @action(detail=False, methods=["post"], url_path="upsert")
    def upsert(self, request):
        slug = request.data.get("slug")
        if not slug:
            return Response({"detail":"slug required"}, status=400)
        page, _ = Page.objects.get_or_create(slug=slug)
        ser = PageSerializer(page, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)

class ActivationView(APIView):
    def post(self, request):
        code = (request.data.get("code") or "").strip().upper()
        if not code:
            return Response({"detail":"code required"}, status=400)
        obj = ActivationCode.objects.filter(code=code).first()
        if not obj:
            return Response({"detail":"الكود غير صحيح"}, status=400)
        if obj.is_used:
            return Response({"detail":"هذا الكود مستخدم مسبقًا"}, status=400)
        obj.is_used = True
        obj.used_at = timezone.now()
        obj.save()
        return Response({"ok": True, "course_slug": obj.course_slug})
