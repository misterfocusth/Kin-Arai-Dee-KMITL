"""Main File for start python application and web server"""

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(port=9999)
