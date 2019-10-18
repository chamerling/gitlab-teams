<template>
  <div class="teams ma-1">
    <v-btn fab ripple @click="dialog = true" v-if="teams.length === 0">
      <v-icon color="grey">add_circle_outline</v-icon>
    </v-btn>
    <div @click="goTo(team)" class="team ma-1" v-for="team in teams" :key="team.name">
      <v-tooltip bottom>
        <avatar slot="activator" :name="team.name" :size="60"/>
        <span>{{team.name}}</span>
      </v-tooltip>
    </div>
    <create-team-dialog :show="dialog" @close="changeDialog"></create-team-dialog>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import CreateTeamDialog from "@/components/CreateTeamDialog.vue";

export default {
  props: {
    teams: Array
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    goTo(team) {
      this.$router.push({ name: "team", params: { name: team.name } });
    },
    changeDialog(dialog) {
      this.dialog = dialog;
    }
  },
  components: {
    Avatar,
    CreateTeamDialog
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
