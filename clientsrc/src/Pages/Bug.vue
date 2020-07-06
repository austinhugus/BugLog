<template>
    <div class="Bug container-fluid">

        <div class="row">
            <div class="col">
                <h1>
                    {{bug.title}}
                </h1>
                <div class="col-6">
                    <h3>
                        Created By: {{bug.creatorEmail}}
                    </h3>
                </div>
                <div class="col-6">
                    <h5>
                        Last Modified: {{
                              new Date(bug.updatedAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                               })
                               }}
                    </h5>
                </div>
            </div>
        </div>



    </div>
</template>


<script>
    export default {
        name: 'Bug',
        props: ["bugProp"],
        data() {
            return {}
        },
        mounted() {
            this.store.dispatch("activeBug", this.$route.params.bug.id)
        },
        computed: {},
        methods: {},
        components: {}
    }
</script>


<style scoped>

</style>