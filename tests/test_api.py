import os

os.environ["DATABASE_URL"] = "sqlite:///./test_opstask.db"

from fastapi.testclient import TestClient

from app.main import app


def test_health_and_task_lifecycle():
    with TestClient(app) as client:
        assert client.get("/health").json()["status"] == "healthy"

        created = client.post(
            "/api/tasks", json={"title": "Ship OpsTask", "description": "Safely"}
        )
        assert created.status_code == 201
        task_id = created.json()["id"]

        updated = client.patch(f"/api/tasks/{task_id}", json={"completed": True})
        assert updated.json()["completed"] is True

        assert client.delete(f"/api/tasks/{task_id}").status_code == 204

