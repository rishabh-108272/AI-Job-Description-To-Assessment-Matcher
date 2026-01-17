from pathlib import Path
import os
from dotenv import load_dotenv

# --------------------------------------------------
# Base setup
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()

IS_VERCEL = os.environ.get("VERCEL") == "1"

# --------------------------------------------------
# Security
# --------------------------------------------------
SECRET_KEY = os.environ.get("SECRET_KEY", "unsafe-secret-key")
DEBUG = os.environ.get("DEBUG") != "False"

ALLOWED_HOSTS = [
    ".vercel.app",
    ".now.sh",
    "127.0.0.1",
    "localhost",
]

# --------------------------------------------------
# Applications
# --------------------------------------------------
INSTALLED_APPS = [
    "whitenoise.runserver_nostatic",
    "rest_framework",
    "corsheaders",
    "analysis",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# --------------------------------------------------
# Middleware
# --------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

# --------------------------------------------------
# Templates
# --------------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# --------------------------------------------------
# Database (CRITICAL FIX)
# --------------------------------------------------
if IS_VERCEL:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.dummy"
        }
    }

    # Disable migrations on Vercel
    MIGRATION_MODULES = {
        "auth": None,
        "contenttypes": None,
        "admin": None,
        "sessions": None,
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# --------------------------------------------------
# Password validation (unused but required)
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------------------------------------
# Internationalization
# --------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# Static files
# --------------------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = True

# --------------------------------------------------
# Default primary key
# --------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
