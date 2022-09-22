from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

#https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
class UserSerializer(serializers.ModelSerializer):

    """ O atributo type de email é um EmailField e que é obrigatório
    e deve ser único entre todos os objetos User
    em nosso banco de dados. """
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    """ O tipo de atributo de senha é um CharField e que é somente gravação,
    obrigatório e deve ser uma senha válida. """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    """ O tipo de atributo password2 é um CharField e que é somente gravação e obrigatório. """
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:

        model = User

        """ Estes são os campos que o nosso formulário de inscrição contém. """
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

        """ Podemos adicionar validações extras com a opção extra_kwargs. Definimos first_name e last_name obrigatórios. """
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True} 
        }

    """ Os campos de senha devem ser iguais. 
    Podemos validar esses campos com o método 
    validate(self, attrs) dos serializadores : """
    def validate(self, attrs):
        
        if attrs['password'] != attrs['password2']:       
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    """ Ao enviar uma solicitação POST para registrar o endpoint,
    ele chama o método create do UserSerializer
    que salva o objeto do usuário. """
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
       
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    """ Ao enviar uma solicitação PUT ou PATCH para registrar o endpoint,
    ele chama o método update do UserSerializer
    que edita o objeto do usuário. """
    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

    
    