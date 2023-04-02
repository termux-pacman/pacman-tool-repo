// Running a script that sets everything up

const exec = require('@actions/exec');
const fs = require('fs');
var https = require('follow-redirects').https;
const process = require('process');
const os = require('os');
const path = require('path');

tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ptr"));
process.chdir(tmpDir);
const file = fs.createWriteStream("pacman-tool-repo.tar.xz");
const request = https.get("https://github.com/termux-pacman/pacman-tool-repo/raw/main/pacman-tool-repo.tar.xz", function(response) {
	response.pipe(file);
	file.on("finish", async() => {
		file.close();
		await exec.exec("tar xJf pacman-tool-repo.tar.xz");
		fs.unlinkSync("pacman-tool-repo.tar.xz");
		process.chdir("pacman-tool-repo/");
		await exec.exec("sudo ./setup.sh");
		process.chdir(__dirname);
		fs.rmSync(tmpDir, {recursive:true, force:true});
	});
});
