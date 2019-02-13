<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>people</v-icon>
      <span class="title font-weight-light ml-2">Teams</span>
    </v-card-title>
    <v-card-text>
      <div class="teams ma-3">
        <div class="team ma-1" v-for="team in teams" :key="team.name">
          <v-avatar color="orange" :size="60" @click="goTo(team)">
            <span class="white--text headline">{{team.name[0].toUpperCase()}}</span>
          </v-avatar>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    teams: Array
  },
  methods: {
    goTo(team) {
      this.$router.push({ name: "team", params: { name: team.name }});
    }
  }
}
</script>

<style scoped>
  .teams {
    display: flex;
    align-items: center;
    justify-content: center
  }

  .team {
    cursor: pointer;
  }

  .avatar {
    font-size: 40px;
  }
</style>

