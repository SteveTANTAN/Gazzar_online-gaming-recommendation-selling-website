import pytest

import sys
sys.path.append('../../database/src')
from user import User

from help import token_to_id
from auth import user_login, user_register, show_user_profile, edit_password, edit_username


# def test_register():
#     email = "1807655499@qq.com"
#     password = "Mimamima1234@"
#     name = "Jeffery"
#     age = 22
#     gender = 0
#     token = user_register(email, password, name, age, gender)
#     assert token['token'] == "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA"

def test_login():
    email = "1807655499@qq.com"
    password = "Mimamima1234@"
    token = user_login(email, password)
    assert token['token'] == "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA"

def test_show_user_profile():
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA"
    res = show_user_profile(token)
    assert res == {'user_info': [{'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA', 'user_id': 19, 'name': 'Jeffery', 'age': 22, 'gender': 0, 'email': '1807655499@qq.com', 'password': 'Mimamima1234@'}]}

def test_edit_password():
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA"
    new_password = "Mima1234@"
    edit_password(token, new_password)
    res = show_user_profile(token)
    assert res == {'user_info': [{'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA', 'user_id': 19, 'name': 'Jeffery', 'age': 22, 'gender': 0, 'email': '1807655499@qq.com', 'password': 'Mima1234@'}]}

def test_edit_username():
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA"
    newname = "Jeffrey"
    edit_username(token, newname)
    res = show_user_profile(token)
    assert res == {'user_info': [{'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE5fQ.fekopkxZQ6m2yY2gYKUIbfJIg7NrRQdTjMOGu4pMvHA', 'user_id': 19, 'name': 'Jeffrey', 'age': 22, 'gender': 0, 'email': '1807655499@qq.com', 'password': 'Mima1234@'}]}