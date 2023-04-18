import azure.functions as func
import logging
import base64
import json
from azure.cosmos import cosmos_client
import random
import config
import string
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE
from email import encoders
HOST = config.settings["host"]
MASTER_KEY = config.settings["master_key"]
DATABASE_ID = config.settings["database_id"]
CONTAINER_ID = config.settings["container_id"]
EMAIL = config.settings["email"]
PASSWORD = config.settings["password"]

app = func.FunctionApp()

# Learn more at aka.ms/pythonprogrammingmodel

# Get started by running the following code to create a function using a HTTP trigger.


@app.function_name(name="ScratchAPI")
@app.route(route="hello")
def scratch_off(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Python HTTP trigger function processed a request.")
    if req.method == 'OPTIONS':
        response = func.HttpResponse()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, access-control-allow-origin'
        return response
    req_body = req.get_json()
    id_value = req_body.get('id')
    filename = req_body.get('filename')
    response = None
    if not id_value and not filename:
        try:
            logging.info("Python HTTP trigger function processed a game creation request")
            client = cosmos_client.CosmosClient(HOST, {'masterKey': MASTER_KEY}, user_agent="CosmosDBPythonQuickstart", user_agent_overwrite=True)
            database = client.get_database_client(DATABASE_ID)
            container = database.get_container_client(CONTAINER_ID)

            length = 10
            result = "".join(random.choice(string.ascii_letters) for _ in range(length))
            isNotValid = True
            while isNotValid:
                try: 
                    container.read_item(item=result, partition_key=result)
                    result = "".join(
                        random.choice(string.ascii_letters) for _ in range(length)
                    )
                except Exception:
                    isNotValid = False
            req_body["id"] = result
            container.upsert_item(req_body)
            return_data = {"id": result}
            response = func.HttpResponse(body=json.dumps(return_data), status_code=200)

        except ValueError:
            pass

    elif id_value:
        logging.info("Python HTTP trigger function processed a game lookup request")
        client = cosmos_client.CosmosClient(HOST, {'masterKey': MASTER_KEY}, user_agent="CosmosDBPythonQuickstart", user_agent_overwrite=True)
        database = client.get_database_client(DATABASE_ID)
        container = database.get_container_client(CONTAINER_ID)

        try:
            item = container.read_item(item=str(id_value), partition_key=str(id_value))
            response_data = {}
            if 'read_flag' not in item:
                item['read_flag'] = True
                container.replace_item(item['id'], item)
                response_data = item
            response = func.HttpResponse(body=json.dumps(response_data), status_code=200)
        except Exception:
            print("ohno")
    else:
        logging.info("Python HTTP trigger function processed a game email save request")
        #logging.info("Python HTTP trigger function {} ".format(req_body.get('filedata')))
        #logging.info("Python HTTP trigger function {} ".format(req_body.get('filename')))
        item = {'emailSent':True}
        filedata = base64.b64decode(req_body.get('filedata'))
        send_email(filedata,filename)
        response = func.HttpResponse(body=json.dumps(item) , status_code=200)
        
    response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    

    return response

def send_email(filedata, filename):
    sender = EMAIL
    password = PASSWORD
    recipients = [EMAIL]
    name  = filename.replace('.xlsx', '')

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = COMMASPACE.join(recipients)
    msg['Subject'] = 'Scratch Off/{} '.format(name)
    body = 'Here is the game for {}'.format(name)
    msg.attach(MIMEText(body))
    
     # Decode the base64 filedata and add it as an attachment
    attachment = MIMEBase('application', 'octet-stream')
    attachment.set_payload(filedata)
    encoders.encode_base64(attachment)
    attachment.add_header('Content-Disposition', 'attachment', filename=str(filename))
    msg.attach(attachment)

    smtpObj = smtplib.SMTP('smtp.office365.com', 587)
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.login(sender, password)
    smtpObj.sendmail(sender, recipients, msg.as_string())