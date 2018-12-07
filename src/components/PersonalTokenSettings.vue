<template>
  <div class="pa-3">
    <v-form>
      <v-text-field v-model="apiToken" label="API Token" required></v-text-field>
      <v-text-field v-model="gitlabInstance" label="Gitlab URL" required></v-text-field>
      <v-btn @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "personal-token-settings",
  props: {
    onSave: { type: Function, required: true }
  },
  data() {
    return {
      apiToken: null,
      gitlabInstance: null
    };
  },
  mounted() {
    this.apiToken = this.$store.state.apiToken;
    this.gitlabInstance = this.$store.state.gitlabInstance;
  },
  methods: {
    async submit() {
      await this.$store.dispatch("updateSettings", {
        apiToken: this.apiToken,
        gitlabInstance: this.gitlabInstance
      });
      this.onSave();
      this.$router.push("/");
    }
  },
  components: {}
};
</script>
