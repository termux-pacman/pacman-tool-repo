#!/bin/bash

# Installing dependencies for the repo-add and repo-remove commands
if ! $(dpkg -l libarchive-tools 2>/dev/null); then
	apt-get update
	while true; do
		{
			apt-get install libarchive-tools -y
			break
		} || {
			apt-get update
		}
	done
fi

# Commands settings
if [ ! -d /usr/share/pacman ]; then
	mkdir -p /usr/share/pacman
	cp ./util/* /usr/share/pacman
	chmod 777 /usr/share/pacman/*
fi
if [ ! -f /bin/repo-add ]; then
	cp ./repo-add /bin/repo-add
	chmod 777 /bin/repo-add
fi
if [ ! -f /bin/repo-remove ]; then
	ln -s /bin/repo-add /bin/repo-remove
fi
