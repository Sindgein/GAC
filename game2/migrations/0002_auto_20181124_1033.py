# Generated by Django 2.1 on 2018-11-24 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game2', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teams',
            name='logo',
            field=models.URLField(blank=True, default='http://src.1zlab.com/gac/gac-logo.jpg', verbose_name='队伍头像'),
        ),
    ]
