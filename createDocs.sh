if [ -d docs ]; then
	rm -r docs/*
fi

apidoc -i backend/pocketHepiaServer/app/routes -o docs/api