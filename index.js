// Running a script that sets everything up

const exec = require('@actions/exec');
const core = require('@actions/core');

function error(message) {
	core.setFailed(message);
	process.exit(1);
}

async function installPkg(pkgname) {
	let attempts = 0;
	while (true) {
		try {
			await exec.exec("sudo apt update -y");
			await exec.exec("sudo apt install " + pkgname + " -y");
			break;
		} catch (error) {
			if (attempts > 3) {
				error("Something went wrong :/");
			}
			attempts += 1;
			continue;
		}
	}
}

async function start() {
	let myOutput = '';
	await exec.exec("grep", ["^DISTRIB_RELEASE=", "/etc/lsb-release"], {
		listeners: {
			stdout: (data) => {
				myOutput += data.toString();
			}
		}
	});
	if (myOutput.split("=").at(-1).split(".").at(0) != "24") {
		error("old version of ubuntu, must be version 24 of ubuntu");
	}

	await installPkg("libarchive-tools");

	await exec.exec("sudo su -c \"echo 'deb http://archive.ubuntu.com/ubuntu/ oracular universe' > /etc/apt/sources.list.d/oracular.list\"");
	await exec.exec("sudo su -c \"echo 'deb-src http://archive.ubuntu.com/ubuntu/ oracular universe' >> /etc/apt/sources.list.d/oracular.list\"");

	await installPkg("pacman-package-manager");
}

start();
