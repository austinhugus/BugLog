<template>
    <div class="bugs">
        <router-link :to="{ name: 'bugInfo', params: {bugId: bug.id}}">
            <div class="row">

                <div>
                    <h5>
                        {{bug.title}}
                    </h5>
                </div>
                <div>
                    <h5>
                        {{bug.creatorEmail}}
                    </h5>
                </div>
                <div>
                    <h3>{{
                        new Date(bug.updatedAt).toLocaleString("en-US")    
                    }}</h3>
                </div>
        </router-link>
    </div>

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