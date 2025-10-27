# Docker Commands Reference

This document provides a concise reference for commonly used Docker commands, organized by category. Each command includes a brief description and example usage. For detailed options, use `docker <command> --help`.

## Table of Contents
- Docker System Commands
- Image Commands 
- Container Commands 
- Network Commands 
- Volume Commands 
- Docker Compose Commands 
- Tips and Notes 

## Docker System Commands
Manage the Docker system and environment.

- **Check Docker version**  
  Displays the Docker version installed.  
  ```bash
  docker --version
  ```

- **Get system-wide information**  
  Shows Docker system details like containers, images, and storage.  
  ```bash
  docker info
  ```

- **Clean up unused resources**  
  Removes stopped containers, unused networks, dangling images, and build cache.  
  ```bash
  docker system prune
  ```

## Image Commands
Manage Docker images.

- **List images**  
  Displays all images on the system.  
  ```bash
  docker images
  ```

- **Pull an image**  
  Downloads an image from a registry (e.g., Docker Hub).  
  ```bash
  docker pull ubuntu:latest
  ```

- **Build an image**  
  Builds an image from a Dockerfile in the current directory.  
  ```bash
  docker build -t my-app:latest .
  ```

- **Remove an image**  
  Deletes a specified image.  
  ```bash
  docker rmi ubuntu:latest
  ```

- **Tag an image**  
  Adds a tag to an existing image.  
  ```bash
  docker tag my-app:latest my-app:v1.0
  ```

- **Push an image**  
  Uploads an image to a registry.  
  ```bash
  docker push my-app:latest
  ```

## Container Commands
Manage Docker containers.

- **List containers**  
  Shows running containers (`-a` for all containers, including stopped).  
  ```bash
  docker ps
  docker ps -a
  ```

- **Run a container**  
  Starts a new container from an image.  
  ```bash
  docker run -d --name my-container -p 8080:80 nginx
  ```

- **Stop a container**  
  Stops a running container.  
  ```bash
  docker stop my-container
  ```

- **Start a container**  
  Starts a stopped container.  
  ```bash
  docker start my-container
  ```

- **Restart a container**  
  Restarts a container.  
  ```bash
  docker restart my-container
  ```

- **Remove a container**  
  Deletes a stopped container.  
  ```bash
  docker rm my-container
  ```

- **View container logs**  
  Displays logs for a container.  
  ```bash
  docker logs my-container
  ```

- **Execute a command in a container**  
  Runs a command inside a running container.  
  ```bash
  docker exec -it my-container bash
  ```

- **Inspect a container**  
  Shows detailed information about a container.  
  ```bash
  docker inspect my-container
  ```

## Network Commands
Manage Docker networks.

- **List networks**  
  Displays all Docker networks.  
  ```bash
  docker network ls
  ```

- **Create a network**  
  Creates a new network (e.g., bridge).  
  ```bash
  docker network create my-network
  ```

- **Connect a container to a network**  
  Connects a container to a specified network.  
  ```bash
  docker network connect my-network my-container
  ```

- **Remove a network**  
  Deletes a network (must not be in use).  
  ```bash
  docker network rm my-network
  ```

## Volume Commands
Manage Docker volumes for persistent data.

- **List volumes**  
  Shows all volumes.  
  ```bash
  docker volume ls
  ```

- **Create a volume**  
  Creates a new volume.  
  ```bash
  docker volume create my-volume
  ```

- **Remove a volume**  
  Deletes a volume (must not be in use).  
  ```bash
  docker volume rm my-volume
  ```

- **Inspect a volume**  
  Displays details about a volume.  
  ```bash
  docker volume inspect my-volume
  ```

## Docker Compose Commands
Manage multi-container applications with Docker Compose.

- **Start services**  
  Starts containers defined in a `docker-compose.yml` file.  
  ```bash
  docker-compose up -d
  ```

- **Stop services**  
  Stops running containers without removing them.  
  ```bash
  docker-compose stop
  ```

- **Remove services**  
  Stops and removes containers, networks, and volumes defined in `docker-compose.yml`.  
  ```bash
  docker-compose down
  ```

- **View logs**  
  Displays logs for all services in the Compose file.  
  ```bash
  docker-compose logs
  ```

- **Build or rebuild services**  
  Builds or rebuilds images defined in `docker-compose.yml`.  
  ```bash
  docker-compose build
  ```

## Tips and Notes
- **Interactive mode**: Use `-it` with `docker run` or `docker exec` for interactive terminal access (e.g., `docker run -it ubuntu bash`).
- **Detached mode**: Use `-d` with `docker run` to run containers in the background.
- **Port mapping**: Use `-p host_port:container_port` to map container ports to the host (e.g., `-p 8080:80`).
- **Help**: Append `--help` to any command for detailed options (e.g., `docker run --help`).
- **Prune with caution**: Commands like `docker system prune` or `docker volume rm` are destructive; ensure no critical data is lost.
- **Docker Compose**: Requires a `docker-compose.yml` file. Use `docker-compose.yml` examples from official documentation for best practices.

For more details, refer to the [official Docker documentation](https://docs.docker.com) or run `docker --help`.
