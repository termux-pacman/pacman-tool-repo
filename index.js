// Running a script that sets everything up

const exec = require('@actions/exec');
const core = require('@actions/core')

async function start() {
	await exec.exec("sudo su -c \"echo 'deb http://archive.ubuntu.com/ubuntu/ lunar universe' > /etc/apt/sources.list.d/lunar.list\"");
	await exec.exec("sudo su -c \"echo 'deb-src http://archive.ubuntu.com/ubuntu/ lunar universe' >> /etc/apt/sources.list.d/lunar.list\"");

	let attempts = 0;

	while (true) {
		try {
			await exec.exec("sudo apt update -y");
			await exec.exec("sudo apt install pacman-package-manager -y");
			break;
		} catch (error) {
			if (attempts > 2) {
				core.setFailed("Something went wrong :/");
			}
			attempts += 1;
			continue;
		}
	}
}

start();
