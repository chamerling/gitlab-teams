<template>
  <div>
    <v-list v-if="projectSize" two-line dark>
      <template v-for="(project, index) in projects">
        <project v-bind="project" :key="project.id"/>
        <v-divider v-if="index + 1 < projects.length" :key="index"></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <v-flex>
        <span>{{ $t("projects.no_projects") }}</span>
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
