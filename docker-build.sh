export $(cat ./.env | grep -v ^# | xargs) > /dev/null

backup_base_dir="./media_backups"
mkdir -p "$backup_base_dir"
backup_dir="$backup_base_dir/media_backup_$(date +%Y%m%d_%H%M%S)"
sudo docker cp "core_app:/app/media/." "$backup_dir"

backup_count=$(ls -dt "$backup_base_dir"/media_backup_* | wc -l)
if [ "$backup_count" -gt 10 ]; then
    oldest_backup=$(ls -dt "$backup_base_dir"/media_backup_* | tail -1)
    rm -rf "$oldest_backup"
    echo "Удален старый бэкап: $oldest_backup"
fi

sudo docker kill $(sudo docker ps -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -q -f dangling=true)
sudo docker rmi $(sudo docker images -q)

sudo docker system prune
sudo docker system prune -a

#sudo docker-compose down --rmi all -v --remove-orphans
sudo docker-compose up --build -d

#aws s3 rm s3://studysignsproject/studysignsproject/ --recursive
#aws s3 cp --recursive $(pwd) s3://studysignsproject/studysignsproject/