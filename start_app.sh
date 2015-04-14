echo "[+] Starting Meteor App!"
cd .www/.demeteorized/ 
echo "[+] Running NPM"
npm install &>/dev/null
echo "[+] Setting environment variables"
export MONGO_URL='mongodb://ogre:vince123@127.0.0.1:27017/viceetversa'
export PORT=58080
export ROOT_URL='http://viceetversa.ogre.be/'
echo "[+] Starting Node Server"
forever main.js
