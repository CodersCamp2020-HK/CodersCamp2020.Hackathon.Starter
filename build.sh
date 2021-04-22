#!/bin/bash

APP_NAME=hackathon_app
BUILD=true
DETACH=false

function run_docker {
    command=(docker-compose up)
    if [ "$BUILD" = true ]
    then
        command+=(--build)
    fi
    if [ "$DETACH" = true ]
    then
        command+=(-d)
    fi
    "${command[@]}"
}

function attach_docker {
    command=(docker-compose exec $APP_NAME bash)
    "${command[@]}"
}

function attach_logs {
    command=(docker-compose logs -f $APP_NAME)
    "${command[@]}"
}

function clean {
    command=(docker-compose down)
    "${command[@]}"
}

for arg in "$@"
do
    case $arg in
     -d|--detach) DETACH=true ;;
     -b|--no-build) BUILD=false ;;
     -db)
     DETACH=true
     BUILD=true
     ;;
     enter)
     attach_docker
     exit
     ;;
     clean)
     clean
     exit
     ;;
     log)
     attach_logs 
     exit
     ;;
     *) 
     echo "Invalid flag"
     echo "Available:"
     echo "enter - enter container"
     echo "clean - stop and remove containers"
     echo "log - attach to container logs"
     echo "-d - run and detach"
     echo "-b - ignore build at start"
     exit
     ;;
    esac
done;

run_docker
