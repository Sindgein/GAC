# Generated by Django 2.1 on 2018-11-24 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.IntegerField(default=1, verbose_name='轮数')),
            ],
            options={
                'verbose_name': '当前轮数',
                'verbose_name_plural': '当前轮数',
            },
        ),
        migrations.CreateModel(
            name='Teams',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(verbose_name='队伍名称')),
                ('logo', models.SlugField(blank=True, default='', verbose_name='队伍头像')),
                ('number', models.IntegerField(blank=True, default=0, verbose_name='队伍编号')),
                ('score_round1', models.FloatField(blank=True, default=0, verbose_name='第一轮成绩')),
                ('rank_round1', models.IntegerField(blank=True, default=0, verbose_name='第一轮排名')),
                ('score_round2', models.FloatField(blank=True, default=0, verbose_name='第二轮成绩')),
                ('rank_round2', models.IntegerField(blank=True, default=0, verbose_name='第二轮排名')),
                ('score_round3', models.FloatField(blank=True, default=0, verbose_name='第三轮成绩')),
                ('rank_round3', models.IntegerField(blank=True, default=0, verbose_name='第三轮排名')),
                ('score_round4', models.FloatField(blank=True, default=0, verbose_name='第四轮成绩')),
                ('rank_round4', models.IntegerField(blank=True, default=0, verbose_name='第四轮排名')),
                ('score_round5', models.FloatField(blank=True, default=0, verbose_name='第五轮成绩')),
                ('rank_round5', models.IntegerField(blank=True, default=0, verbose_name='第五轮排名')),
                ('score', models.FloatField(blank=True, default=0, verbose_name='总成绩')),
                ('rank', models.IntegerField(blank=True, default=0, verbose_name='总排名')),
            ],
            options={
                'verbose_name': '队伍',
                'verbose_name_plural': '队伍',
            },
        ),
    ]
