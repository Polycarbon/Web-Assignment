<template>
  <sui-modal v-model="showModal" size="tiny">
    <div class="header">
      Contact
      <span class="ui teal label">Add</span>
    </div>
    <form class="ui form content">
      <div class="field">
        <label>Contact ID</label>
        <input placeholder="Contact ID" name="name" type="text" v-model="form.user_id">
      </div>
      <div class="two fields">
        <div class="field">
          <label>First Name</label>
          <input placeholder="First Name" name="firstName" type="text" v-model="form.first_name">
        </div>
        <div class="field">
          <label>Last Name</label>
          <input placeholder="Last Name" name="lastName" type="text" v-model="form.last_name">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>Mobile No.</label>
          <input type="text" name="mobileNumber" v-model="form.mobile">
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="form.email">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>Facebook</label>
          <input name="facebook" v-model="form.facebook">
        </div>
        <div class="field">
          <label>Image URL</label>
          <input type="url" name="imageUrl" v-model="form.pic_url">
        </div>
      </div>
      <div class="ui error message"></div>
    </form>
    <div class="actions">
      <div class="ui buttons">
        <button class="ui green button" v-on:click="addToDatabase">
          <i class="save icon"></i>
          Save
        </button>
        <button class="ui red button" v-on:click="onClose">
          <i class="close icon"></i>
          Close
        </button>
      </div>
    </div>
  </sui-modal>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AddContact',
    data () {
      return {
        showModal: true,
        form: {
          user_id : "",
          user_password : null,
          first_name: "",
          last_name: "",
          email : "",
          mobile : "",
          facebook : "",
          pic_url : ""
        }
      }
    },
    methods: {
      addToDatabase(){
        console.log("sd")
        axios.post("http://localhost:3000/contacts",this.form)
          .then((response)=>{
            console.log(response)
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      onSubmit () {
        this.showModal = false
        this.$router.push('/contacts')
      },
      onClose () {
        this.showModal = false
        this.$router.push('/contacts')
      }
    },
    watch: {
      showModal: function () {
        if (this.showModal === false) {
          this.$router.push('/contacts')
        }
      }
    }
  }
</script>

<style scoped>

</style>
