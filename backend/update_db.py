import os
import psycopg2
from urllib.parse import urlparse, parse_qsl

# Load DB config from settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()

from django.conf import settings

tmpPostgres = urlparse(settings.DATABASES['default']['NAME'] + '?' + '&'.join([f"{k}={v}" for k, v in settings.DATABASES['default'].items() if k not in ['ENGINE', 'NAME', 'USER', 'PASSWORD', 'HOST', 'PORT', 'OPTIONS']]))
# Wait, better to use the URL directly.

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("DATABASE_URL not set")
    exit(1)

conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Execute the SQL files
sql_files = [
    '../db/actualizar_tabla_empleados.sql',
    '../db/actualizar_tabla_prestamos.sql'
]

for sql_file in sql_files:
    with open(sql_file, 'r') as f:
        sql = f.read()
    print(f"Executing {sql_file}")
    cursor.execute(sql)
    conn.commit()

cursor.close()
conn.close()
print("DB updates completed")
