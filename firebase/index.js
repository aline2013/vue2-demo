var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var config = {
  apiKey: "AIzaSyAi_yuJciPXLFr_PYPeU3eTvtXf8jbJ8zw",
  authDomain: "vue-demo-537e6.firebaseapp.com",
  databaseURL: "https://vue-demo-537e6.firebaseio.com"
}

firebase.initializeApp(config)
var usersRef = firebase.database().ref('users')

var app = new Vue({
  el: '#app',
  data: {
    newUser: {
      name: '',
      email: ''
    }
  },
  firebase: {
    users: usersRef
  },
  computed: {
    validation: function() {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isVaild: function() {
      var validation = this.validation;
      return Object.keys(validation).every(function(key) {
        return validation[key]
      })
    }
  },
  methods: {
    addUser: function() {
      if (this.isVaild) {
        usersRef.push(this.newUser);
        this.newUser.name = '';
        this.newUser.email = ''
      }
    },
    removeUser: function(user) {
      usersRef.child(user['.key']).remove()
    }
  }
})