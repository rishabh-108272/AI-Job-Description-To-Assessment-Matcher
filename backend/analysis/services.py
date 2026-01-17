import time
import json
import os
import re
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

SYSTEM_PROMPT = """
You are an AI system that analyzes job descriptions.

Return ONLY valid JSON in the following schema:

{
  "jobTitle": string,
  "skills": [
    {"name": string, "category": "technical" | "soft" | "tool"}
  ],
  "complexityScore": {
    "score": number (1-10),
    "maxScore": 10,
    "explanation": string
  },
  "assessments": [
    {
      "id": number,
      "title": string,
      "description": string,
      "type": string,
      "duration": string,
      "stage": string,
      "matchScore": number (0-100)
    }
  ]
}
"""

# 🔐 Robust JSON extractor (handles markdown, prose, noise)
def extract_json(text: str) -> dict:
    # Remove markdown fences if present
    text = re.sub(r"```(json)?", "", text).strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("No JSON object found in LLM output")

    return json.loads(text[start:end + 1])


def analyze_job_description(jd_text: str):
    start = time.time()

    try:
        response = client.responses.create(
            model="openai/gpt-oss-20b",
            input=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": jd_text[:4000]  # token safety
                },
            ],
            temperature=0.2,
        )

        raw_output = response.output_text.strip()
        result = extract_json(raw_output)

    except Exception as e:
        # 🔎 Log for debugging (remove in prod if needed)
        print("LLM ANALYSIS ERROR:", str(e))
        print("RAW LLM OUTPUT:", response.output_text if 'response' in locals() else None)

        # 🔴 Safe fallback (never breaks frontend)
        result = {
            "jobTitle": jd_text.split("\n")[0][:100],
            "skills": [
                {"name": "Problem Solving", "category": "soft"}
            ],
            "complexityScore": {
                "score": 5,
                "maxScore": 10,
                "explanation": "Unable to fully analyze job description."
            },
            "assessments": []
        }

    # ✅ Always append processing time
    result["processingTime"] = int((time.time() - start) * 1000)
    return result
