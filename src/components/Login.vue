<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="../assets/logo.png" class="image">
        <div class="content">
          Log-in to your account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="cred.user_id" type="text" name="email" placeholder="E-mail address">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="cred.user_password" type="password" name="password" placeholder="Password">
            </div>
          </div>
          <div class="ui fluid large teal submit button" v-on:click="onSubmit">Login</div>
        </div>
        <div v-html="message_tag" class="ui error message"></div>
      </form>
      <div class="ui message">
        New to us? <a href="#">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data () {
      return {
        cred:{
          user_id: '',
          user_password: ''
        },
        message_tag:''
      }
    },
    methods: {
      onSubmit: function () {
        console.log(this.cred)
        axios.post("http://localhost:3000/verify", this.cred)
          .then((response) => {
            console.log(response)
            if (response.data.exist == true){
              this.$router.push('/contacts')
            }else {

            }

          })
          .catch((error) => {
            alert("wrong username or password")
            console.log(error)
          })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  body > .grid {
        height: 100%;
      }
  .image {
    margin-top: -100px;
  }
  .column {
    max-width: 450px;
  }
</style>
