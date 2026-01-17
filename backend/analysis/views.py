from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import tempfile
from django.http import FileResponse
from .pdf_utils import generate_analysis_pdf

from .serializers import (
    AnalyzeRequestSerializer,
    AnalysisResultSerializer
)
from .services import analyze_job_description

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "healthy"}, status=200)

class AnalyzeJobDescriptionView(APIView):
    def post(self, request):
        serializer = AnalyzeRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        jd_text = serializer.validated_data["job_description"]
        result = analyze_job_description(jd_text)

        response_serializer = AnalysisResultSerializer(result)
        return Response(response_serializer.data, status=status.HTTP_200_OK)

class ExportPDFView(APIView):
    def post(self, request):
        try:
            data = request.data

            tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
            generate_analysis_pdf(data, tmp_file.name)

            return FileResponse(
                open(tmp_file.name, "rb"),
                as_attachment=True,
                filename="assessment_report.pdf",
                content_type="application/pdf"
            )

        except Exception as e:
            return Response(
                {"error": "PDF generation failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )