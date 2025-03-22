import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model

User = get_user_model()

class UserViewsTests(TestCase):
    def setUp(self):
        self.client = Client()  # Create a test client
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'Test',  # Added first_name field
            'last_name': 'User',   # Added last_name field
            'age': 25,             # Added age field
            'experience': 5,       # Added experience field
        }

    def test_register_user(self):
        response = self.client.post('/accountsUser/register/', data=json.dumps(self.user_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'message': 'User registered successfully.'})

        # Check if the user is created in the database
        self.assertTrue(User.objects.filter(username=self.user_data['username']).exists())

    def test_register_user_missing_fields(self):
        # Missing email, password, first_name, last_name, age, experience
        response = self.client.post('/accountsUser/register/', data=json.dumps({'username': 'testuser'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'message': 'Missing required fields.'})

    def test_login_user(self):
        # First, register the user
        self.client.post('/accountsUser/register/', data=json.dumps(self.user_data), content_type='application/json')

        # Now log in
        response = self.client.post('/accountsUser/login/', data=json.dumps({'username': 'testuser', 'password': 'testpassword'}), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())  # Check for access token in the response
        self.assertIn('refresh', response.json())  # Check for refresh token in the response

    def test_login_user_invalid_credentials(self):
        response = self.client.post('/accountsUser/login/', data=json.dumps({'username': 'testuser', 'password': 'wrongpassword'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'message': 'Invalid credentials.'})

    def test_protected_view_without_authentication(self):
        response = self.client.get('/accountsUser/protected/')
        self.assertEqual(response.status_code, 401)  # Assuming the view requires authentication

    def test_protected_view_with_authentication(self):
        # Register and log in to get access token
        self.client.post('/accountsUser/register/', data=json.dumps(self.user_data), content_type='application/json')
        login_response = self.client.post('/accountsUser/login/', data=json.dumps({'username': 'testuser', 'password': 'testpassword'}), content_type='application/json')
        
        # Make sure to check if the response contains access token
        self.assertEqual(login_response.status_code, 200)
        self.assertIn('access', login_response.json())
        access_token = login_response.json()['access']

        # Call the protected view with the access token
        response = self.client.get('/accountsUser/protected/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'message': 'This is a protected view.'})
