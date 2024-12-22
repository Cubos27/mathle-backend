# Django & MySQL Project

A web application built using **Django** as the backend framework and **MySQL** as the database.

## Prerequisites

Make sure you have the following installed on your system:

- Python (version 3.8 or higher recommended)
- MySQL (any compatible version)
- Virtualenv (optional but recommended)

---

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the repository**  

  git clone https://github.com/your-username/your-project-name.git
  cd your-project-name
   
2. **Create and activate a virtual environment**

  python -m venv venv
  source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. **Install dependencies**

  pip install -r requirements.txt

4. **Set up the MySQL database**

Create a database in MySQL:

  CREATE DATABASE mathle_db;

Update the database settings in the settings.py file:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'mathle_db',
            'USER': 'your_mysql_user',
            'PASSWORD': 'your_mysql_password',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }

5. **Apply migrations**

  python manage.py makemigrations
  python manage.py migrate

6. **Run the development server**

  python manage.py runserver

Access the app
Open your browser and navigate to:

  http://127.0.0.1:8000/
