# Next.js Folder Browser - Docker Setup

A Next.js application that displays a hierarchical folder tree structure with expandable/collapsible navigation.

## 🚢 Default Docker Ports

- **Production Mode**: [http://localhost:3000](http://localhost:3000)
- **Development Mode**: [http://localhost:3001](http://localhost:3001)

You can customize these ports using the `-p` flag with the shell script or by modifying the docker-compose.yml file.

## 🐳 Docker Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### 🚀 Quick Start with Shell Script

The easiest way to run this application in Docker is using the provided shell script:

```bash
# Make the script executable (first time only)
chmod +x run-docker.sh

# Run in production mode (default, port 3000)
./run-docker.sh

# Run in development mode with hot reloading (port 3001)
./run-docker.sh -m development

# View help for all options
./run-docker.sh --help
```

### Shell Script Options

```bash
# Basic usage
./run-docker.sh                    # Production mode on port 3000
./run-docker.sh -m development     # Development mode on port 3001
./run-docker.sh -p 8080           # Custom port

# Build and management
./run-docker.sh -b                # Build only, don't run
./run-docker.sh -s                # Stop running containers
./run-docker.sh -l                # View container logs
./run-docker.sh -c                # Cleanup (stop containers and remove images)
```

### Alternative: Manual Docker Commands

#### Production Build

```bash
# Build the production image
docker build -t home-test-app .

# Run the production container
docker run -p 3000:3000 home-test-app
```

#### Using Docker Compose

Production Mode:

```bash
# Run production service
docker-compose up app -d

# View logs
docker-compose logs app

# Stop the service
docker-compose down
```

Development Mode:

```bash
# Run development service with hot reloading
docker-compose up app-dev -d
```

### Docker Configuration Files

- `Dockerfile`: Multi-stage production build with optimizations
- `Dockerfile.dev`: Development build with hot reloading
- `docker-compose.yml`: Orchestration for both environments
- `.dockerignore`: Excludes unnecessary files from build context
- `run-docker.sh`: All-in-one shell script for easy Docker management
