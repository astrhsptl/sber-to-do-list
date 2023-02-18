# Generated by Django 4.1.3 on 2023-02-18 09:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('discription', models.CharField(blank=True, max_length=256, null=True)),
            ],
            options={
                'verbose_name': 'Task Status',
                'verbose_name_plural': 'Task Statuses',
            },
        ),
        migrations.CreateModel(
            name='SubTask',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=64)),
                ('file', models.FileField(blank=True, null=True, upload_to='tasks/sub/')),
                ('participants', models.ManyToManyField(blank=True, related_name='sub_participants', to=settings.AUTH_USER_MODEL)),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sub_status', to='tasks.taskstatus')),
            ],
            options={
                'verbose_name': 'sub task',
                'verbose_name_plural': 'Sub tasks',
            },
        ),
        migrations.CreateModel(
            name='MainTask',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=64)),
                ('discription', models.CharField(blank=True, max_length=256, null=True)),
                ('file', models.FileField(blank=True, null=True, upload_to='tasks/main/')),
                ('participants', models.ManyToManyField(blank=True, related_name='main_participants', to=settings.AUTH_USER_MODEL)),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='main_status', to='tasks.taskstatus')),
                ('sub_task', models.ManyToManyField(blank=True, related_name='sub_tasks', to='tasks.subtask')),
            ],
            options={
                'verbose_name': 'Main task',
                'verbose_name_plural': 'Main tasks',
            },
        ),
    ]