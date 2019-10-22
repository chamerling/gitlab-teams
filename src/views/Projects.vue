<template>
  <div>
    <v-list v-if="projectSize" two-line dark>
      <template v-for="(project, index) in projects">
        <project v-bind="project" :key="project.id"/>
        <v-divider v-if="index + 1 < projects.length" :key="index"></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4> 
      <v-flex xs12 md6 class="empty-message" style="margin:auto"  >
        <v-layout
           row fill-height
        >
        <v-flex xs12 >
          <v-icon size="100"  :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">lightbulb</v-icon>
        </v-flex> 
        </v-layout>
        <v-layout
          row fill-height
        >
        <v-flex xs12 > 
          <span class="text-xs-center display-1">No projects to show...</span>
        </v-flex> 
        </v-layout>
       
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Project from "@/components/Project.vue";

export default {
  name: "projects",
  components: {
    Project
  },
  computed: {
    ...mapGetters({
      projects: "getProjects",
      projectSize: "getProjectsSize"
    })
  }
};
</script>
<style lang="css" scoped>
  .empty-message{
    margin: auto;
    text-align: center;
    border: 3px solid currentColor;
    border-style: dashed;
    padding: 5%;
  }
</style>
