<div>
  <div class="home container-fluid">

    <button type="button" class="btn btn-primary mt-3" data-toggle="modal" data-target="#ModalCenter">
      Report Bug
    </button>

    <!-- Modal -->
    <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLongTitle">Bug Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-group">
              <div>
                <input type="text" name="title" id="title" class="form-control" placeholder="Title..."
                  v-model="newBug.title" required>
              </div>
              <input type="text" name="description" id="description" class="form-control" placeholder="Description..."
                v-model="newBug.description" required>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="createBug">Add Bug</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Workin Out The B
      <img alt="Vue logo" src="../assets/logo.png" />
      GS
    </h2>
    <div class="row">
      <div class="col-3">
        <h3>Title</h3>
      </div>
      <div class="col-3">
        <h3>Creator</h3>
      </div>
      <div class="col-3">
        <h3>Updated</h3>
      </div>
      <bugs v-for="bug in bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>


  <script>
    import Bugs from '@/components/BugsComponent.vue'
    export default {
      name: "home",
      data() {
        return {
          newBug: {}
        }
      },
      mounted() {
        this.$store.dispatch("getBugs")
      },
      computed: {
        bugs() {
          return this.$store.state.bugs;
        }
      },
      methods: {
        createBug() {
          this.$store.dispatch("createBug", { ...this.newBug })
          this.newBug = {}
        },
      },
      components: {
        Bugs,
      }

    }
  </script>