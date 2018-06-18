clean:
	find . -name \*.pyc -o -name -delete
	find . -name \*.pyo -o -name -delete
	find . -name __pycache__ -o -name -delete
	find . -path "./BriteCorePOCAPI/riskapi/migrations/*.py" -not -name "__init__.py" -o -name -delete
	rm -f BriteCorePOCAPI/db.sqlite3

database:
	./BriteCorePOCAPI/manage.py makemigrations api --noinput
	./BriteCorePOCAPI/manage.py migrate --noinput

fixtures:
	./server/manage.py createsuperuser --username=<UserName> --email=<Email>

britecorepocui/node_modules:
	npm --prefix=./BriteCorePOCUI install

britecorepocui-dist: britecorepocui/node_modules
	npm --prefix=./britecorepocui run build

britecorepocapi-dev:
	./BriteCorePOCAPI/manage.py runserver --settings=server.settings

all: clean database fixtures britecorepocui-dist britecorepocapi-dev
