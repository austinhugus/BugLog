<template>
    <div class="bugs">
        <router-link :to="{ name: 'Bug', params: {bugId: bug.id}}">
            <div class="row m-1 d-flex justify-content-center">
                <div class="row p-3 border border-primary">
                    <div class="col d-flex justify-content-start">
                        <h3 class="">
                            {{bug.title}}
                        </h3>
                    </div>

                    <div class="row p-3">
                        <div class="col d-flex justify-content-center">
                            <h3 class="ml-2">
                                {{bug.creatorEmail}}
                            </h3>
                        </div>
                    </div>
                    <div class="row p-3 ">
                        <div class="col" v-bind:class='{"closed": bug.closed == false, "open": bug.closed == true}'>
                            <h3 class="ml-2">
                                {{ bug.closed }}
                            </h3>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col d-flex justify-content-end">
                            <h3 class="ml-2">{{
                                new Date(bug.updatedAt).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>


</template>


<script>
    import Bug from "@/Pages/Bug.vue"
    export default {
        name: 'Bugs',
        props: ['bugProp'],
        data() {
            return {
                newBug: {
                    title: "",
                    description: ""
                }
            }
        },
        computed: {
            profile() {
                return this.$store.state.profile
            },
            bugs() {
                return this.$store.state.bugs;
            },
            bugId() {
                return this.$store.state.bug.id
            }
        },
    }
    methods: { }
    components: {
        Bug
    }

</script>


<style scoped>

</style>