<template>
  <div>
    <div class="home container-fluid">

      <h2 class="text-center">Workin Out The B
        <img alt="Vue logo" src="../assets/logo.png" />
        GS
      </h2>
      <div class="col-10">

        <div class="row border-bottom border-dark bg-gradient-primary text-white">
          <div class="col-4 pt-2 text-left">
            <h5>Title</h5>
          </div>
          <div class="col-3 pt-2 text-left">
            <h5>Creator</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5>Status</h5>
          </div>
          <div class="col-3 pt-2 text-center">
            <h5>Updated</h5>
          </div>
          <div class="row books">
            <div class="col-12">
              <div class="row border-bottom border-dark bg-info" v-for="bug in bugs" :key="bug.id" :bugProp="bug">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bugs from '@/components/BugsComponent.vue'
  export default {
    name: "home",
    mounted() {
      this.$store.dispatch("getBugs")
    },
    data() {
      return {
        newBug: {}
      }
    },
    computed: {
      bugs() {
        return this.$store.state.bugs;
      },
      bugId() {
        return this.$store.state.bug.id
      }
    },
    methods: {
      createBug() {
        this.$store.dispatch("createBug", { ...this.newBug })
        this.newBug = {}
      }
    },
    components: {
      Bugs
    }

  }
</script>