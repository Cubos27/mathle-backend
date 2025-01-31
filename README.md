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

```bash
  git clone https://github.com/Cubos27/mathle-backend.git
  cd mathle-backend
```

2. **Create and activate a virtual environment**

```bash
  python -m venv ./venv
  source venv/bin/activate # On Windows use `venv\Scripts\activate`
```

3. **Install dependencies**

```bash
  pip install -r requirements.txt
```

4. **Set up the MySQL database**

Create a database in MySQL:

```sql
  CREATE DATABASE mathle_learn_db;
```

Set the .env file with your credentials for the DB

```
DB_HOST=<your host>
DB_USER=<user>
DB_PASS=<password>
DB_NAME=<DB name>
```

5. **Apply migrations**

```bash
  python manage.py makemigrations
  python manage.py migrate
```

6. **Run the development server**

```bash
  python manage.py runserver
```

Access the app
Open your browser and navigate to:

http://127.0.0.1:8000/
