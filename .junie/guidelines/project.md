# Project Guidelines for Elpis

## Technology Stack
- **Backend (PHP)**: Laravel (located in `server/laravel`).
- **Backend (Python)**: FastAPI (located in `server/fastapi`).
- **Client**: Prototype client (located in `clients/prototype`).
- **Infrastructure**: All services are managed via `docker compose`.

## Execution Rules
- **PHP Commands**: All PHP commands (like `artisan`, `composer`, `phpunit`) **MUST** be run through the `docker-compose` environment.
- **Docker Compose Command**: Use `docker compose` (without the hyphen) instead of `docker-compose`.
- **Laravel Command Examples**:
  - `docker compose exec laravel php artisan migrate`
  - `docker compose exec laravel php vendor/bin/phpunit tests/Feature`

## Codebase Standards
- **Prompt Management**: Use the database-driven prompt system (`PromptDefinition`, `PromptSet`, `Prompt` models).
- **Tests**: When adding features or fixing bugs, ensure relevant tests are added and executed inside the Docker container.
