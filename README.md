# AI Job Description → Assessment Matcher 🚀

An end-to-end **AI-powered system** that analyzes a job description and recommends the most relevant hiring assessments using **LLMs (Groq)**.  
The platform extracts skills, computes role complexity, and generates tailored assessment recommendations with exportable reports.

---

## 🌐 Live Architecture
```bash
React (Vite) Frontend
↓
Django REST API (Vercel)
↓
Groq LLM (openai/gpt-oss-20b)
↓
PDF Report Export
```
---

## ✨ Features

- 📄 **Job Description Analysis**
  - Paste text or upload **PDF / DOCX / TXT**
  - Automatic text extraction from files
- 🧠 **AI Skill Extraction**
  - Technical, soft skills & tools
- 📊 **Role Complexity Scoring**
  - 1–10 scale with explanation
- 🧪 **Assessment Recommendations**
  - Match score, stage, duration
- 📤 **Exportable PDF Report**
- ⚡ **Fast LLM inference via Groq**
- 🌍 **Fully deployed on Vercel**

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Vite (v5)
- Tailwind CSS
- pdfjs-dist (PDF parsing)
- mammoth (DOCX parsing)

### Backend
- Django + Django REST Framework
- Groq LLM API
- ReportLab (PDF generation)
- python-dotenv
- Whitenoise

### Deployment
- Vercel (Frontend + Backend)
- API-only Django (no database)

---

## 📁 Project Structure
```bash
AI-Job-Description-To-Assessment-Matcher/
│
├── backend/
│ ├── backend/
│ ├── analysis/
│ ├── manage.py
│ └── requirements.txt
│
├── project/ # Frontend
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── utils/
│ │ └── components/
│ ├── package.json
│ └── vite.config.ts
│
└── README.md
```
---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/rishabh-108272/AI-Job-Description-To-Assessment-Matcher.git
cd AI-Job-Description-To-Assessment-Matcher
```
## 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```
## Create .env
```bash
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_django_secret
DEBUG=True
```

## Run Server
```bash
python manage.py runserver
```

## 3️⃣ Frontend Setup (React)
```bash
cd project
npm install
```

## Creat .env
```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Run Frontend
```bash
npm run dev
```

# 🔌 API Endpoints

## Health Check
GET /api/health/

## Analyze Job Description
POST /api/analyze/

### Request
```json
{
  "job_description": "Senior Full Stack Developer..."
}
```

### Response
```json
{
  "jobTitle": "Senior Full Stack Developer",
  "skills": [...],
  "complexityScore": {...},
  "assessments": [...],
  "processingTime": 1234
}
```

## Export PDF
POST /api/export/pdf/

---

# 📄 File Upload Support

**Supported formats:**

✅ PDF (text-based)

✅ DOCX

✅ TXT

**Note:** Scanned PDFs (image-only) are not supported yet (OCR can be added).

---

# ⚠️ Important Notes

- Backend is API-only
- No database is used (Vercel compatible)
- SQLite is disabled in production
- Environment variables are injected at build time

---

# 🧠 AI Model

- **Provider:** Groq
- **Model:** openai/gpt-oss-20b
- **Temperature:** 0.2
- Strict JSON schema enforcement

---

# 📌 Future Enhancements

- OCR for scanned PDFs
- Authentication & rate limiting
- Assessment marketplace integration
- Multi-language JD support
- Analytics dashboard

---

# 👨‍💻 Author

**Rishabh Verma**  
AI / Full Stack Developer

🔗 GitHub: https://github.com/rishabh-108272

---

# 📜 License

This project is for educational and demonstration purposes.  
For commercial usage, please contact the author.

---

⭐ **If you found this project useful, please star the repository!**
