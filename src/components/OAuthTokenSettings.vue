<template>
  <div class="pa-3">
    <v-form>
      <v-text-field v-model="clientId" label="Client ID" required></v-text-field>
      <v-text-field v-model="gitlabInstance" label="Gitlab URL" required></v-text-field>
      <v-btn @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import { types as oauthStoreTypes } from "@/store/modules/oauth";
import gitlab from "@/gitlab";

export default {
  name: "oauth-token-settings",
  props: {
    onSave: { type: Function, required: true }
  },
  data() {
    return {
      clientId: this.$store.state.oauth.clientId,
      gitlabInstance: this.$store.state.gitlabInstance
    };
  },
  methods: {
    async submit() {
      await Promise.all([
        this.$store.dispatch(`oauth/${oauthStoreTypes.UPDATE_OAUTH_CREDENTIALS}`, { clientId: this.clientId }),
        this.$store.dispatch("updateSettings", {
          apiToken: this.$store.state.apiToken,
          gitlabInstance: this.gitlabInstance
        })
      ]);
      this.onSave();
      await gitlab.get().requestUserAuthorization();
      this.$router.push("/");
    }
  },
  components: {}
};
</script>
