if [ -d docs/api ]; then
	rm -r docs/api/*
fi

apidoc -i backend/pocketHepiaServer/app/routes -o docs/api