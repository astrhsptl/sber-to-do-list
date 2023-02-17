# Generated by Django 4.1.3 on 2023-02-17 20:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0002_maintask_participants_subtask_participants_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maintask',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='main_participants', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='maintask',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='main_status', to='tasks.taskstatus'),
        ),
        migrations.AlterField(
            model_name='maintask',
            name='sub_task',
            field=models.ManyToManyField(blank=True, related_name='sub_tasks', to='tasks.subtask'),
        ),
        migrations.AlterField(
            model_name='subtask',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='sub_participants', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='subtask',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sub_status', to='tasks.taskstatus'),
        ),
    ]