from django.urls import path
from .views import AnalyzeJobDescriptionView, ExportPDFView, HealthCheckView

urlpatterns = [
    path("health/", HealthCheckView.as_view()),
    path("analyze/", AnalyzeJobDescriptionView.as_view()),
    path("export/pdf/", ExportPDFView.as_view()),  # ✅ NEW
]
