from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4

def generate_analysis_pdf(data, file_path):
    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(file_path, pagesize=A4)

    content = []

    content.append(Paragraph("<b>Assessment Match Report</b>", styles["Title"]))
    content.append(Spacer(1, 12))

    content.append(Paragraph(f"<b>Job Title:</b> {data['jobTitle']}", styles["Normal"]))
    content.append(Paragraph(f"<b>Processing Time:</b> {data['processingTime']} ms", styles["Normal"]))
    content.append(Spacer(1, 12))

    content.append(Paragraph("<b>Skills</b>", styles["Heading2"]))
    for skill in data["skills"]:
        content.append(Paragraph(f"- {skill['name']} ({skill['category']})", styles["Normal"]))

    content.append(Spacer(1, 12))

    cs = data["complexityScore"]
    content.append(Paragraph("<b>Complexity Score</b>", styles["Heading2"]))
    content.append(Paragraph(f"{cs['score']}/{cs['maxScore']}", styles["Normal"]))
    content.append(Paragraph(cs["explanation"], styles["Normal"]))

    content.append(Spacer(1, 12))

    content.append(Paragraph("<b>Recommended Assessments</b>", styles["Heading2"]))
    for a in data["assessments"]:
        content.append(Paragraph(
            f"{a['title']} ({a['type']}) – {a['matchScore']}%", styles["Normal"]
        ))

    doc.build(content)
