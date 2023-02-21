// Running a script that sets everything up

const exec = require('@actions/exec');
const fs = require('fs');
const request = require('request');
const process = require('process');
const os = require('os');
const path = require('path');

function download() {
	return new Promise(function (resolve) {
		request("https://github.com/termux-pacman/pacman-tool-repo/raw/main/pacman-tool-repo.tar.xz", function () {
			resolve(null);
		}).pipe(fs.createWriteStream("pacman-tool-repo.tar.xz"));
	});
}

async function main() {
	tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ptr"));
	await download();
	await exec.exec("tar xJf pacman-tool-repo.tar.xz");
	fs.unlinkSync("pacman-tool-repo.tar.xz");
	process.chdir("pacman-tool-repo/");
	await exec.exec("sudo ./setup.sh");
	process.chdir(__dirname);
	fs.rmSync(tmpDir, {recursive:true, force:true});
}

main();
