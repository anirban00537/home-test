#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
MODE="production"
PORT=3000
IMAGE_NAME="home-test-app"

# Function to display usage
usage() {
    echo -e "${BLUE}Usage: $0 [OPTIONS]${NC}"
    echo ""
    echo "Options:"
    echo "  -m, --mode MODE       Set mode: 'production' or 'development' (default: production)"
    echo "  -p, --port PORT       Set port (default: 3000 for production, 3001 for development)"
    echo "  -b, --build-only      Only build the image, don't run it"
    echo "  -s, --stop            Stop running containers"
    echo "  -l, --logs            Show container logs"
    echo "  -c, --cleanup         Stop containers and remove images"
    echo "  -h, --help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Run in production mode"
    echo "  $0 -m development     # Run in development mode"
    echo "  $0 -b                 # Build only"
    echo "  $0 -s                 # Stop containers"
    echo "  $0 -l                 # Show logs"
}

# Function to build Docker image
build_image() {
    echo -e "${YELLOW}Building Docker image for $MODE mode...${NC}"
    
    if [ "$MODE" = "development" ]; then
        docker build -f Dockerfile.dev -t "${IMAGE_NAME}-dev" .
    else
        docker build -t "$IMAGE_NAME" .
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Docker image built successfully!${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to build Docker image${NC}"
        return 1
    fi
}

# Function to run Docker container
run_container() {
    echo -e "${YELLOW}Starting Docker container in $MODE mode on port $PORT...${NC}"
    
    # Stop existing container if running
    stop_containers_silent
    
    if [ "$MODE" = "development" ]; then
        docker run -d --name "${IMAGE_NAME}-dev-container" \
            -p "$PORT:3000" \
            -v "$(pwd):/app" \
            -v "/app/node_modules" \
            -v "/app/.next" \
            "${IMAGE_NAME}-dev"
    else
        docker run -d --name "${IMAGE_NAME}-container" \
            -p "$PORT:3000" \
            "$IMAGE_NAME"
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Container started successfully!${NC}"
        echo -e "${BLUE}🌐 Application is running at: http://localhost:$PORT${NC}"
        echo -e "${BLUE}📋 Container name: ${IMAGE_NAME}$([ "$MODE" = "development" ] && echo "-dev")-container${NC}"
    else
        echo -e "${RED}❌ Failed to start container${NC}"
        return 1
    fi
}

# Function to stop containers (silent)
stop_containers_silent() {
    docker stop "${IMAGE_NAME}-container" 2>/dev/null || true
    docker rm "${IMAGE_NAME}-container" 2>/dev/null || true
    docker stop "${IMAGE_NAME}-dev-container" 2>/dev/null || true
    docker rm "${IMAGE_NAME}-dev-container" 2>/dev/null || true
}

# Function to stop containers
stop_containers() {
    echo -e "${YELLOW}Stopping Docker containers...${NC}"
    stop_containers_silent
    echo -e "${GREEN}✅ Containers stopped${NC}"
}

# Function to show logs
show_logs() {
    echo -e "${YELLOW}Docker container logs:${NC}"
    echo -e "${BLUE}===========================================${NC}"
    
    if docker ps --format "table {{.Names}}" | grep -q "${IMAGE_NAME}-dev-container"; then
        docker logs -f "${IMAGE_NAME}-dev-container"
    elif docker ps --format "table {{.Names}}" | grep -q "${IMAGE_NAME}-container"; then
        docker logs -f "${IMAGE_NAME}-container"
    else
        echo -e "${RED}❌ No running containers found${NC}"
        echo -e "${YELLOW}Available containers:${NC}"
        docker ps -a --filter "name=${IMAGE_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    fi
}

# Function to cleanup
cleanup() {
    echo -e "${YELLOW}Cleaning up Docker containers and images...${NC}"
    stop_containers_silent
    docker rmi "$IMAGE_NAME" 2>/dev/null || true
    docker rmi "${IMAGE_NAME}-dev" 2>/dev/null || true
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -m|--mode)
            MODE="$2"
            if [ "$MODE" = "development" ] && [ "$PORT" = "3000" ]; then
                PORT=3001  # Default dev port
            fi
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -b|--build-only)
            BUILD_ONLY=true
            shift
            ;;
        -s|--stop)
            STOP_ONLY=true
            shift
            ;;
        -l|--logs)
            LOGS_ONLY=true
            shift
            ;;
        -c|--cleanup)
            CLEANUP_ONLY=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            usage
            exit 1
            ;;
    esac
done

# Validate mode
if [ "$MODE" != "production" ] && [ "$MODE" != "development" ]; then
    echo -e "${RED}❌ Invalid mode: $MODE. Use 'production' or 'development'${NC}"
    exit 1
fi

# Main execution
echo -e "${BLUE}🐳 Docker Runner for Home Test App${NC}"
echo -e "${BLUE}====================================${NC}"

if [ "$CLEANUP_ONLY" = true ]; then
    cleanup
    exit 0
fi

if [ "$STOP_ONLY" = true ]; then
    stop_containers
    exit 0
fi

if [ "$LOGS_ONLY" = true ]; then
    show_logs
    exit 0
fi

# Build the image
if ! build_image; then
    exit 1
fi

# Run the container (unless build-only)
if [ "$BUILD_ONLY" != true ]; then
    if ! run_container; then
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
    echo -e "${BLUE}📝 Useful commands:${NC}"
    echo -e "   View logs: $0 -l"
    echo -e "   Stop containers: $0 -s"
    echo -e "   Cleanup: $0 -c"
fi 