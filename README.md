# OpsTask

A deliberately small task manager used as the application workload for hands-on
Docker, networking, CI/CD, Linux, and AWS EC2 practice.

## Run locally (developer mode)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload
```

On Windows PowerShell, activate with `.venv\\Scripts\\Activate.ps1` and copy the
environment file with `Copy-Item .env.example .env`.

Open http://127.0.0.1:8000. API documentation is available at
http://127.0.0.1:8000/docs and health status at http://127.0.0.1:8000/health.

## Test

```bash
pytest
```

## Configuration

The app reads `APP_NAME`, `APP_ENV`, and `DATABASE_URL` from environment
variables or a local `.env` file. SQLite is the development default. PostgreSQL
uses a URL shaped like:

```text
postgresql+psycopg://USER:PASSWORD@HOST:5432/DATABASE
```

## DevOps boundary

This repository intentionally contains no Dockerfile, Compose configuration,
CI/CD workflow, reverse-proxy configuration, or infrastructure automation.
Those pieces are the learner's DevOps exercises.
