<template>
  <div class="ui container">
    <div class="ui container segment">
      <div class="ui teal segment container">
        <div class="ui fluid action input">
          <h1 class="ui large teal ribbon label">Contact</h1>
          <input type="text" placeholder="Search users..." v-model="search">
          <div class="ui buttons">
            <button class="ui button" v-on:click="onSubmit">Search</button>
            <button class="orange ui button"  @click="$router.push('addContact')">+Add</button>
          </div>
        </div>
      </div>
      <div class="ui segment" v-if="user_data!==null">
      </div>
      <div class="ui segment">
<!--        <div class="ui center aligned header" v-if="filtered.length===0">No result</div>-->
        <div class="ui three column stackable grid">
          <div class="ui centered link cards">
            <div class="ui card" v-if="filtered===null" v-for="index in 6" :key='index'>
              <div class="ui placeholder">
                <div class="square image"></div>
              </div>
              <div class="content">
                <div class="ui placeholder">
                  <div class="header">
                    <div class="long line"></div>
                  </div>
                  <div class="paragraph">
                    <div class="medium line"></div>
                    <div class="long line"></div>
                    <div class="very long line"></div>
                  </div>
                </div>
                <div class="extra content">
                  <div class="ui fluid buttons">
                    <button class="teal ui disabled button"><i class="centered edit icon"></i></button>
                    <button class="pink ui disabled button"><i class="centered delete icon"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="ui card" v-if="filtered!==null" v-for="user in filtered" v-bind:key="user._id">
              <div class="ui centered medium image">
                <!--                <img v-bind:src="user['picture']['large']">-->
                <img v-bind:src = user.pic_url>
              </div>
              <div class="content">
                <a class="ui header">{{user.first_name}}   {{user.last_name}}</a>
                <div class="description">
                  <p>Mobile : {{user.mobile}}</p>
                  <p>Email : {{user.email}}</p>
                  <p>Facebook : {{user.facebook}}</p>
                </div>
              </div>
              <div class="extra content">
                <div class="ui fluid buttons">
                  <button class="teal ui button" @click="$router.push('editContact/'+user._id)"><i class="centered edit icon"></i></button>
                  <button class="pink ui button" @click="deleteUser(user._id)"><i class="centered delete icon"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!--    Add Pop-up Form   -->
  </div>
</template>

<script>
  import  userApi from '@/services/api/user'
  import axios from 'axios'

  export default {
    name: 'Contract',
    data () {
      return {
        user_data : null,
        filter :null,
        search: "",
      }
    },
    methods: {
      onSubmit () {
        // this.$router.push('/login')
      },
      fetchData () {
        axios.get("http://localhost:3000/contacts")
          .then((response)=>{
            this.user_data = response.data
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      deleteUser(id){
        var url ='http://localhost:3000/contacts/'+ id
        axios.delete(url)
          .then((response)=>{
            console.log('Delete userId: '+id)
            this.fetchData()
          })
          .catch((error)=>{
            console.log(error)
          });
      },
    },
    computed:{
      filtered:function () {
        if (this.user_data!=null){
          return this.user_data.filter((user)=>{
            return user.first_name.match(this.search)
          })
        }
      }
    },
    created() {
      userApi.getUsers(30).then((data)=>{
        setTimeout(() => {
          //this.user_data = data["data"]["results"]
          this.filter = data["data"]["results"]
        }, 2000);
      });
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>
