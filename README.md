        [sg.Text("Titulo:"), sg.Input(key="titulo")],
        [sg.Text("Sinopse:"), sg.Input(key="sinopse")],
        [sg.Text("Autor:"), sg.Input(key="autor")],
        [sg.Text("isbn:"), sg.Input(key="isbn")],

urlLivros="https://sd-books.herokuapp.com/livro/"
urlClientes="https://sd-books.herokuapp.com/cliente/"
urlEmprestimos="https://sd-books.herokuapp.com/emprestimo/"

`python -m venv venv`
`venv\Scripts\activate`
`pip install Django`
`django-admin startproject django_project .`
`python manage.py startapp app_exemplo`
`python manage.py runserver`
`python manage.py makemigrations`
`python manage.py migrate`
`pip freeze > requirements.txt`
`pip install -r requirements.txt`
`python manage.py createsuperuser`