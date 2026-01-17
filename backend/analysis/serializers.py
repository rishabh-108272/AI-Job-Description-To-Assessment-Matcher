from rest_framework import serializers

class AnalyzeRequestSerializer(serializers.Serializer):
    job_description = serializers.CharField()

class SkillSerializer(serializers.Serializer):
    name = serializers.CharField()
    category = serializers.ChoiceField(choices=['technical', 'soft', 'tool'])

class ComplexityScoreSerializer(serializers.Serializer):
    score = serializers.IntegerField()
    maxScore = serializers.IntegerField()
    explanation = serializers.CharField()

class AssessmentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    type = serializers.CharField()
    duration = serializers.CharField()
    stage = serializers.CharField()
    matchScore = serializers.IntegerField()

class AnalysisResultSerializer(serializers.Serializer):
    jobTitle = serializers.CharField()
    processingTime = serializers.IntegerField()
    skills = SkillSerializer(many=True)
    complexityScore = ComplexityScoreSerializer()
    assessments = AssessmentSerializer(many=True)
