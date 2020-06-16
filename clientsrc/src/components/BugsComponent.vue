<template>
    <div class="bugs">
        <router-link :to="{ name: 'Bugs', params: {bugId: bug.id}}">
            <div class="row m-2">
                <div class="row m-1 border border-primary long">
                    <h5>
                        {{bug.title}}
                    </h5>
                    <div class="row m-2">
                        <h5>
                            {{bug.creatorEmail}}
                        </h5>
                    </div>
                    <div class="row m-2">
                        <h5>{{new Date(bug.updatedAt).toLocaleString("en-US")}}</h5>
                    </div>
                </div>
            </div>
        </router-link>
    </div>


</template>


<script>
    export default {
        name: 'Bugs',
        props: ['bug'],
        data() {
            return {}
        },
        computed: {
            profile() {
                return this.$store.state.profile
            }
        },
        methods: {},
        components: {}
    }
</script>


<style scoped>

</style>