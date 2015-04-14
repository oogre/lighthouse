echo "[+] Starting Meteor App!"
cd .www/.demeteorized/ 
echo "[+] Running NPM"
npm install &>/dev/null
echo "[+] Setting environment variables"
export GITHUB_USER="oogre"
export GITHUB_PWD="223a7fcd17"
export GITHUB_TOKEN="19ef9501c1f829fe039f7217b98688407571dbf6"
export TUMBLR_KEY="ZRpcBSqjGiQEgRhFWOSpwPr3uobxaNaubIkCq6vCyQHEKybnpw"
TUMBLR_SECRET"K7ETeOZQDEiiomYWZpXjueC8DcdYPwmNiqZAE43J6MTmE7k48E"
export MONGO_URL='mongodb://ogre:vince123@127.0.0.1:27017/viceetversa'
export PORT=58080
export ROOT_URL='http://viceetversa.ogre.be/'
echo "[+] Starting Node Server"
forever main.js
