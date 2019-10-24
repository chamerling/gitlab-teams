<template>
  <div>
    <v-list v-if="projectSize" two-line dark>
      <template v-for="(project, index) in projects">
        <project v-bind="project" :key="project.id"/>
        <v-divider v-if="index + 1 < projects.length" :key="index"></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <empty-message
        message="No projects to show..."
        icon="lightbulb"
        icon-size="100"
        font-size="display-1"
      ></empty-message>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Project from "@/components/Project.vue";
import EmptyMessage from "@/components/EmptyMessage.vue";

export default {
  name: "projects",
  components: {
    Project,
    EmptyMessage
  },
  computed: {
    ...mapGetters({
      projects: "getProjects",
      projectSize: "getProjectsSize"
    })
  }
};
</script>
