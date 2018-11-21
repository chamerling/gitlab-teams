<template>
  <div class="pa-3">
    <v-form>
      <v-text-field
        v-model="apiToken"
        label="API Token"
        required
      ></v-text-field>
      <v-text-field
        v-model="apiEndpoint"
        label="Gitlab URL"
        required
      ></v-text-field>
      <v-btn @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  name: 'settings',
  data() {
    return {
      apiToken: null,
      apiEndpoint: null
    }
  },
  mounted() {
    this.apiToken = this.$store.state.apiToken;
    this.apiEndpoint = this.$store.state.apiEndpoint;
  },
  methods: {
    submit() {
      this.$store.dispatch('updateSettings', { apiToken: this.apiToken, apiEndpoint: this.apiEndpoint });
      this.$router.push('/');
    }
  },
  components: {
  }
}
</script>
