import mysql.connector
from mysql.connector import errorcode
import os

from dotenv import load_dotenv
load_dotenv()


def create_db_connection():
    """Create database connection and return database object"""
    db_host = os.getenv("SQL_DATABASE_HOST")
    db_username = os.getenv("SQL_DATABASE_USERNAME")
    db_password = os.getenv("SQL_DATABASE_PASSWORD")
    db_conn_config = {
        'host': db_host,
        'user': db_username,
        'password': db_password,
        'database': 'test',
        'client_flags': [mysql.connector.ClientFlag.SSL],
        'ssl_ca': './certificate/DigiCertGlobalRootG2.crt.pem'
    }
    try:
        conn = mysql.connector.connect(**db_conn_config)
        print("[Database Connection]: Connection established")
    except mysql.connector.errors as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with the user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cursor = conn.cursor()
    return conn, cursor


def main():
    """Main function"""
    db_conn, cursor = create_db_connection()

    cursor.execute("DROP TABLE IF EXISTS test")
    print("Finished dropping table (if existed).")

    cursor.execute(
        "CREATE TABLE test (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);")
    print("Finished creating table.")

    cursor.execute(
        "INSERT INTO test (name, quantity) VALUES (%s, %s);", ("Banana", 150))
    print("Inserted", cursor.rowcount, "row(s) of data.")
    cursor.execute(
        "INSERT INTO test (name, quantity) VALUES (%s, %s);", ("Orange", 300))
    print("Inserted", cursor.rowcount, "row(s) of data.")
    cursor.execute(
        "INSERT INTO test (name, quantity) VALUES (%s, %s);", ("Apple", 450))
    print("Inserted", cursor.rowcount, "row(s) of data.")
    cursor.execute(
        "INSERT INTO test (name, quantity) VALUES (%s, %s);", ("Pineapple", 600))
    print("Inserted", cursor.rowcount, "row(s) of data.")
    cursor.execute(
        "INSERT INTO test (name, quantity) VALUES (%s, %s);", ("Melon", 750))
    print("Inserted", cursor.rowcount, "row(s) of data.")

    db_conn.commit()
    cursor.close()
    db_conn.close()

    print("Done !")


main()
