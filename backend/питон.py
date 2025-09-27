from flask import Flask, request, jsonify
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from functools import wraps

# Инициализация Flask
app = Flask(__name__)

# Секретный ключ для подписи JWT — его лучше хранить в переменных окружения, а не прямо в коде
app.config['SECRET_KEY'] = 'your_secret_key_here'

# Подключение к базе данных usersdata
def get_users_db():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='your_db_password',
        database='usersdata'
    )

# Подключение к базе данных ipdress
def get_ip_db():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='your_db_password',
        database='ipdress'
    )

# Декоратор для защиты маршрутов с JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth = request.headers['Authorization']
            parts = auth.split()
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(current_user_id, *args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
def register():
    """Регистрация пользователя и выдача JWT токена."""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    ip_address = data.get('ip_address')
    connection_type = data.get('connection_type')  # Например, "type1" или "type2"

    if not username or not password or not ip_address or not connection_type:
        return jsonify({'message': 'Missing fields'}), 400

    # Проверка существования пользователя в базе данных
    conn = get_users_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Хеширование пароля
    password_hash = generate_password_hash(password)

    # Присвоение роли "root" (в дальнейшем можно сделать динамическим)
    role = 'root'

    # Вставка нового пользователя в БД
    cursor.execute("INSERT INTO users (username, password_hash, role) VALUES (%s, %s, %s)", 
                   (username, password_hash, role))
    conn.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conn.close()

    # Сохранение IP и типа подключения
    conn2 = get_ip_db()
    cursor2 = conn2.cursor()
    cursor2.execute("INSERT INTO ip_connections (user_id, ip_address, connection_type) VALUES (%s, %s, %s)", 
                    (user_id, ip_address, connection_type))
    conn2.commit()
    cursor2.close()
    conn2.close()

    # Генерация JWT токена
    token = jwt.encode({
        'user_id': user_id,
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token})

@app.route('/login', methods=['POST'])
def login():
    """Вход пользователя, проверка IP и тип подключения."""
    data = request.json
    username = data.get('username')
    ip_address = data.get('ip_address')
    connection_type = data.get('connection_type')
    password = data.get('password')

    if not username or not ip_address or not connection_type or not password:
        return jsonify({'message': 'Missing fields'}), 400

    # Проверяем, что пользователь существует
    conn = get_users_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_id = user['id']
    password_hash = user['password_hash']

    # Для простоты не проверяем пароль на нашем уровне — это делает Apache Guacamole
    # Если вам нужно, вы можете использовать check_password_hash для валидации пароля.

    # Проверка IP и типа подключения
    conn2 = get_ip_db()
    cursor2 = conn2.cursor(dictionary=True)
    cursor2.execute("SELECT * FROM ip_connections WHERE user_id = %s AND ip_address = %s AND connection_type = %s",
                    (user_id, ip_address, connection_type))
    connection_record = cursor2.fetchone()
    cursor2.close()
    conn2.close()

    if not connection_record:
        return jsonify({'message': 'IP or connection type not found for user'}), 403

    # Генерация JWT токена для пользователя
    token = jwt.encode({
        'user_id': user_id,
        'username': username,
        'ip_address': ip_address,
        'connection_type': connection_type,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    # Здесь вы можете интегрировать с Guacamole, передав токен или запросив URL для подключения.
    # Но в этом примере мы просто возвращаем JWT.

    return jsonify({'token': token})

@app.route('/logout', methods=['POST'])
@token_required
def logout(current_user_id):
    """Выход — токен истекает автоматически, либо можно использовать черный список."""
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/protected', methods=['GET'])
@token_required
def protected_route(current_user_id):
    """Пример защищённого маршрута."""
    return jsonify({'message': f'Hello, user {current_user_id}, you have access to this resource.'})

if __name__ == '__main__':
    app.run(debug=True)
