# Generated by Django 4.1.7 on 2023-02-28 09:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweet_api', '0003_alter_tweet_options_remove_tweet_modified'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tweet',
            options={'ordering': ['-post_date']},
        ),
    ]