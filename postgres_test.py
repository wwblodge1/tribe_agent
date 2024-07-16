import psycopg2
from psycopg2 import sql

def test_connection():
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="LBeMXF2-BIXCNqaK0Ii3IcYx_jeaKZr7ieNq5kuUevk",
            host="localhost",
            port="5432",
            database="app"
        )
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        print(f"Connected to PostgreSQL database:\n{db_version}")
        cursor.close()
        connection.close()
    except (Exception, psycopg2.Error) as error:
        print(f"Error while connecting to PostgreSQL: {error}")

if __name__ == "__main__":
    test_connection()
