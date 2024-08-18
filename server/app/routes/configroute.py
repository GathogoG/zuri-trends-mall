@app.route('/config')
def show_config():
    return {
        'SECRET_KEY': app.config.get('SECRET_KEY'),
        'DATABASE_URI': app.config.get('SQLALCHEMY_DATABASE_URI')
    }
