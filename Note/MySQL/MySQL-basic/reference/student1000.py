import pymysql
import random

last_names = list("김이박최고윤엄한배성백전황서천방지마피")
first_names = list("건성현욱정민현주희진영래주동해도모영진선재현호시우인성마무병별솔하라")
alphas = list("abcdefghijklmnopqrstuvwxyz" * 3)
nums = list("0123456789" * 4)
addresses = ['서울', '대전', '부산', '대구', '전주', '강원']

years = list(range(70, 99))
months = list(range(1, 13))
months_day_30 = [4, 6, 9, 11]
days = list(range(1, 32))
days_30 = list(range(1, 31))
days_28 = list(range(1, 29))

def create_birth():
    year = random.choice(years)
    month = random.choice(months)
    day = random.choice(days)
    if month in months_day_30 and day > 30:
        day = random.choice(days_30)
    elif month == 2 and day > 28:
        day = random.choice(days_28)
  
    return "{}{:02d}{:02d}".format(year, month, day)

def create_nums(n=4):
    return "".join(random.sample(nums, n))

def create_alphas(n=5):
    return "".join(random.sample(alphas, n))

def create_data():
    last_name = random.choice(last_names)
    first_name = "".join(random.sample(first_names, 2))

    address = random.choice(addresses)
    birth = create_birth()
    tel = "010-{}-{}".format(create_nums(), create_nums())
    email = "{}@gmail.com".format(create_alphas(random.randrange(3, 9)))

    return (last_name + first_name, address, birth, tel, email)

data = []
for i in range(0, 1000):
    data.append(create_data())

conn = pymysql.connect(
    host='localhost',
    user='dingco',
    password='dingco',
    port=3306,
    db='dingcodb',
    charset='utf8'
)

with conn:
    cur = conn.cursor()
    sql = "insert into Student(name, addr, birth, tel, email) values(%s, %s, %s, %s, %s)"
    cur.executemany(sql, data)
    print("AffectedRowCount is", cur.rowcount)
    conn.commit()