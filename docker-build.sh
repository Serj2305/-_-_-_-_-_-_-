export $(cat ./.env | grep -v ^# | xargs) > /dev/null

sudo docker kill $(sudo docker ps -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -q -f dangling=true)
sudo docker rmi $(sudo docker images -q)

sudo docker system prune
sudo docker system prune -a

sudo docker-compose down --rmi all -v --remove-orphans
sudo docker-compose up --build -d

#aws s3 rm s3://studysignsproject/studysignsproject/ --recursive
#aws s3 cp --recursive $(pwd) s3://studysignsproject/studysignsproject/