export $(cat ./.env | grep -v ^# | xargs) > /dev/null

sudo docker stop $(sudo docker ps -qa)
sudo docker rm $(sudo docker ps -ql)
sudo docker rmi -f $(sudo docker images -qa)

sudo docker system prune
sudo docker system prune -a

sudo docker-compose up --build
sudo docker tag studysignsproject-django cr.yandex/${ID_OF_THE_DOCKER_REGISTRY}/studysignsproject-django:latest
sudo docker push cr.yandex/${ID_OF_THE_DOCKER_REGISTRY}/ubuntu:latest