from app import create_app

app = create_app()

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'runserver':
        app.run(debug=True)
    else:
        print("Usage: python run.py runserver")
