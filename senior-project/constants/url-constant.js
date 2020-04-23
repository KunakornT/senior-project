import environment from '../environment'

url_dev = 'http://localhost:5000'
url_prod = 'https://senior-project-server.herokuapp.com'
url = environment === 'dev' ? url_dev : url_prod
console.log(url)
export default{
  url_users: url+'/users',
  url_users_profile: url+'/users/profile',
  url_user_pic: url+'/user-pic',
  url_users_profile_picture: url+'/users/profile/picture', //for update profile picture
  url_users_fetch_picture: url+'/profile-picture', //for fetching image
  url_users_passcode: url+'/passcode',
  url_login: url+'/login',
  url_google_signin: url+'/google-signin',
  url_check_google_signin: url+'/check-google-signin',
  url_sportsfield: url+'/sport-field',
  url_user_event: url+'/user-event',
  url_user_history_event: url+'/user-history-event', 
  url_unjoin: url+'/match-user',
  url_match_user: url + '/match-user',
  url_sub_field: url + '/sub-field'
}
