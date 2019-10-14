<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>lightbulb</v-icon>
      <span class="title font-weight-light ml-2">Projects</span>
    </v-card-title>
    <v-card-text>
      <div class="projects ma-1">
        <div @click="goTo(project)" class="project ma-1" v-for="project in projects" :key="project.name">
          <v-tooltip bottom>
            <avatar slot="activator" :name="project.name" :icon="project.avatar_url" :size="60"/>
            <span>{{project.name_with_namespace}}</span>
          </v-tooltip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Avatar from "@/components/Avatar.vue";

export default {
  props: {
    projects: Array
  },
  methods: {
    goTo(project) {
      window.open(project.http_url_to_repo, "_blank");
    }
  },
  components: {
    Avatar
  }
};
</script>

<style scoped>
.projects {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 150px;
}

.project {
  cursor: pointer;
}

.avatar {
  font-size: 40px;
}
</style>
