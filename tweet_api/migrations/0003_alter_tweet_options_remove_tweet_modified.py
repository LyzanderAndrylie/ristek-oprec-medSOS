# Generated by Django 4.1.7 on 2023-02-24 15:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweet_api', '0002_tweet_is_public'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tweet',
            options={'ordering': ['post_date']},
        ),
        migrations.RemoveField(
            model_name='tweet',
            name='modified',
        ),
    ]
