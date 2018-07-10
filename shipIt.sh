if [ -d output ]; then
	rm -r output
fi

mkdir -p output/ITI_IN_diplome_Lovino_Hoerdt_2018
cp report/PocketHepia_Report.pdf output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_memoire_diplome_Lovino_Hoerdt_2018.pdf
cp report/ITI_Resume_PocketHepia.pdf output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_resume_diplome_Lovino_Hoerdt_2018.pdf

mkdir output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018

cp docker-compose.yml output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/
cp -r android output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

rm -r output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/android/PocketHepia/build/*
rm -r output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/android/PocketHepia/app/build/*

cp -r backend output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

rm -rf output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/backend/pocketHepiaServer/node_modules
rm output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/backend/pocketHepiaServer/uploads/*

cp -r conf output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

cp -r frontend output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

rm -rf output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/frontend/pockethepia/node_modules

cp -r db output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

rm -r output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/db/data/*
mkdir output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/db/data/db

cp -r docs output/ITI_IN_diplome_Lovino_Hoerdt_2018/ITI_IN_src_diplome_Lovino_Hoerdt_2018/

docker build --rm -f frontend/Dockerfile -t pockethepia.azurecr.io/frontend frontend
docker build --rm -f backend/Dockerfile -t pockethepia.azurecr.io/backend backend
docker build --rm -f db/Dockerfile -t pockethepia.azurecr.io/db db

docker push pockethepia.azurecr.io/frontend
docker push pockethepia.azurecr.io/backend
docker push pockethepia.azurecr.io/db

cd output
zip -r ITI_IN_diplome_Lovino_Hoerdt_2018.zip ITI_IN_diplome_Lovino_Hoerdt_2018