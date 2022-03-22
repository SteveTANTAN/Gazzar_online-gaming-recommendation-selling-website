import datetime
if __name__ == "__main__":
    now = str(datetime.datetime.now())
    now = now.split('-')
    year = now[0]
    month = now[1]
    day = now[2].split(' ')[0]
    hour = now[2].split(' ')[1].split(':')[0]
    minute = now[2].split(' ')[1].split(':')[1]
    second = now[2].split(' ')[1].split(':')[2].split('.')[0] + now[2].split(' ')[1].split(':')[2].split('.')[1]
    oid = year +month + day + hour + minute + second
    print(oid)
    