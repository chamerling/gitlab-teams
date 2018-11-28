<template>
  <div class="pa-3">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        label="Name"
        :rules="[v => !!v || 'Name is required']"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="icon"
        label="Avatar 🤖 🦊 🤡"
        disabled
        required
      ></v-text-field>
      <v-autocomplete
        v-model="members"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        item-text="name"
        item-value="name"
        label="Members"
        multiple
        cache-items
        return-object
      >
        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-title>
              Search Gitlab User...
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template slot="selection" slot-scope="data">
          <v-chip
            :selected="data.selected"
            close
            @input="remove(data.item, data)"
          >
            <v-avatar>
              <img :src="data.item.avatar_url">
            </v-avatar>
          {{ data.item.name }}
          </v-chip>
        </template>

        <template slot="item" slot-scope="data">
          <v-list-tile-avatar>
            <v-avatar>
              <img :src="data.item.avatar_url"/>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="data.item.name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
      <v-btn :disabled="!valid" @click="create">Create</v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </v-form>
  </div>
</template>

<script>
import gitlab from "@/gitlab";
import _ from "lodash";

export default {
  data: () => ({
    valid: true,
    name: null,
    icon: "🦊",
    members: [],
    isLoading: false,
    items: [],
    search: null
  }),
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        const team = {
          name: this.name,
          icon: this.icon,
          usernames: this.members.map(member => member.username)
        }

        this.$store.dispatch("createTeam", team);
        this.$router.push({ name: "team", params: { name: team.name } });
      }
    },
    clear() {
      this.$refs.form.reset()
    },
    remove(item, data) {
      // TODO: This does not update the view...
      _.remove(this.members, member => member.id === item.id);
    }
  },
  watch: {
    search(val) {
      if (!val || val === null) {
        return;
      }
      this.isLoading = true;

      gitlab.get().client.searchUsers(val)
        .then(res => (this.items = res.data))
        .catch(console.log)
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
