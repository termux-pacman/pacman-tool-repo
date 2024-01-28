// Running a script that sets everything up

const exec = require('@actions/exec');
const core = require('@actions/core')

async function installPkg(pkgname) {
	let attempts = 0;
	while (true) {
		try {
			await exec.exec("sudo apt update -y");
			await exec.exec("sudo apt install " + pkgname + " -y");
			break;
		} catch (error) {
			if (attempts > 3) {
				core.setFailed("Something went wrong :/");
				process.exit(1);
			}
			attempts += 1;
			continue;
		}
	}
}

async function start() {
	await installPkg("libarchive-tools");

	await exec.exec("sudo su -c \"echo 'deb http://archive.ubuntu.com/ubuntu/ lunar universe' > /etc/apt/sources.list.d/lunar.list\"");
	await exec.exec("sudo su -c \"echo 'deb-src http://archive.ubuntu.com/ubuntu/ lunar universe' >> /etc/apt/sources.list.d/lunar.list\"");

	await installPkg("pacman-package-manager");
}

start();
