# Generated by Django 4.1.3 on 2023-02-18 13:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=256, unique=True)),
                ('name', models.CharField(max_length=64)),
                ('surname', models.CharField(max_length=64)),
                ('patronymic', models.CharField(blank=True, max_length=64, null=True)),
                ('telegram_user_id', models.CharField(blank=True, max_length=32, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='user/avatar/')),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
            ],
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['id'], name='id_index'),
        ),
    ]
