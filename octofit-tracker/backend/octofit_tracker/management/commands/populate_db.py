from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Crear equipos si no existen
        marvel = Team.objects.filter(name='Marvel').first()
        if not marvel:
            marvel = Team.objects.create(name='Marvel', description='Marvel Team')
        dc = Team.objects.filter(name='DC').first()
        if not dc:
            dc = Team.objects.create(name='DC', description='DC Team')

        # Crear usuarios si no existen
        tony = User.objects.filter(email='tony@marvel.com').first()
        if not tony:
            tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team_id=marvel.id)
        steve = User.objects.filter(email='steve@marvel.com').first()
        if not steve:
            steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team_id=marvel.id)
        clark = User.objects.filter(email='clark@dc.com').first()
        if not clark:
            clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team_id=dc.id)
        diana = User.objects.filter(email='diana@dc.com').first()
        if not diana:
            diana = User.objects.create(name='Diana Prince', email='diana@dc.com', team_id=dc.id)

        # Crear actividades si no existen
        Activity.objects.get_or_create(user_id=tony.id, type='Running', defaults={'duration': 30, 'calories': 300})
        Activity.objects.get_or_create(user_id=steve.id, type='Cycling', defaults={'duration': 45, 'calories': 400})
        Activity.objects.get_or_create(user_id=clark.id, type='Swimming', defaults={'duration': 60, 'calories': 500})
        Activity.objects.get_or_create(user_id=diana.id, type='Yoga', defaults={'duration': 50, 'calories': 200})

        # Crear workouts si no existen
        Workout.objects.get_or_create(name='Push Ups', defaults={'description': 'Upper body', 'difficulty': 'Medium'})
        Workout.objects.get_or_create(name='Squats', defaults={'description': 'Lower body', 'difficulty': 'Easy'})
        Workout.objects.get_or_create(name='Plank', defaults={'description': 'Core strength', 'difficulty': 'Hard'})

        # Crear leaderboard si no existen
        Leaderboard.objects.get_or_create(team_id=marvel.id, defaults={'points': 700})
        Leaderboard.objects.get_or_create(team_id=dc.id, defaults={'points': 650})

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
