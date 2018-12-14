<template>
  <div class="pa-3">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="apiToken"
        label="API Token"
        :rules="tokenRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="apiEndpoint"
        label="Gitlab URL"
        :rules="urlRules"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        @click="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      valid: false,
      tokenRules: [
        v => !!v || 'Token is required'
      ],
      urlRules: [
        v => !!v || 'URL is required',
        v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL is not valid'
      ],
      apiToken: null,
      apiEndpoint: null
    };
  },
  mounted() {
    this.apiToken = this.$store.state.apiToken;
    this.apiEndpoint = this.$store.state.apiEndpoint;
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateSettings", {
          apiToken: this.apiToken,
          apiEndpoint: this.apiEndpoint
        });
        this.$router.push("/");
      }
    }
  },
  components: {}
};
</script>
