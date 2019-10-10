<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>people</v-icon>
      <span class="title font-weight-light ml-2">Teams</span>
    </v-card-title>
    <v-card-text>
      <div class="teams ma-1">
        <div @click="goTo(team)" class="team ma-1" v-for="team in teams" :key="team.name">
          <v-tooltip bottom>
            <avatar slot="activator" :name="team.name" :size="60"/>
            <span>{{team.name}}</span>
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
    teams: Array
  },
  methods: {
    goTo(team) {
      this.$router.push({ name: "team", params: { name: team.name } });
    }
  },
  components: {
    Avatar
  }
};
</script>

<style scoped>
.teams {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.team {
  cursor: pointer;
}

.avatar {
  font-size: 40px;
}
</style>
