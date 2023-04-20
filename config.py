import os

settings = {
    'host': os.environ.get('ACCOUNT_HOST'),
    'master_key': os.environ.get('ACCOUNT_KEY'),
    'database_id': os.environ.get('COSMOS_DATABASE'),
    'container_id': os.environ.get('COSMOS_CONTAINER'),
    'email' : os.environ.get('EMAIL'),
    'password' : os.environ.get('PASSWORD'),
    'admin_password' : os.environ.get('ADMIN_PASSWORD'),
}