#!/usr/bin/python3

import os
import time
os.system("uwsgi --stop uwsgi.pid")
os.system("python3 manage.py collectstatic --noinput")
time.sleep(3)
os.system("uwsgi --ini uwsgi.ini")

