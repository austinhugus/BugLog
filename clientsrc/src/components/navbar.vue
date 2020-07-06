<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">AppName</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="$auth.isAuthenticated" :class="{ active: $route.name == 'Profile' }">
          <router-link class="nav-link" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button class="btn btn-info mx-2 align-self-center" @click="bugForm = true">REPORT</button>
        <button class="btn btn-info" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
    <div v-if="bugForm && $auth.isAuthenticated" class="row border-bottom border-warning bg-info">
      <div class="col-12 mx-auto my-2">
        <form class="form-inline mx-auto text-center row" @submit.prevent="createBug">
          <div class="col-12">

            <div class="form-group row ">
              <input type="text" name="title" id="title" class="form-control col-11 col-md-3 my-1 my-md-0 mx-auto"
                placeholder="Bug Title.." aria-describedby="helpId" v-model="newBug.title">

              <input type="text" name="description" id="description" class="form-control col-11 col-md-8 mx-auto"
                placeholder="Bug Description.." aria-describedby="helpId" v-model="newBug.description">
            </div>
            <button type="submit" class="mx-3 mt-2 mb-1 btn btn-warning bug-font">submit</button>
            <button @click="bugForm = false" type="button"
              class="mx-3 mt-2 mb-1 btn btn-danger bug-font">cancel</button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  import axios from "axios";
  import { getUserData } from "@bcwdev/auth0-vue";
  import Bugs from '@/components/BugsComponent.vue'
  export default {
    name: "Navbar",
    data() {
      return {
        bugForm: false,
        newBug: {
          creatorEmail: this.$auth.user.email,
          closed: false,
        }
      }
    },
    methods: {
      async login() {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        console.log("this.$auth.user: ");
        console.log(this.$auth.user);
        this.$store.dispatch("getProfile");
      },
      async logout() {
        this.$store.dispatch("resetBearer");
        await this.$auth.logout({ returnTo: window.location.origin });
      },
      createBug() {
        this.$store.dispatch("createBug", this.newBug);
        this.newBug = { creatorEmail: this.$auth.user.email, closed: false };
        this.bugForm = false;
      }
    },
    components: {
      Bugs
    }
  };
</script>

<style></style>