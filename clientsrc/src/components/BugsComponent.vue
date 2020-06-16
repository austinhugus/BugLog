<template>
    <div class="bugs">
        <router-link :to="{ name: 'Bugs', params: {bugId: bug.id}}">
            <div class="row">
                <div>
                    <h5>
                        {{bug.title}}
                    </h5>
                    <div>
                        <p>
                            {{bug.creatorEmail}}
                        </p>

                    </div>
                    <div>
                        <p>{{new Date(bug.updatedAt).toLocaleString("en-US")}}</p>
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