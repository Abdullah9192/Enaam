.PHONY:	start status stop

start:
	UUID=$(shell whoami)$(shell hostname) docker-compose up -d --build

status:
	docker ps

stop:
	docker-compose down