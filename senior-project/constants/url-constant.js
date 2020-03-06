import environment from '../environment'

url_dev = 'http://localhost:5000'
url_prod = 'https://senior-project-server.herokuapp.com'
url = environment === 'dev' ? url_dev : url_prod
console.log(url)
export default{
  url_users: url+'/users',
  url_users_profile: url+'/users/profile',
  url_users_profile_picture: url+'/users/profile/picture', //for update profile picture
  url_users_fetch_picture: url+'/profile-picture', //for fetching image
  url_login: url+'/login',
  url_sportsfield: url+'/sport-field',
  url_match_user: url+'/match-user' 
}
